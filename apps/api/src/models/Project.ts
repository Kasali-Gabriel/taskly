import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from './Task';
import { ProjectMember } from './ProjectMember';
import { Team } from './Team';
import { User } from './User';

@ObjectType()
export class Project {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  createdOn: Date;

  @Field()
  modifiedOn: Date;

  @Field(() => [Task])
  tasks: Task[];

  @Field(() => Team)
  team: Team;

  @Field(() => [ProjectMember])
  projectMembers: ProjectMember[];

  @Field(() => User)
  projectOwner: User;
}
