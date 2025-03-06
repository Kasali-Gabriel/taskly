import { Field, ObjectType } from '@nestjs/graphql';
import { TaskAssignment } from './TaskAssignment';
import { Attachment } from './Attachment';
import { Comment } from './Comment';
import { Task } from './Task';
import { Team } from './Team';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  teamId?: string;

  @Field(() => [TaskAssignment])
  taskAssignment: TaskAssignment[];

  @Field(() => [Attachment])
  attachments: Attachment[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => [Task])
  authoredTasks: Task[];

  @Field(() => [Task])
  assignedTasks: Task[];

  @Field(() => Team, { nullable: true })
  team?: Team;
}
