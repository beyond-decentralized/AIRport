import { Injected } from "@airport/air-control";
import {
    IApiOperation,
    IApiValidator
} from "@airport/check-in";

@Injected()
export class ApiValidator
    implements IApiValidator {

    validate(
        operation: IApiOperation,
        parameters: any[]
    ): void {
        // FIXME: implement (eventually)
    }

}
