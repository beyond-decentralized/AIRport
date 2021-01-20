import { JsonOperation, JsonSchema } from '@airport/ground-control';
export declare class SchemaQueryGenerator {
    private tempDatabase;
    processQueries(entityOperationMap: {
        [entityName: string]: {
            [operationName: string]: JsonOperation;
        };
    }, jsonSchema: JsonSchema): Promise<void>;
    private haveQueries;
    private initTempDatabase;
    private getSchemaQuery;
    private getQueryFunctionParameters;
    private getQueryResultType;
}
//# sourceMappingURL=SchemaQueryGenerator.d.ts.map