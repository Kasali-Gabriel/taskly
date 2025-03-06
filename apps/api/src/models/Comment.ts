
import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from './Task';
import { User } from './User';

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  taskId: string;

  @Field()
  userId: string;

  @Field(() => Task)
  task: Task;

  @Field(() => User)
  user: User;
}