import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async createTeam(name: string, teamOwnerId?: string) {
    const team = await this.prisma.team.create({
      data: {
        id: uuidv4(),
        name,
        teamOwnerId,
      },
    });

    await this.addUserToTeam(team.id, teamOwnerId);

    return team;
  }

  async addUserToTeam(teamId: string, userId: string) {
    return await this.prisma.teamUser.create({
      data: {
        teamId,
        userId,
      },
    });
  }

  async getTeamsForUser(userId: string) {
    return await this.prisma.team.findMany({
      where: {
        members: {
          some: { userId: userId },
        },
      },
    });
  }

  async getTeamById(teamId: string) {
    await this.prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true, projects: true },
    });
  }

  async getProjectsForTeam(teamId: string) {
    return await this.prisma.project.findMany({
      where: { teamId },
    });
  }

  async getMembersOfTeam(teamId: string) {
    return await this.prisma.teamUser.findMany({
      where: { teamId },
      include: { user: true },
    });
  }

  async removeUserFromTeam(teamId: string, userId: string) {
    return await this.prisma.teamUser.deleteMany({
      where: { teamId, userId },
    });
  }

  async deleteTeam(teamId: string) {
    return await this.prisma.team.delete({
      where: { id: teamId },
    });
  }
}
