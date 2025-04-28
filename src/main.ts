import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      name: 'session',
      keys: ['superSecretKey'], // 🔐 Replace with env key in prod
      maxAge: 24 * 60 * 60 * 1000, // ✅ 1 day in milliseconds
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: [
      'http://localhost:5173', // local dev
      'https://react-food-app-lime.vercel.app', // Vercel deployment
      'https://react-food-app-chetans-projects-012c5db0.vercel.app/',
      'react-food-app-cz9v.onrender.com',
      'https://react-food-app-git-master-chetans-projects-012c5db0.vercel.app/',
    ],
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
