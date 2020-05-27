
export class ResponseModel {

    status: string
    errors: any[]
    data: Date
    message: string
    token: string
    timestamp: number = new Date().getTime()

    static buildSuccess(
        data: any,
        message?: string,
        token?: string
    ): ResponseModel {
        const res = new ResponseModel()
        res.status = 'SUCCESS'
        res.data = data

        if (message) {
            res.message = message
        }
        if (token) {
            res.token = token
        }

        return res
    }

    static buildError(
        message: string,
        errors?: any[],
        token?: string
    ): ResponseModel {
        const res = new ResponseModel()
        res.status = 'ERROR'
        res.message = message

        if (errors) {
            res.errors = errors
        }
        if (token) {
            res.token = token
        }

        return res
    }

}

