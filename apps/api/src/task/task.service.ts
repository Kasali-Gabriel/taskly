import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskStatusInput } from './dto/update-task-status.input';
import { Task } from 'src/models/Task';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findTaskByProjectId(projectId: string) {
    return await this.prisma.task.findMany({
      where: { projectId },
    });
  }

  async findTaskByUserId(userId: string) {
    return await this.prisma.task.findMany({
      where: { assigneeId: userId },
    });
  }

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
}