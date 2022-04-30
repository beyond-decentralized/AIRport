import {
	Injected
} from '@airport/direction-indicator'
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
