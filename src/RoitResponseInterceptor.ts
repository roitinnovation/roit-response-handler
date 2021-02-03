import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { ErrorResponse } from './ErrorResponse'

import { OkResponse } from './OkResponse'

@Injectable()
export class RoitResponseInterceptor implements NestInterceptor {

    intercept(
        _: ExecutionContext,
        next: CallHandler
    ): Observable<any> | Promise<Observable<any>> {
        return next
            .handle()
            .pipe(
                catchError(async (data: Error) => ErrorResponse(data?.message))
            )
            .pipe(
                map(data => OkResponse(data)))
    }

}
