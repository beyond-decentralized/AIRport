export declare enum QueryType {
    PREPARED = "PREPARED",
    DYNAMIC = "DYNAMIC"
}
export interface IQueryRequest {
    name: string;
    parameters: {
        [parameterName: string]: string;
    };
    type: QueryType;
}
export interface IQueryResponse {
    error?: string;
    result?: any;
}
export interface IQueryConfig {
}
export interface IQueryContext {
}
//# sourceMappingURL=Query.d.ts.map