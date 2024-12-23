import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/models/User';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
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
}
