import { IContext } from '@airport/di';
import { IEntitySelectProperties } from '../../core/entity/Entity';
import { RawEntityQuery } from '../facade/EntityQuery';
import { IEntityLookup } from './EntityLookup';
/**
 * Entity 'findOne' API.
 */
export interface IEntityFindOne<Entity, IESP extends IEntitySelectProperties> extends IEntityLookup<IEntityFindOne<Entity, IESP>, IEntityFindOne<Entity, IESP>> {
    /**
     * Returns a Promise for a fully interlinked entity graph.
     */
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, ctx?: IContext): Promise<Entity>;
    /**
     * Returns a Promise for a non-interlinked entity tree.
     */
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, ctx?: IContext): Promise<Entity>;
}
//# sourceMappingURL=EntityFindOne.d.ts.map