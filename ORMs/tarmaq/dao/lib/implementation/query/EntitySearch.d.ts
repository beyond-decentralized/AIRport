import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { IEntitySelectProperties, RawEntityQuery } from '@airport/tarmaq-query';
import { Observable } from 'rxjs';
import { IEntitySearch } from '../../definition/query/EntitySearch';
import { EntityLookup } from './EntityLookup';
export interface IEntitySearchInternal<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends IEntitySearch<Entity, EntityArray, IESP> {
    search(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, context?: IContext): Promise<EntityArray>;
}
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends EntityLookup<EntitySearch<Entity, Array<Entity>, IESP>, IESP> implements IEntitySearchInternal<Entity, EntityArray, IESP> {
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Observable<EntityArray>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Observable<EntityArray>;
    search(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, context?: IContext): Promise<EntityArray>;
    noCache(): EntitySearch<Entity, Entity[], IESP>;
}
//# sourceMappingURL=EntitySearch.d.ts.map