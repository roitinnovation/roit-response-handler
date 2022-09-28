import { applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger'

interface Props {
    type: Function
    statusCode?: number
    isArray?: boolean
}

export const SwaggerResponse = ({
    type, statusCode, isArray
}: Props): MethodDecorator => {
    const data = isArray ? {
        type: 'array',
        items: { $ref: getSchemaPath(type) }
    } : {
        $ref: getSchemaPath(type)
    }

    return applyDecorators(
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
                    data
                }
            }
        })
    )
}

