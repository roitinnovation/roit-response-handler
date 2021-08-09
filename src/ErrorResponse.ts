import { ResponseModel } from './ResponseModel'

export function ErrorResponse(message: string, errors?: any[], token?: string) {
    return ResponseModel.buildError(message, errors, token)
}