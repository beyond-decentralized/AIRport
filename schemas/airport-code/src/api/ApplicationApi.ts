import { DI } from "@airport/di";
import { Api } from "@airport/check-in";
import { SCHEMA_API } from "../tokens";

export interface IApplicationApi {

    testApiDefinitionGeneration(): Promise<void>

}

export class ApplicationApi
    implements IApplicationApi {

    @Api()
    async testApiDefinitionGeneration(): Promise<void> {
        console.log('testing API')
    }
}
DI.set(SCHEMA_API, ApplicationApi)