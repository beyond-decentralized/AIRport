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
    }): [JsonSchema, SIndexedSchema];
    private convertSIndexedSchemaToJsonSchema;
    private getIdColumnReferences;
    private getPropertiesAndRelations;
    private buildColumnRelations;
    private prepOneToManyElems;
}
//# sourceMappingURL=JsonSchemaBuilder.d.ts.map