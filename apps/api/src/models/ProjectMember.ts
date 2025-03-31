import { Field, ObjectType } from '@nestjs/graphql';

import { Project } from './Project';
import { User } from './User';

@ObjectType()
export class ProjectMember {
  @Field()
  projectId: string;

  @Field()
  userId: string;

  @Field(() => Project)
  project: Project;

  @Field(() => User)
  user: User;
}
