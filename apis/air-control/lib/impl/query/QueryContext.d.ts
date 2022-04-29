import { IQueryContext } from '../../lingo/query/QueryContext';
export interface IQueryContextLoader {
    ensure(context: IQueryContext): Promise<void>;
}
export declare class QueryContextLoader implements IQueryContextLoader {
    ensure(context: IQueryContext): Promise<void>;
}
//# sourceMappingURL=QueryContext.d.ts.map