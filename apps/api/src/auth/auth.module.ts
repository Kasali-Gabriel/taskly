import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from 'src/user/user.service';
import refreshConfig from './config/refresh.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    ConfigModule.forFeature(refreshConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],

  providers: [
    AuthService,
    UserService,
    GoogleStrategy,
    AuthResolver,
    PrismaService,
    JwtStrategy,
  ],

  controllers: [AuthController],
})
export class AuthModule {}
