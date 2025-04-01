import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsDate, IsArray } from 'class-validator';

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

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Field()
  @IsString()
  authorId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  assigneeId?: string;

  @Field({ nullable: true })
  @IsString()
  projectId?: string;
}
