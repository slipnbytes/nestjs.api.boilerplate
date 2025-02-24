import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    console.log(`[${method}] ${url} - Requisição iniciada.`);

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - now;
        console.log(`[${method}] ${url} - Finalizada em ${time}ms.`);
      }),
    );
  }
}
