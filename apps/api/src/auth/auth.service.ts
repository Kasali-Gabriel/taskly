import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthJwtPayload } from 'src/auth/types/auth-jwtPayload';
import { ConfigService, ConfigType } from '@nestjs/config';
import { CreateUserInput } from '../user/dto/creat-user.dto';
import { v4 as uuidv4 } from 'uuid';
import refreshConfig from './config/refresh.config';
import { User } from '@prisma/client';
import { LoginInput } from './dto/login.input';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly teamService: TeamService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: string, oldRefreshToken: string) {
    // Retrieve user from DB
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException(
        'User not found or no refresh token stored.',
      );
    }

    // Validate old refresh token
    const isTokenValid = await verify(oldRefreshToken, user.hashedRefreshToken);

    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate new tokens
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    // Hash & store new refresh token (invalidate old one)
    const hashedRT = await hash(refreshToken);

    await this.updateHashedRefreshToken(userId, hashedRT);

    return { id: userId, accessToken, refreshToken };
  }

  async updateHashedRefreshToken(userId: string, hashedRT: string | null) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedRT,
      },
    });
  }

  async userLogin(user: User) {
    const { accessToken, refreshToken } = await this.generateTokens(user.id);

    // Hash & store refresh token
    const hashedRT = await hash(refreshToken);
    await this.updateHashedRefreshToken(user.id, hashedRT);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found!');

    const currentUser = { id: user.id };

    return currentUser;
  }

  async validateUser(loginInput: LoginInput) {
    const { email, password } = loginInput;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('User Not Found');

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched)
      throw new UnauthorizedException(
        `Incorrect password for ${email}. Try again.`,
      );
    return user;
  }

  async validateGoogleUser(googleUser: CreateUserInput) {
    const email = googleUser.email.toLowerCase();
    let user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      if (!user.profilePicture && googleUser.profilePicture) {
        user = await this.prisma.user.update({
          where: { email },
          data: { profilePicture: googleUser.profilePicture },
        });
      }
      const { password, ...authUser } = user;
      return authUser;
    }

    const dbUser = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        ...googleUser,
      },
    });

    // Create 'My workspace' team for the new user
    await this.teamService.createTeam('My workspace', dbUser.id);

    const { password, ...authUser } = dbUser;
    return authUser;
  }

  async signOut(userId: string): Promise<boolean> {
    const result = await this.updateHashedRefreshToken(userId, null);
    return result !== null;
  }
}
