import { Resolver, Query } from '@nestjs/graphql';
import { Team } from 'src/models/Team';
import { TeamService } from './team.service';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => [Team])
  async getTeams() {
    return this.teamService.getTeams();
  }
}
