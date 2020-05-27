import { Request, NextFunction, Response } from 'express'
import * as chalk from 'chalk'

import { ErrorTreatment } from './ErrorTreatment'

const error = chalk.red
const warning = chalk.keyword('orange')

export function ErrorHandle(target: Object, methodName: string) {
    registerMetadata(target, methodName)
}

export function ErrorHandleDafault(target: Object, methodName: string) {
    registerMetadata(target, methodName, true)
}

function registerMetadata(
    target: any,
    methodName: string,
    defaultHandle = false
) {
    const type = Reflect.getMetadata('design:paramtypes', target, methodName)

    if (!type) {
        logMissingConfiguration()

        return
    }

    if (type.length === 0) {
        logMissingParams(methodName)

        return
    }

    const handler = (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ) => target[methodName](err, req, res, next, defaultHandle)

    ErrorTreatment.register(type[0].name, handler)
}

/* eslint-disable max-len */
function logMissingParams(methodName: string) {
    const signature = '     Method signature -> (err: any, req: Request, res: Response, next: NextFunction)\n'
    console.warn(warning(`[HandleWarning] Insufficient params in handle ${methodName}()\n${signature}`))
}

function logMissingConfiguration() {
    if (!ErrorTreatment.getInstance().logMissingConfigurationError) {
        const config = '    {\n'
        + '       "compilerOptions": {\n'
        + '           [...]\n'
        + '           "experimentalDecorators": true,\n'
        + '           "emitDecoratorMetadata": true,\n'
        + '           [...]\n'
        + '      }'

        console.error(error(`[HandleError] MissingConfigurationError: configure in tsconfig.json file: \n ${config}`))

        ErrorTreatment.getInstance().logMissingConfigurationError = true
    }
}
