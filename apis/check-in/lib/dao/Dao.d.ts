import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityDatabaseFacade, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, QSchema } from '@airport/air-control';
import { IContext } from '@airport/di';
import { EntityId as DbEntityId, ISaveResult } from '@airport/ground-control';
import { DaoStub } from './DaoStub';
/**
 * Created by Papa on 8/26/2017.
 */
export declare abstract class Dao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, QE extends IQEntity<Entity>> implements IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE> {
    private internal;
    static BaseSave<EntitySelect extends IEntitySelectProperties>(config: EntitySelect): PropertyDecorator;
    db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE>;
    stub: DaoStub<Entity, EntityCreate>;
    constructor(dbEntityId: DbEntityId, Q: QSchema, internal?: boolean);
    count(context?: IContext): Promise<number>;
    exists(entityId: EntityId, context?: IContext): Promise<boolean>;
    protected repositoryId(): {
        actor: {
            id: any;
            uuId: any;
        };
        actorRecordId: any;
        ageSuitability: any;
        repository: {
            id: any;
            uuId: any;
        };
    };
    findAll(entityIds?: EntityId[], context?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findAllAsTrees(entityIds?: EntityId[], context?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findById(entityId: EntityId, context?: IContext, cacheForUpdate?: boolean): Promise<Entity>;
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo, context?: IContext): Promise<ISaveResult>;
    markForDeletion<EntityInfo extends EntityCreate | EntityCreate[]>(entityIdInfo: EntityInfo, context?: IContext): void;
    private ensureContext;
}
//# sourceMappingURL=Dao.d.ts.map