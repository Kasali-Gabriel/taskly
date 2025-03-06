import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
