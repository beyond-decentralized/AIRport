import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { IEntitySelectProperties, RawEntityQuery } from '@airport/tarmaq-query';
import { Observable } from 'rxjs';
import { IEntitySearchOne } from '../../definition/query/EntitySearchOne';
import { EntityLookup } from './EntityLookup';
export interface IEntitySearchOneInternal<Entity, IESP extends IEntitySelectProperties> extends IEntitySearchOne<Entity, IESP> {
    searchOne(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, context?: IContext): Promise<Entity>;
}
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntitySearchOne<Entity, IESP extends IEntitySelectProperties> extends EntityLookup<EntitySearchOne<Entity, IESP>, IESP> implements IEntitySearchOneInternal<Entity, IESP> {
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Observable<Entity>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, context?: IContext): Observable<Entity>;
    searchOne(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, context?: IContext): Promise<Entity>;
}
//# sourceMappingURL=EntitySearchOne.d.ts.map