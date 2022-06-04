import { DbEntity, QueryResultType } from '@airport/ground-control';
import { IEntityContext, IEntityQueryContext } from '../../../lingo/core/EntityContext';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntityLookup } from '../../../lingo/query/api/EntityLookup';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { IDaoStub, LookupProxy } from './Lookup';
export interface IEntityLookupInternal<Child, IESP extends IEntitySelectProperties> extends IEntityLookup {
    entityLookup(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, context: IEntityContext): Promise<any>;
    setNoCache(ChildClass: new (dbEntity: DbEntity, dao: IDaoStub, mapResults: boolean) => Child): Child;
}
export declare abstract class EntityLookup<Child, IESP extends IEntitySelectProperties> extends LookupProxy implements IEntityLookupInternal<Child, IESP> {
    protected dbEntity: DbEntity;
    protected mapResults: boolean;
    static mapResults: boolean;
    constructor(dbEntity: DbEntity, dao: IDaoStub, mapResults?: boolean);
    setNoCache(ChildClass: new (dbEntity: DbEntity, dao: IDaoStub, mapResults: boolean) => Child): Child;
    entityLookup(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, context: IEntityQueryContext): Promise<any>;
}
//# sourceMappingURL=EntityLookup.d.ts.map