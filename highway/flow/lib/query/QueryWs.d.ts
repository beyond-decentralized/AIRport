export interface IQueryRequest {
    name: string;
    parameters: {
        [parameterName: string]: string;
    };
}
export interface IQueryResponse {
    results: any;
}
export interface IQueryConfig {
}
export interface IQueryContext {
    ioc: any;
}
export declare type IQueryHandlerCallback = {
    (request: IQueryRequest, context: IQueryContext): Promise<IQueryResponse>;
};
export declare function getQueryWsHandler(config: IQueryConfig): IQueryHandlerCallback;
export declare function queryWsHandler(request: IQueryRequest, config: IQueryConfig, context: IQueryContext): Promise<IQueryResponse>;
//# sourceMappingURL=QueryWs.d.ts.map