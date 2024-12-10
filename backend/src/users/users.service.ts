import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Find user by username
  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  // Validate user password
  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.findUserByUsername(username);
    if (!user) return false;

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  }
}
