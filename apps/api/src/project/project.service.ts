import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectInput } from './dto/create-project.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.project.findMany();
  }

  async create(data: CreateProjectInput) {
    return await this.prisma.project.create({
      data: {
        ...data,
        id: uuidv4(),
      },
    });
  }
}
