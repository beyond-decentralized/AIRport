import { IQueryConfig, IQueryContext, IQueryRequest, IQueryResponse } from './Query';
export declare type IQueryHandlerCallback = {
    (request: IQueryRequest, context: IQueryContext): Promise<IQueryResponse>;
};
export declare function getQueryWsHandler(config: IQueryConfig): IQueryHandlerCallback;
export declare function queryWsHandler(request: IQueryRequest, config: IQueryConfig, context: IQueryContext): Promise<IQueryResponse>;
//# sourceMappingURL=QueryWsAdaptor.d.ts.map