import { Request, Response, NextFunction } from "express";
import * as chalk from "chalk"
import { ErrorResponse } from "./ErrorResponse";


export class ErrorTreatment {

    private static instance: ErrorTreatment = new ErrorTreatment

    private handlersMap: Map<string, Function> = new Map

    private handlerDefault: Function

    logMissingConfigurationError: boolean = false

    private constructor() {
        this.handlerDefault = (err: Error, req: Request, res: Response) => {
            console.error(chalk.red(err.stack))
            res.status(500).send(ErrorResponse("An unexpected error occurred during an execution"))
        }
    }

    static getInstance() {
        return this.instance
    }

    static register(name: string, callBack: Function, defaultHandle: boolean = false) {
        if(defaultHandle) {
            this.instance.handlerDefault = callBack
        } else {
            this.instance.handlersMap.set(name, callBack)
        }
    }

    static getByName(handleName: string): Function {
        return this.instance.handlersMap.get(handleName)
    }

    static list() {
        return this.instance.handlersMap
    }

    static executeHandler(err: any, req: Request, res: Response, next: NextFunction) {

        const callBack = this.instance.handlersMap.get(err.constructor.name)

        if(!callBack) {
            this.instance.handlerDefault(err, req, res, next)
            return
        }

        callBack(err, req, res, next)
    }

    static countRegister(): number {
        return this.instance.handlersMap.size
    }
}