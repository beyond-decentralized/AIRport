import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { Observable } from 'rxjs';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntitySearch } from '../../../lingo/query/api/EntitySearch';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { MappedEntityArray } from '../../../lingo/query/MappedEntityArray';
import { EntityLookup } from './EntityLookup';
export interface IEntitySearchInternal<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends IEntitySearch<Entity, EntityArray, IESP> {
    search(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, context?: IContext): Promise<EntityArray>;
}
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends EntityLookup<EntitySearch<Entity, Array<Entity>, IESP>, EntitySearch<Entity, MappedEntityArray<Entity>, IESP>, IESP> implements IEntitySearchInternal<Entity, EntityArray, IESP> {
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Observable<EntityArray>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Observable<EntityArray>;
    search(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, context?: IContext): Promise<EntityArray>;
    map(isMapped?: boolean): EntitySearch<Entity, MappedEntityArray<Entity>, IESP>;
    noCache(): EntitySearch<Entity, Entity[], IESP>;
}
//# sourceMappingURL=EntitySearch.d.ts.map