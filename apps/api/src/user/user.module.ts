import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { TeamService } from 'src/team/team.service';

@Module({
  providers: [UserService, UserResolver, TeamService, PrismaService],
})
export class UserModule {}
