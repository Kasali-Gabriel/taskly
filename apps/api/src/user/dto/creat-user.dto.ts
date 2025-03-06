import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  profilePicture?: string;
}
