
import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from './Task';
import { User } from './User';

@ObjectType()
export class Attachment {
  @Field()
  id: string;

  @Field()
  taskId: string;

  @Field()
  uploadedById: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Task)
  task: Task;

  @Field(() => User)
  uploadedBy: User;
}