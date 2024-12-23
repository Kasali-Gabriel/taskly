
import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from './Task';
import { ProjectTeam } from './ProjectTeam';

@ObjectType()
export class Project {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => [Task])
  tasks: Task[];

  @Field(() => [ProjectTeam])
  projectTeams: ProjectTeam[];
}