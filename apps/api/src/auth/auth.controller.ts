import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: 'Google authentication failed' });
    }

    const userData = await this.authService.userLogin(req.user);

  res.redirect(
    `http://localhost:3000/api/auth/google/callback?userId=${encodeURIComponent(userData.id)}&name=${encodeURIComponent(userData.name)}&email=${encodeURIComponent(userData.email)}&profilePicture=${encodeURIComponent(userData.profilePicture)}&accessToken=${encodeURIComponent(userData.accessToken)}&refreshToken=${encodeURIComponent(userData.refreshToken)}`,
  );

  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verify(@Req() req) {
    return { userId: req.user.id, email: req.user.email };
  }
}
