import { IsString } from 'class-validator';

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTaskStatusInput {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  status: string;
}
