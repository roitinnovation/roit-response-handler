import { Request, Response, NextFunction } from 'express'

import { ErrorTreatment } from './ErrorTreatment'

export class Handle {

    private static customHandlers: any[] = []

    static register(customHandlers: any | any[]) {
        const additionalHandlers = Array.isArray(customHandlers)
            ? customHandlers
            : [customHandlers]

        this.customHandlers = this.customHandlers.concat(additionalHandlers)
    }

    static middleware(
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        ErrorTreatment.executeHandler(err, req, res, next)
    }

    static asyncDispatcher = (fn: Function) =>
        (req: Request, res: Response, next: NextFunction) =>
            fn(req, res).catch((error: Error) => next(error))

}

