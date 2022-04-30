import {
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
