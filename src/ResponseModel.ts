
export class ResponseModel {

    status: string
    errors: any[]
    data: Date = null
    message: string
    token: string
    timestamp: number = new Date().getTime()

    static buildSuccess(
        data: any,
        message: string,
        token: string
    ): ResponseModel {
        const res = new ResponseModel()
        res.status = 'SUCCESS'
        res.data = data
        res.message = message
        res.token = token

        return res
    }

    static buildError(
        message: string,
        erros: any[],
        token: string
    ): ResponseModel {
        const res = new ResponseModel()
        res.status = 'ERROR'
        res.message = message
        res.errors = erros
        res.token = token

        return res
    }

}

