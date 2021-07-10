import { IContext } from '@airport/di';
import { QueryResultType } from '@airport/ground-control';
import { IEntityContext } from '../../core/EntityContext';
import { IAbstractQuery } from '../facade/AbstractQuery';
import { RawNonEntityQuery } from '../facade/NonEntityQuery';
import { RawQuery } from '../facade/Query';
export interface ILookup {
    lookup(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => IAbstractQuery, ctx: IEntityContext, mapResults?: boolean): Promise<any>;
    ensureContext<C extends IContext = IContext>(context?: C): C;
}
//# sourceMappingURL=Lookup.d.ts.map