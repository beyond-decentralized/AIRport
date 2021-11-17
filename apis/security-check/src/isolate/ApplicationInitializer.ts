import { JsonSchemaWithLastIds } from "../JsonSchemaWithLastIds";
import { LastIds } from "../LastIds";

export interface IApplicationInitializer {

    initialize(
        lastIds: LastIds,
        librarySignature?: string,
    ): Promise<void>

    getSchema(): JsonSchemaWithLastIds

}
