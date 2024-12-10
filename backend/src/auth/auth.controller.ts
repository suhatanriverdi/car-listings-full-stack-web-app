import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const isValidUser = await this.authService.validateUser(username, password);
    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(username);
  }
}
