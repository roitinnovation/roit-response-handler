import { ResponseModel } from "./ResponseModel";

export function ErrorResponse(message: string, erros?: Array<any>, token?: string) {
    return ResponseModel.buildError(message, erros, token)
}