import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Team } from 'src/models/Team';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getTeams() {
    return await this.prisma.team.findMany();
  }
}
