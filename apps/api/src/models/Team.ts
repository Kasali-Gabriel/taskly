import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from './Project';
import { User } from './User';
import { TeamUser } from './TeamUser';

@ObjectType()
export class Team {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  teamOwnerId?: string;

  @Field(() => [TeamUser], { nullable: true })
  members: TeamUser[];

  @Field(() => [Project], { nullable: true })
  project?: Project[];
}
