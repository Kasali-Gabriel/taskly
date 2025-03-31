import { Field, ObjectType } from '@nestjs/graphql';
import { Team } from './Team';
import { User } from './User';

@ObjectType()
export class TeamUser {

  @Field()
  userId: string;

  @Field()
  teamId: string;

  @Field(() => User)
  user: User;

  @Field(() => Team)
  team: Team;
}
