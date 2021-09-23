import { JsonSchemaWithApi } from '@airport/check-in';
import { DbSchema, JsonOperation, JsonSchema } from '@airport/ground-control';
import { Configuration } from '../../options/Options';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { SIndexedSchema } from './SSchema';
export declare class JsonSchemaBuilder {
    private config;
    private entityMapByName;
    existingSchema: JsonSchema;
    constructor(config: Configuration, entityMapByName: {
        [entityName: string]: EntityCandidate;
    }, existingSchemaString: string);
    build(domain: string, schemaMapByProjectName: {
        [projectName: string]: DbSchema;
    }, entityOperationMap: {
        [entityName: string]: {
            [operationName: string]: JsonOperation;
        };
    }): [JsonSchemaWithApi, SIndexedSchema];
    addOperations(jsonSchema: JsonSchema, entityOperationMap: {
        [entityName: string]: {
            [operationName: string]: JsonOperation;
        };
    }): void;
    private convertSIndexedSchemaToJsonSchema;
    private getIdColumnReferences;
    private getPropertiesAndRelations;
    private buildColumnRelations;
    private prepOneToManyElems;
}
//# sourceMappingURL=JsonSchemaBuilder.d.ts.map