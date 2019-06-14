import { DbEntity } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IDatabaseFacade } from '../../../lingo/core/repository/DatabaseFacade';
import { IEntitySearch } from '../../../lingo/query/api/EntitySearch';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { MappedEntityArray } from '../../../lingo/query/MappedEntityArray';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends EntityLookup<EntitySearch<Entity, Array<Entity>, IESP>, EntitySearch<Entity, MappedEntityArray<Entity>, IESP>> implements IEntitySearch<Entity, EntityArray, IESP> {
    protected dbEntity: DbEntity;
    protected dbFacade: IDatabaseFacade;
    constructor(dbEntity: DbEntity, dbFacade: IDatabaseFacade);
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): IObservable<EntityArray>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): IObservable<EntityArray>;
    private doSearch;
}
