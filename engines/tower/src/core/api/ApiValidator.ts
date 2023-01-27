import { IApiOperation, IApiValidator } from '@airport/air-traffic-control';
import {
    Injected
} from '@airport/direction-indicator'

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
