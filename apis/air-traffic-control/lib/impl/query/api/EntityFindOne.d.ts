import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntityFindOne } from '../../../lingo/query/api/EntityFindOne';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { EntityLookup } from './EntityLookup';
export interface IEntityFindOneInternal<Entity, IESP extends IEntitySelectProperties> extends IEntityFindOne<Entity, IESP> {
    findOne(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, context: IContext): Promise<Entity>;
}
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntityFindOne<Entity, IESP extends IEntitySelectProperties> extends EntityLookup<EntityFindOne<Entity, IESP>, IESP> implements IEntityFindOneInternal<Entity, IESP> {
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Promise<Entity>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Promise<Entity>;
    findOne(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, context?: IContext): Promise<Entity>;
    noCache(): EntityFindOne<Entity, IESP>;
}
//# sourceMappingURL=EntityFindOne.d.ts.map