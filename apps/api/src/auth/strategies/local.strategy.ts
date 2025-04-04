import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginInput } from '../dto/login.input';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(@Args() loginInput: LoginInput) {
    const user = await this.authService.validateUser(loginInput);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
