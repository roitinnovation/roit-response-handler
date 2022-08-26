import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

export const SwaggerResponse = (model: string | Function): any =>
    applyDecorators(
        ApiOkResponse({
            schema: {
                properties: {
                    timestamp: {
                        type: 'number'
                    },
                    status: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    },
                    data: { $ref: getSchemaPath(model) }
                }
            }
        })
    )
