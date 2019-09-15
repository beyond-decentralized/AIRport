import { CascadeOverwrite } from '@airport/ground-control';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '../core/entity/Entity';
import { IEntityDatabaseFacade } from '../core/repository/EntityDatabaseFacade';
/**
 * Data access object.
 */
export interface IDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> {
    db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE>;
    staged: Set<Entity>;
    bulkCreate(entities: EntityCreate[], cascadeOverwrite?: CascadeOverwrite | EntityCascadeGraph, checkIfProcessed?: boolean): Promise<number>;
    count(): Promise<number>;
    /**
     * Does not cascade?
     * @param {EntityCreate[] | EntityCreate} entityInfo
     * @returns {Promise<number>}
     */
    create<EntityInfo extends EntityCreate | EntityCreate[]>(entityInfo: EntityInfo, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    delete(entityIdInfo: EntityId | EntityId[], cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
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
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entityInfo: EntityInfo, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    /**
     *
     * @param {EntityCreate[] | EntityCreate} entity
     * @param cascadeGraph
     * @returns {Promise<number>}
     */
    stage<EntityInfo extends Entity | Entity[]>(entityInfo: EntityInfo): Promise<void>;
    /**
     * Stages/caches the entity for later modifications (modifications
     * are not saved and are just stored in memory).
     *
     * TODO: probably not needed since cache is now on each entity
     *
     * @param entity
     * @returns {Promise<number>}
     */
    /**
     * Does not cascade?
     * @param {EntityCreate[] | EntityCreate} entityInfo
     * @returns {Promise<number>}
     */
    update(entityInfo: EntityCreate | EntityCreate[], cascadeOverwrite?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
}
