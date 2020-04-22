import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '../core/entity/Entity';
import { IEntityDatabaseFacade } from '../core/repository/EntityDatabaseFacade';
export declare type OperationName = string;
/**
 * Data access object.
 */
export interface IDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> {
    db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE>;
    bulkCreate(entities: EntityCreate[], checkIfProcessed?: boolean, operationName?: OperationName): Promise<number>;
    count(): Promise<number>;
    /**
     * Does not cascade?
     * @param {EntityCreate[] | EntityCreate} entityInfo
     * @returns {Promise<number>}
     */
    create<EntityInfo extends EntityCreate | EntityCreate[]>(entityInfo: EntityInfo, operationName?: OperationName): Promise<number>;
    delete(entityIdInfo: EntityId | EntityId[], operationName?: OperationName): Promise<number>;
    deleteAll(): Promise<number>;
    exists(entityId: EntityId): Promise<boolean>;
    findAll(entityIds?: EntityId[]): Promise<Entity[]>;
    findAllAsTrees(entityIds?: EntityId[]): Promise<Entity[]>;
    findById(entityId: EntityId): Promise<Entity>;
    /**
     * Either creates or updates the entity based entity
     * state flag.  Cascades.
     *
     * @param {EntityCreate[] | EntityCreate} entityInfo
     * @param cascadeGraph
     * @returns {Promise<number>}
     */
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entityInfo: EntityInfo, operationName?: OperationName): Promise<number>;
    /**
     * Does not cascade?
     * @param {EntityCreate[] | EntityCreate} entityInfo
     * @returns {Promise<number>}
     */
    update(entityInfo: EntityCreate | EntityCreate[], operationName?: OperationName): Promise<number>;
}
