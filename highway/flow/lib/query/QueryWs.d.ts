import { IQueryConfig, IQueryContext, IQueryRequest, IQueryResponse } from './Query';
export interface IQueryWebService {
    handle(request: IQueryRequest, config: IQueryConfig, context: IQueryContext): Promise<IQueryResponse>;
}
export declare class QueryWebService implements IQueryWebService {
    handle(request: IQueryRequest, config: IQueryConfig, context: IQueryContext): Promise<IQueryResponse>;
}
//# sourceMappingURL=QueryWs.d.ts.map