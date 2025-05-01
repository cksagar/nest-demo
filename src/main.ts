import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express'; // ✅ Import this
import cookieSession from 'cookie-session';

async function bootstrap() {
  // ✅ Tell Nest you're using Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    cookieSession({
      name: 'session',
      keys: ['superSecretKey'],
      maxAge: 24 * 60 * 60 * 1000,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://react-food-app-lime.vercel.app',
      'https://react-food-app-chetans-projects-012c5db0.vercel.app',
      'react-food-app-cz9v.onrender.com',
      'https://react-food-app-git-master-chetans-projects-012c5db0.vercel.app',
    ],
    credentials: true,
  });

  app.setGlobalPrefix('/api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
