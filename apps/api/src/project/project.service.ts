import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(data: CreateProjectInput) {
    const project = await this.prisma.project.create({
      data: {
        ...data,
        id: uuidv4(),
        createdOn: new Date(),
        modifiedOn: new Date(),
      },
    });

    await this.addUserToProject(project.id, data.projectOwnerId);

    return project;
  }

  async updateProject(projectId: string, data: UpdateProjectInput) {
    return await this.prisma.project.update({
      where: { id: projectId },
      data: {
        ...data,
        modifiedOn: new Date(),
      },
    });
  }

  async addUserToProject(projectId: string, userId: string) {
    return await this.prisma.projectMember.create({
      data: {
        projectId,
        userId,
      },
    });
  }

  async getProjectById(projectId: string) {
    return await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        tasks: {
          include: {
            author: true,
            assignee: true,
            attachments: true,
            comments: { include: { user: true } },
          },
        },
        projectMembers: { include: { user: true } },
        team: true,
        projectOwner: true,
      },
    });
  }

  async getProjectsForUser(userId: string) {
    return await this.prisma.project.findMany({
      where: {
        projectMembers: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        projectMembers: { include: { user: true } },
      },
    });
  }

  async getMembersOfProject(projectId: string) {
    return await this.prisma.projectMember.findMany({
      where: { projectId },
      include: { user: true },
    });
  }

  async deleteProject(projectId: string) {
    return await this.prisma.project.delete({
      where: { id: projectId },
    });
  }
}
