import { IContext } from '@airport/di';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '../core/entity/Entity';
import { IEntityDatabaseFacade } from '../core/repository/EntityDatabaseFacade';
export declare type OperationName = string;
/**
 * Data access object.
 */
export interface IDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> {
    db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE>;
    count(context?: IContext): Promise<number>;
    exists(entityId: EntityId, context?: IContext): Promise<boolean>;
    findAll(entityIds?: EntityId[], context?: IContext): Promise<Entity[]>;
    findAllAsTrees(entityIds?: EntityId[], context?: IContext): Promise<Entity[]>;
    findById(entityId: EntityId, context?: IContext): Promise<Entity>;
    /**
     * Either creates or updates the entity based entity
     * state flag.  Cascades.
     *
     * @param {EntityCreate[] | EntityCreate} entityInfo
     * @param context
     * @returns {Promise<number>}
     */
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entityInfo: EntityInfo, context?: IContext): Promise<number>;
    markForDeletion<EntityInfo extends EntityCreate | EntityCreate[]>(entityIdInfo: EntityInfo, context?: IContext): void;
}
//# sourceMappingURL=Dao.d.ts.map