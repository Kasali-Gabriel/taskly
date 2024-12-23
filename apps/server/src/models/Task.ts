
import { Field, ObjectType } from '@nestjs/graphql';
import { TaskAssignment } from './TaskAssignment';
import { Attachment } from './Attachment';
import { Comment } from './Comment';
import { User } from './User';
import { Project } from './Project';

@ObjectType()
export class Task {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  priority?: string;

  @Field({ nullable: true })
  tags?: string;

  @Field({ nullable: true })
  points?: number;

  @Field()
  authorId: string;

  @Field({ nullable: true })
  assigneeId?: string;

  @Field()
  projectId: string;

  @Field(() => [TaskAssignment])
  taskAssignments: TaskAssignment[];

  @Field(() => [Attachment])
  attachments: Attachment[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => User)
  author: User;

  @Field(() => User, { nullable: true })
  assignee?: User;

  @Field(() => Project)
  project: Project;
}