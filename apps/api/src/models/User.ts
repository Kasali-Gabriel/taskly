import { Field, ObjectType } from '@nestjs/graphql';
import { Attachment } from './Attachment';
import { Comment } from './Comment';
import { Task } from './Task';
import { Team } from './Team';
import { ProjectMember } from './ProjectMember';

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

  @Field(() => [Attachment])
  attachments: Attachment[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => [Task])
  authoredTasks: Task[];

  @Field(() => [Task])
  assignedTasks: Task[];

  @Field(() => [Team],)
  teams: Team;

  @Field(() => ProjectMember, { nullable: true })
  projectMembers?: ProjectMember;
}
