import { IQueryConfig, IQueryContext, IQueryRequest, IQueryResponse } from './Query';
import { IQueryValidator } from './QueryValidator';
export interface IQueryWebService {
    handle(request: IQueryRequest, config: IQueryConfig, context: IQueryContext): Promise<IQueryResponse>;
}
export declare class QueryWebService implements IQueryWebService {
    queryValidator: IQueryValidator;
    handle(request: IQueryRequest, config: IQueryConfig, context: IQueryContext): Promise<IQueryResponse>;
}
//# sourceMappingURL=QueryWs.d.ts.map