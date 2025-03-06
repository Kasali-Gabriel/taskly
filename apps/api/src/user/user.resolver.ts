import { UpdatePasswordInput } from './dto/update-password.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/models/User';
import { UserService } from './user.service';
import { CreateUserInput } from 'src/user/dto/creat-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => User)
  async changeUserPassword(
    @Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput,
  ) {
    return await this.userService.changeUserPassword(updatePasswordInput);
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }
}
