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
  const port = Environment.nestJsPort;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api', { exclude: ['/static/fotos/solicitacoes'] });
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
    origin: [
      '*',
    ],
  });

  console.log(port)
  await app.listen(port);
}
bootstrap();
