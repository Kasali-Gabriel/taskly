import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsDate } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;
}
