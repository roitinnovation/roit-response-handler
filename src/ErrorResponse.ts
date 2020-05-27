import { ResponseModel } from './ResponseModel'

export function ErrorResponse(message: string, erros?: any[], token?: string) {
    return ResponseModel.buildError(message, erros, token)
}

