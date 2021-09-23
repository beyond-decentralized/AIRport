import { JsonSchema, JsonSchemaVersion } from "@airport/ground-control";
import { ISchemaApi } from "./ApiRegistry";
export interface JsonSchemaWithApi extends JsonSchema {
    versions: JsonSchemaVersionWithApi[];
}
export interface JsonSchemaVersionWithApi extends JsonSchemaVersion {
    api: ISchemaApi;
}
//# sourceMappingURL=JsonSchemaWithApi.d.ts.map