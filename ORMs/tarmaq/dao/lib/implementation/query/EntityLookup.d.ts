import { DbEntity, QueryResultType } from '@airport/ground-control';
import { IEntityContext } from '@airport/tarmaq-entity';
import { IEntityQueryContext, IEntitySelectProperties, RawEntityQuery } from '@airport/tarmaq-query';
import { IDao } from '../../definition/IDao';
import { IEntityLookup } from '../../definition/query/EntityLookup';
import { LookupProxy } from './Lookup';
export interface IEntityLookupInternal<Child, IESP extends IEntitySelectProperties> extends IEntityLookup {
    entityLookup(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, context: IEntityContext): Promise<any>;
    setNoCache(ChildClass: new (dbEntity: DbEntity, dao: IDao<any, any, any, any, any, any, any, any>, mapResults: boolean) => Child): Child;
}
export declare abstract class EntityLookup<Child, IESP extends IEntitySelectProperties> extends LookupProxy implements IEntityLookupInternal<Child, IESP> {
    protected dbEntity: DbEntity;
    protected mapResults: boolean;
    static mapResults: boolean;
    constructor(dbEntity: DbEntity, dao: IDao<any, any, any, any, any, any, any, any>, mapResults?: boolean);
    setNoCache(ChildClass: new (dbEntity: DbEntity, dao: IDao<any, any, any, any, any, any, any, any>, mapResults: boolean) => Child): Child;
    entityLookup(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, context: IEntityQueryContext): Promise<any>;
}
//# sourceMappingURL=EntityLookup.d.ts.map