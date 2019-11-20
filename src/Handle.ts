import { Request, Response, NextFunction } from "express";
import { ErrorTreatment } from "./ErrorTreatment";

export class Handle {

    private static customHandlers: Array<any> = new Array

    static register(customHandlers: any | Array<any>) {
        this.customHandlers = this.customHandlers.concat( (Array.isArray(customHandlers) ? customHandlers : [ customHandlers ]) )
    }

    static middleware(err: any, req: Request, res: Response, next: NextFunction) {
        ErrorTreatment.executeHandler(err, req, res, next)
    }

    static asyncDispatcher = fn => (req, res, next) => {
        fn(req, res).catch((error) => next(error));
    };
}