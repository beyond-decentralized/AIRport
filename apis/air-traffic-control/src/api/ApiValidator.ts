import { IApiOperation } from "./ApiOperation";

export interface IApiValidator {

    validate(
        operation: IApiOperation,
        parameters: any[]
    ): void

}
