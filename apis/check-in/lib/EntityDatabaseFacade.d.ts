import { IDatabaseFacade, IDuo, IEntityCreateProperties, IEntityDatabaseFacade, IEntityFind, IEntityFindOne, IEntityIdProperties, IEntitySearch, IEntitySearchOne, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, IUtils, MappedEntityArray, QSchema, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate, UpdateCacheType } from "@airport/air-control";
import { DbEntity } from "@airport/ground-control";
/**
 * Created by Papa on 12/11/2016.
 */
export declare class EntityDatabaseFacade<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQ extends IQEntity> implements IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, IQ> {
    dbEntity: DbEntity;
    private Q;
    private utils;
    common: IDatabaseFacade;
    duo: IDuo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQ>;
    find: IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    findOne: IEntityFindOne<Entity, EntitySelect>;
    search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    searchOne: IEntitySearchOne<Entity, EntitySelect>;
    constructor(dbEntity: DbEntity, Q: QSchema, utils: IUtils);
    readonly from: IQ;
    initialize(databaseFacade: IDatabaseFacade): void;
    releaseCachedForUpdate(updateCacheType: UpdateCacheType, ...entities: Entity[]): void;
    create(entity: EntityCreate): Promise<number>;
    bulkCreate(entities: EntityCreate[], checkIfProcessed?: boolean, cascade?: boolean): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number[] | string[]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number[] | string[]>;
    update(entity: EntityCreate): Promise<number>;
    updateColumnsWhere(rawUpdateColumns: RawUpdate<EntityUpdateColumns, IQ> | {
        (...args: any[]): RawUpdate<EntityUpdateColumns, IQ>;
    }): Promise<number>;
    updateWhere(rawUpdate: RawUpdate<EntityUpdateProperties, IQ> | {
        (...args: any[]): RawUpdate<EntityUpdateProperties, IQ>;
    }): Promise<number>;
    delete(entity: EntityId): Promise<number>;
    deleteWhere(rawDelete: RawDelete<IQ> | {
        (...args: any[]): RawDelete<IQ>;
    }): Promise<number>;
    save(entity: EntityCreate): Promise<number>;
}
