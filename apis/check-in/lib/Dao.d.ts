import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityDatabaseFacade, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, QSchema } from '@airport/air-control';
import { CascadeOverwrite, EntityId as DbEntityId } from '@airport/ground-control';
/**
 * Created by Papa on 8/26/2017.
 */
export declare abstract class Dao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, QE extends IQEntity> implements IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE> {
    db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE>;
    constructor(dbEntityId: DbEntityId, Q: QSchema);
    bulkCreate(entities: EntityCreate[], cascadeOverwrite?: CascadeOverwrite | EntityCascadeGraph, checkIfProcessed?: boolean): Promise<number>;
    count(): Promise<number>;
    create<EntityInfo extends EntityCreate | EntityCreate[]>(entityInfo: EntityInfo, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    delete(entityIdInfo: EntityId | EntityId[], cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    deleteAll(): Promise<number>;
    exists(entityId: EntityId): Promise<boolean>;
    findAll(entityIds?: EntityId[], cacheForUpdate?: boolean): Promise<Entity[]>;
    findAllAsTrees(entityIds?: EntityId[], cacheForUpdate?: boolean): Promise<Entity[]>;
    findById(entityId: EntityId, cacheForUpdate?: boolean): Promise<Entity>;
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    stage<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    update(entityInfo: EntityCreate | EntityCreate[], cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
}
