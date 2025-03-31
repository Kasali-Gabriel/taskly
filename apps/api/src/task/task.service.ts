import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

import { CreateTaskInput } from './dto/create-task.input';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskInput) {
    return await this.prisma.task.create({
      data: {
        ...data,
        id: uuidv4(),
      },
    });
  }

  async updateTaskStatus(taskId: string, status: string) {
    return await this.prisma.task.update({
      where: { id: taskId },
      data: { status },
    });
  }

  async getTasksForUser(userId: string) {
    return await this.prisma.task.findMany({
      where: { assigneeId: userId },
    });
  }
}
