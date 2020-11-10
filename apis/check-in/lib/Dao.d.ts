import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityDatabaseFacade, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, OperationName, QSchema } from '@airport/air-control';
import { IContext } from '@airport/di';
import { EntityId as DbEntityId } from '@airport/ground-control';
/**
 * Created by Papa on 8/26/2017.
 */
export declare abstract class Dao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, QE extends IQEntity> implements IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE> {
    db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE>;
    constructor(dbEntityId: DbEntityId, Q: QSchema);
    bulkCreate(entities: EntityCreate[], checkIfProcessed?: boolean, ctx?: IContext, operationName?: OperationName): Promise<number>;
    count(ctx?: IContext): Promise<number>;
    create<EntityInfo extends EntityCreate | EntityCreate[]>(entityInfo: EntityInfo, ctx?: IContext, operationName?: OperationName): Promise<number>;
    delete(entityIdInfo: EntityId | EntityId[], ctx?: IContext, operationName?: OperationName): Promise<number>;
    deleteAll(ctx?: IContext): Promise<number>;
    exists(entityId: EntityId, ctx?: IContext): Promise<boolean>;
    findAll(entityIds?: EntityId[], ctx?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findAllAsTrees(entityIds?: EntityId[], ctx?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findById(entityId: EntityId, ctx?: IContext, cacheForUpdate?: boolean): Promise<Entity>;
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo, ctx?: IContext, operationName?: OperationName): Promise<number>;
    update(entityInfo: EntityCreate | EntityCreate[], ctx?: IContext, operationName?: OperationName): Promise<number>;
}
//# sourceMappingURL=Dao.d.ts.map