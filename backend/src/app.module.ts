import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Prisma Module
import { PrismaService } from 'prisma/prisma.service';

// Cars Module
import { CarsModule } from './cars/cars.module';
import { TradeInModule } from './trade-in/trade-in.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Global ConfigModule
      isGlobal: true,
    }),
    CarsModule,
    TradeInModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService], // To be able to use Prisma in other modules
})
export class AppModule {}
