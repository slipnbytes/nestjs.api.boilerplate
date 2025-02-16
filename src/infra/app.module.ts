import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';
import { LoggingInterceptor } from '@/core/interceptors/logging.interceptor';
import { ExcludePasswordInterceptor } from '@/core/interceptors/exclude-password.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
  ],
  providers: [LoggingInterceptor, ExcludePasswordInterceptor],
})
export class AppModule {}
