import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { Environment } from './core/constants/environment';
import { ConsoleWrapper } from './core/logger/logger';

ConsoleWrapper.options = {
  enabledLevels: ['log', 'warn', 'debug', 'error', 'success', 'logMagenta', 'info'],
  hideLogs: [],
  date: true,
  level: true,
  emoji: true,
  color: true,
};
ConsoleWrapper.inject();

async function bootstrap() {
  console.log(process.env)
  const port = Environment.nestJsPort;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  app.enableCors({
    allowedHeaders: [
      "content-type",
      'Accept',
      'Accept-Encoding',
      'Accept-Language',
      'Cache-Control',
      'Connection',
      'DNT',
      'Host',
      'Origin',
      'Pragma',
      'Referer',
      'Sec-GPC',
      'User-Agent',
      'Authorization'
    ],
    origin: ["http://localhost:4200", 'http://192.168.31.87:4200'],
  });

  await app.listen(port);
}
bootstrap();
