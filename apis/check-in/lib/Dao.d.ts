import { IDao, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, QSchema, RawEntityQuery, UpdateCacheType } from '@airport/air-control';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
/**
 * Created by Papa on 8/26/2017.
 */
export declare abstract class Dao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, QE extends IQEntity> implements IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, QE> {
    private db;
    constructor(dbEntityId: DbEntityId, Q: QSchema);
    findAsGraph(rawTreeQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }): Promise<Array<Entity>>;
    findAsTree(rawTreeQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }): Promise<Array<Entity>>;
    findOneAsGraph(rawTreeQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }): Promise<Entity>;
    findOneAsTree(rawTreeQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }): Promise<Entity>;
    searchAsGraph(rawTreeQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }): IObservable<Array<Entity>>;
    searchAsTree(rawTreeQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }): IObservable<Array<Entity>>;
    searchOneAsGraph(rawTreeQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }): IObservable<Entity>;
    searchOneAsTree(rawTreeQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }): IObservable<Entity>;
    releaseCachedForUpdate(updateCacheType: UpdateCacheType, ...entities: Entity[]): Promise<void>;
    bulkCreate(entities: EntityCreate[], cascade?: boolean, checkIfProcessed?: boolean): Promise<number>;
    count(): Promise<number>;
    create<EntityInfo extends EntityCreate | EntityCreate[]>(entityInfo: EntityInfo): Promise<number>;
    delete(entityIdInfo: EntityId | EntityId[]): Promise<number>;
    deleteAll(): Promise<number>;
    exists(entityId: EntityId): Promise<boolean>;
    findAll(entityIds?: EntityId[], cacheForUpdate?: boolean): Promise<Entity[]>;
    findAllAsTrees(entityIds?: EntityId[], cacheForUpdate?: boolean): Promise<Entity[]>;
    findById(entityId: EntityId, cacheForUpdate?: boolean): Promise<Entity>;
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo): Promise<number>;
    stage<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo): Promise<number>;
    update(entityInfo: EntityCreate | EntityCreate[]): Promise<number>;
}
