import { JsonOperation, JsonApplication } from '@airport/ground-control';
export declare class ApplicationQueryGenerator {
    private tempDatabase;
    processQueries(entityOperationMap: {
        [entityName: string]: {
            [operationName: string]: JsonOperation;
        };
    }, jsonApplication: JsonApplication): Promise<void>;
    private haveQueries;
    private initTempDatabase;
    private getApplicationQuery;
    private getQueryFunctionParameters;
    private getQueryResultType;
}
//# sourceMappingURL=ApplicationQueryGenerator.d.ts.map