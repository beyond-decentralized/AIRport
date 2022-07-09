import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { IEntitySelectProperties, RawEntityQuery } from '@airport/tarmaq-query';
import { IEntityFind } from '../../definition/query/EntityFind';
import { EntityLookup } from './EntityLookup';
export interface IEntityFindInternal<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends IEntityFind<Entity, EntityArray, IESP> {
    find(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType): Promise<EntityArray>;
}
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntityFind<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends EntityLookup<EntityFind<Entity, Array<Entity>, IESP>, IESP> implements IEntityFindInternal<Entity, EntityArray, IESP> {
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Promise<EntityArray>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Promise<EntityArray>;
    find(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, context?: IContext): Promise<EntityArray>;
    noCache(): EntityFind<Entity, Entity[], IESP>;
}
//# sourceMappingURL=EntityFind.d.ts.map