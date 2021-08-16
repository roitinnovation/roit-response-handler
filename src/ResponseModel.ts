
export class ResponseModel {

    status: string
    error: any
    data: any
    message: string
    token: string
    timestamp: number = new Date().getTime()

    static buildSuccess(
        data: any,
        message?: string,
        token?: string
    ): ResponseModel {
        const res = new ResponseModel()
        res.status = 'success'
        res.data = data

        if (message) {
            res.message = message
        } else {
            res.message = 'Request received successfully'
        }
        if (token) {
            res.token = token
        }

        return res
    }

    static buildError(
        message: string,
        error?: any,
        token?: string
    ): ResponseModel {
        const res = new ResponseModel()
        res.status = 'failed'
        res.message = message

        if (error) {
            res.error = error
        }
        if (token) {
            res.token = token
        }

        return res
    }

}

