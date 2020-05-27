import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

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
                map(data => OkResponse(data))
            )
    }

}
