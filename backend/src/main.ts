import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // Allow requests from your frontend URL, fixes CORS Error
    origin: '*', // TODO Change this to: process.env.FRONTEND_URL
    // If we need to include credentials (like cookies or auth headers)
    credentials: true,
    methods: ['GET', 'POST'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
