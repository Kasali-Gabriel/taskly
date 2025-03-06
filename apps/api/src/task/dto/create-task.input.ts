import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsDate } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field()
  @IsDate()
  dueDate: Date;

  @Field({ nullable: true })
  @IsString()
  status?: string;

  @Field({ nullable: true })
  @IsString()
  priority?: string;

  @Field({ nullable: true })
  @IsString()
  tags?: string;

  @Field({ nullable: true })
  points?: number;

  @Field()
  @IsString()
  @IsOptional()
  authorId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  assigneeId?: string;

  @Field()
  @IsString()
  projectId: string;
}
