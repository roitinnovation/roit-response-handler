import { ResponseModel } from "./ResponseModel";

export function OkResponse(data: any, message?: string, token?: string) {
    return ResponseModel.buildSuccess(data, message, token)
}