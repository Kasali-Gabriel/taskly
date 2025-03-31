import { UpdatePasswordInput } from './dto/update-password.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'argon2';
import { CreateUserInput } from 'src/user/dto/creat-user.dto';
import { verify } from 'argon2';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private teamService: TeamService,
  ) {}

  async createUser(createUserInput: CreateUserInput) {
    const { password, email, name } = createUserInput;
    const hashedPassword = await hash(password);

    const user = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    // Create 'My workspace' team for the user
    await this.teamService.createTeam('My workspace', user.id);

    return user;
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();

    return users.map((user) => ({
      ...user,
      taskAssignment: [],
      attachments: [],
      comments: [],
      authoredTasks: [],
      assignedTasks: [],
    }));
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async changeUserPassword(UpdatePasswordInput: UpdatePasswordInput) {
    const { userId, oldPassword, newPassword, confirmPassword } =
      UpdatePasswordInput;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isOldPasswordValid = await verify(user.password, oldPassword);
    if (!isOldPasswordValid) {
      throw new Error('Old password is incorrect');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const isSamePassword = await verify(user.password, newPassword);
    if (isSamePassword) {
      throw new Error('New password must be different from the old password');
    }

    const hashedPassword = await hash(newPassword);

    return await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
}
