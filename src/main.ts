/* eslint-disable @typescript-eslint/no-floating-promises */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import logger from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // set global prefix for every api
  app.setGlobalPrefix('api');
  // use global pipes for dto validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap().then(() => {
  logger.success(
    `| app is running!`,
    `| env: ${process.env.NODE_ENV}`,
    `| port: ${3333}`,
    `| ${new Date().toLocaleString()}`,
  );
});
