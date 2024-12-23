
import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [TeamService, TeamResolver, PrismaService],
})
export class TeamModule {}