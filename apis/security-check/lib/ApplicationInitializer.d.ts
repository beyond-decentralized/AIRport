import { JsonSchemaWithLastIds } from ".";
import { LastIds } from "./LastIds";
export interface IApplicationInitializer {
    initialize(lastIds: LastIds, librarySignature?: string): Promise<void>;
    getSchema(): JsonSchemaWithLastIds;
}
//# sourceMappingURL=ApplicationInitializer.d.ts.map