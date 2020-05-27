import { ErrorHandle } from '../ErrorHandle'

import { BusinessError } from './BusinessError'
import { SystemError } from './SystemError'

export class MyErrorHandler {

    @ErrorHandle
    businessError(ex: BusinessError) {
        console.log('OK')

        console.log(ex)
    }

    @ErrorHandle
    systemError(_: SystemError) { /* no op */ }

}

