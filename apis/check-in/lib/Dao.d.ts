import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityDatabaseFacade, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, OperationName, QSchema } from '@airport/air-traffic-control';
import { IContext } from '@airport/direction-indicator';
import { EntityId as DbEntityId } from '@airport/ground-control';
/**
 * Created by Papa on 8/26/2017.
 */
export declare abstract class Dao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, QE extends IQEntity<Entity>> implements IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE> {
    db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE>;
    constructor(dbEntityId: DbEntityId, Q: QSchema);
    count(context?: IContext): Promise<number>;
    exists(entityId: EntityId, context?: IContext): Promise<boolean>;
    findAll(entityIds?: EntityId[], context?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findAllAsTrees(entityIds?: EntityId[], context?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findById(entityId: EntityId, context?: IContext, cacheForUpdate?: boolean): Promise<Entity>;
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo, context?: IContext, operationName?: OperationName): Promise<number>;
    markForDeletion<EntityInfo extends EntityCreate | EntityCreate[]>(entityIdInfo: EntityInfo, context?: IContext): void;
    private ensureContext;
}
//# sourceMappingURL=Dao.d.ts.map