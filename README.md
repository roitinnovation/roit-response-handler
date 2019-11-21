# ROIT response handler
ROIT response handler simplifies error handling and standardizes API responses

## Configure tsconfig

Add in file tsconfig.json attributes "experimentalDecorators" and "emitDecoratorMetadata"

```JSON
{
  "compilerOptions": {
    [...]
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    [...]
}
```

## Create the class for error handle

```javascript

import { ErrorHandle, ErrorHandleDafault, BusinessError, SystemError, ErrorResponse } from "@roit/roit-response-handler";

export class ErrorsHandle {

    /** 
     * 1. The decorator @ErrorHandle mapping your treatment by first arg (ex: BusinessError)
     * 2. Communicates with Express instances
     * 3. Signature ->  (err: any, req: Request, res: Response, next: NextFunction)
    */
    @ErrorHandle
    businessError(ex: BusinessError, req: Request, res: Response) {
      // your log
      res.status(400).send(ErrorResponse(ex.message))
    }

    @ErrorHandle
    systemError(ex: SystemError, req: Request, res: Response) {
      // your log
      res.status(500).send(ErrorResponse(ex.message))
    }

    /** 
     * 1. The decorator @ErrorHandleDafault is execute while the Error not mapping
     * 2. Communicates with Express instances
     * 3. Signature ->  (err: any, req: Request, res: Response, next: NextFunction)
     * 4. If not mapped internal treatment is performed
    */
    @ErrorHandleDafault
    default(ex: Error, req: Request, res: Response) {
       // your log 
      res.status(400).send(ErrorResponse("Error not mapping"))
    }

}

```

## Express integration

```javascript

// Step by step
import { Handle, modelMapperMiddleware } from "@roit/roit-response-handler"

// Step 1: Register middleware
// NOTE: Always register this middleware last
app.use(modelMapperMiddleware)

// Step 2: Register handle
Handle.register(new ErrorsHandle)

// Step 3: If your router receives an asynchronous function, register asyncDispatcher
router.post('/', Handle.asyncDispatcher, async (req, res) => {....

// In @overnightjs use
@Post()
@Wrapper(Handle.asyncDispatcher)
private async example(req: ModelMapperRequest, res: Response) {...

```


## Response models

```javascript

import { OkResponse, ErrorResponse } from "@roit/roit-response-handler"

// Error
// Signature -> (message: string, erros?: Array<any>, token?: string)
res.status(403).send(ErrorResponse("Auth invalid, verify your credentials!"));

// Success
// Signature -> (data: any, message?: string, token?: string)
res.send(OkResponse({}))

```

##Response Format

```
SUCCESS
Content-Type: application/json

{
	"status": "SUCCESS",
	"message": "User successfully created.",
	"data": { ... },
	"errors": null
}
```

```
ERROR
Content-Type: application/json

{
	"status": "ERROR",
	"message": "Error in create user.",
	"data": null,
	"errors": [
		{
			"code": XXX,
			"message": "Error in execute request!"
		}
	]
}
```