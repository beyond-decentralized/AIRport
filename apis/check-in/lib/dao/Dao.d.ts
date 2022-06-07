import { IAirportDatabase, IDao, IDatabaseFacade, IEntityCascadeGraph, IEntityCreateProperties, IEntityDatabaseFacade, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, ILookup, IQEntity, IUpdateCacheManager, RawEntityQuery } from '@airport/air-traffic-control';
import { QApplication, RepositoryEntityId } from '@airport/aviation-communication';
import { IContext } from '@airport/direction-indicator';
import { EntityId as DbEntityId, IEntityStateManager, IRepositoryEntity, ISaveResult } from '@airport/ground-control';
import { Observable } from 'rxjs';
import { DaoStub } from './DaoStub';
/**
 * Created by Papa on 8/26/2017.
 */
export declare abstract class Dao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, QE extends IQEntity> implements IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE> {
    private internal;
    static BaseSave<EntitySelect extends IEntitySelectProperties>(config: EntitySelect): PropertyDecorator;
    airportDatabase: IAirportDatabase;
    databaseFacade: IDatabaseFacade;
    entityStateManager: IEntityStateManager;
    lookup: ILookup;
    updateCacheManager: IUpdateCacheManager;
    db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, QE>;
    stub: DaoStub<Entity, EntityCreate>;
    constructor(dbEntityId: DbEntityId, Q: QApplication, internal?: boolean);
    mapByUuId(entities: (Entity & IRepositoryEntity)[]): Map<string, Entity>;
    count(context?: IContext): Promise<number>;
    exists(entityId: EntityId, context?: IContext): Promise<boolean>;
    findAll(entityIds?: EntityId[], context?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findAllAsTrees(entityIds?: EntityId[], context?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findByUuId(repositoryEntityUuId: RepositoryEntityId | string, context?: IContext): Promise<Entity>;
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo, context?: IContext): Promise<ISaveResult>;
    markForDeletion<EntityInfo extends EntityCreate | EntityCreate[]>(entityIdInfo: EntityInfo, context?: IContext): void;
    protected _repositoryId(): {
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
    /**
     * The Promise based API for all Entity 'find' (find many) queries.
     */
    protected _find(rawGraphQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }, ctx?: IContext): Promise<Array<Entity>>;
    /**
     * The Promise based API for all Entity 'findOne' that also
     * ensures that the record is unique.  If multiple records
     * are found the ones with older createdAt values are deleted.
     */
    protected _findUnique<E extends IRepositoryEntity & Entity>(rawGraphQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }, ctx?: IContext): Promise<E>;
    /**
     * The Promise based API for all Entity 'findOne' queries.
     */
    protected _findOne(rawGraphQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }, ctx?: IContext): Promise<Entity>;
    /**
     * The Observable based API for all Entity 'searchOne' (searchOne many) queries.
     */
    protected _search(rawGraphQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }, ctx?: IContext): Observable<Array<Entity>>;
    /**
     * The Observable based API for all Entity 'searchOne' queries.
     */
    protected _searchOne(rawGraphQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }, ctx?: IContext): Observable<Entity>;
    private ensureContext;
}
//# sourceMappingURL=Dao.d.ts.map