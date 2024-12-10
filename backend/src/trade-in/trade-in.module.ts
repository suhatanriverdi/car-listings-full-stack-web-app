import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TradeInController } from './trade-in.controller';
import { TradeInService } from './trade-in.service';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [UsersModule, AuthModule, JwtModule],
  controllers: [TradeInController],
  providers: [AuthService, TradeInService, PrismaService],
})
export class TradeInModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('trade-in');
  }
}
