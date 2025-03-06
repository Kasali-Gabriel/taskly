
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './User';
import { ProjectTeam } from './ProjectTeam';

@ObjectType()
export class Team {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  productOwnerUserId?: string;

  @Field({ nullable: true })
  projectManagerUserId?: string;

  @Field(() => [User])
  members: User[];

  @Field(() => [ProjectTeam])
  projectTeams: ProjectTeam[];
}