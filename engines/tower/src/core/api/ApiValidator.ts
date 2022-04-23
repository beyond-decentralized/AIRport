import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import {
    API_VALIDATOR,
    IApiOperation,
    IApiValidator
} from "@airport/check-in";

export class ApiValidator
    implements IApiValidator {

    validate(
        operation: IApiOperation,
        parameters: any[]
    ): void {
        // FIXME: implement (eventually)
    }

}
DEPENDENCY_INJECTION.set(API_VALIDATOR, ApiValidator)
