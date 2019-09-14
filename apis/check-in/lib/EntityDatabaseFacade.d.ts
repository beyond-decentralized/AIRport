import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityDatabaseFacade, IEntityFind, IEntityFindOne, IEntityIdProperties, IEntitySearch, IEntitySearchOne, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, MappedEntityArray, QSchema, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate } from '@airport/air-control';
import { CascadeOverwrite, DbEntity } from '@airport/ground-control';
/**
 * Created by Papa on 12/11/2016.
 */
export declare class EntityDatabaseFacade<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQ extends IQEntity> implements IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQ> {
    dbEntity: DbEntity;
    private Q;
    duo: IDuo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQ>;
    find: IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    findOne: IEntityFindOne<Entity, EntitySelect>;
    search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    searchOne: IEntitySearchOne<Entity, EntitySelect>;
    constructor(dbEntity: DbEntity, Q: QSchema);
    readonly from: IQ;
    create(entity: EntityCreate, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    bulkCreate(entities: EntityCreate[], cascadeOverwrite?: CascadeOverwrite | EntityCascadeGraph, checkIfProcessed?: boolean): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number[] | string[] | number[][] | string[][]>;
    update(entity: EntityCreate, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
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
    save(entity: EntityCreate, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
}
