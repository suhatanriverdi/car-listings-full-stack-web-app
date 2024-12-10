import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const isValid = await this.usersService.validateUser(username, password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { username };
  }

  async login(username: string) {
    // Retrieve the user object from the database
    const user = await this.usersService.findUserByUsername(username);
    // Include user ID or other useful data
    const payload = { username: user.username, userId: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
