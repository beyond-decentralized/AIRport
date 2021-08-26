import { DI } from "@airport/di";
import { Api } from "@airport/check-in";
import { SCHEMA_API } from "../tokens";

export interface ISchemaApi {

    testApiDefinitionGeneration(): Promise<void>

}

export class SchemaApi
    implements ISchemaApi {

    @Api()
    async testApiDefinitionGeneration(): Promise<void> {
        console.log('testing API')
    }
}
DI.set(SCHEMA_API, SchemaApi)