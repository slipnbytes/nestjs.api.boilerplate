import { NestFactory } from '@nestjs/core';

import { ExcludePasswordInterceptor } from '@/core/interceptors/exclude-password.interceptor';
import { LoggingInterceptor } from '@/core/interceptors/logging.interceptor';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { tracingService } from './tracing/tracing.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: true,
  });
  tracingService.start();

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ExcludePasswordInterceptor(),
  );

  await app.listen(port);
}
bootstrap();
