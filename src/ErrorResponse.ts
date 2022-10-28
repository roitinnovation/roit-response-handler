import { ErrorObject, ResponseModel } from './ResponseModel'

export function ErrorResponse(message: string, errors?: ErrorObject | unknown, token?: string) {
    return ResponseModel.buildError(message, errors, token)
}