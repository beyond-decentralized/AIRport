export interface ISchemaQueryRequest {
}
export interface ISchemaQueryResponse {
}
export interface ISchemaQueryConfig {
}
export interface ISchemaQueryContext {
    ioc: any;
}
export declare type ISchemaQueryHandlerCallback = {
    (request: ISchemaQueryRequest, context: ISchemaQueryContext): Promise<ISchemaQueryResponse>;
};
export declare function getReadWsHandler(config: ISchemaQueryConfig): ISchemaQueryHandlerCallback;
export declare function schemaQueryWsHandler(request: ISchemaQueryRequest, config: ISchemaQueryConfig, context: ISchemaQueryContext): Promise<ISchemaQueryResponse>;
//# sourceMappingURL=QueryWs.d.ts.map