import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Team } from 'src/models/Team';
import { TeamService } from './team.service';
import { Project } from 'src/models/Project';
import { TeamUser } from 'src/models/TeamUser';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Team)
  async createTeam(
    @Args('name') name: string,
    @Args('teamOwnerId') teamOwnerId?: string,
  ) {
    return await this.teamService.createTeam(name, teamOwnerId);
  }

  @Mutation(() => TeamUser)
  async addUserToTeam(
    @Args('teamId') teamId: string,
    @Args('userId') userId: string,
  ) {
    return this.teamService.addUserToTeam(teamId, userId);
  }

  @Query(() => [Team])
  async getTeamsForUser(@Args('userId') userId: string) {
    return this.teamService.getTeamsForUser(userId);
  }

  @Query(() => Team)
  async getTeamById(@Args('teamId') teamId: string) {
    return this.teamService.getTeamById(teamId);
  }

  @Query(() => [Project])
  async getProjectsForTeam(@Args('teamId') teamId: string) {
    return this.teamService.getProjectsForTeam(teamId);
  }

  @Query(() => [TeamUser])
  async getMembersOfTeam(@Args('teamId') teamId: string) {
    return this.teamService.getMembersOfTeam(teamId);
  }

  @Mutation(() => Boolean)
  async removeUserFromTeam(
    @Args('teamId') teamId: string,
    @Args('userId') userId: string,
  ) {
    await this.teamService.removeUserFromTeam(teamId, userId);
    return true;
  }

  @Mutation(() => Team)
  async deleteTeam(@Args('teamId') teamId: string) {
    return this.teamService.deleteTeam(teamId);
  }
}
