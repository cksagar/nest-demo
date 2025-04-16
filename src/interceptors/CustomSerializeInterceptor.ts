import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function Serialize<T>(dto: Type<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: Type<any>) {}
  intercept<T>(context: ExecutionContext, handler: CallHandler): Observable<T> {
    return handler.handle().pipe(
      map((data: T) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
