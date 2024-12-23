
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTaskStatusInput {
  @Field()
  taskId: string;

  @Field()
  status: string;
}