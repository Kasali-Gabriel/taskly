import { Resolver, Query } from '@nestjs/graphql';
import { User } from 'src/models/User';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }
}
