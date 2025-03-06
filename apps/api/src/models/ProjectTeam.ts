
import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from './Project';
import { Team } from './Team';

@ObjectType()
export class ProjectTeam {
  @Field()
  id: string;

  @Field()
  projectId: string;

  @Field()
  teamId: string;

  @Field(() => Project)
  project: Project;

  @Field(() => Team)
  team: Team;
}