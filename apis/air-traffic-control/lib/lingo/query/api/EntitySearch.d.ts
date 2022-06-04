import { IContext } from '@airport/direction-indicator';
import { Observable } from 'rxjs';
import { IEntitySelectProperties } from '../../core/entity/Entity';
import { RawEntityQuery } from '../facade/EntityQuery';
import { IEntityLookup } from './EntityLookup';
/**
 * Entity 'searchOne' (searchOne many) API.
 */
export interface IEntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends IEntityLookup {
    /**
     * Returns an Observable of a list of fully interlinked entity graphs.
     */
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, ctx?: IContext): Observable<EntityArray>;
    /**
     * Returns an Observable for a list of non-interlinked entity trees.
     */
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, ctx?: IContext): Observable<EntityArray>;
}
//# sourceMappingURL=EntitySearch.d.ts.map