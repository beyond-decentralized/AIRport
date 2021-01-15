export declare enum QueryType {
    PREPARED = 0,
    DYNAMIC = 1
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
    ioc: any;
}
//# sourceMappingURL=Query.d.ts.map