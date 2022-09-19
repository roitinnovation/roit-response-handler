import { applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger'

interface Props {
    type: Function
    statusCode?: number
}

export const SwaggerResponse = ({
    type, statusCode
}: Props): MethodDecorator =>
    applyDecorators(
        ApiExtraModels(type),
        ApiResponse({
            status: statusCode || 200,
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
                    data: { $ref: getSchemaPath(type) }
                }
            }
        })
    )
