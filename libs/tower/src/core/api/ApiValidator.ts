import { DI } from "@airport/di";
import {
    API_VALIDATOR,
    IApiOperation,
    IApiValidator
} from "@airport/security-check";

export class ApiValidator
    implements IApiValidator {

    validate(
        operation: IApiOperation,
        parameters: any[]
    ): void {
        // FIXME: implement (eventually)
    }

}
DI.set(API_VALIDATOR, ApiValidator)
