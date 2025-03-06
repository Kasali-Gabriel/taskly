import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload } from './entities/auth-payload.entity';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async userLogin(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(loginInput);
    return await this.authService.userLogin(user);
  }

  @Mutation(() => Boolean)
  async signOut(@Args('userId') userId: string) {
    return await this.authService.signOut(userId);
  }
}
