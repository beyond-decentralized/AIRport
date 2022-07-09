import { QApplication, AirEntityId } from '@airport/aviation-communication';
import { IContext } from '@airport/direction-indicator';
import { ApplicationEntity_LocalId as DbEntityId, IEntityStateManager, IAirEntity, ISaveResult } from '@airport/ground-control';
import { IDao, IDatabaseFacade, IEntityDatabaseFacade, ILookup } from '@airport/tarmaq-dao';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, RawEntityQuery } from '@airport/tarmaq-query';
import { Observable } from 'rxjs';
import { IAirportDatabase } from '../definition/AirportDatabase';
import { IUpdateCacheManager } from '../definition/UpdateCacheManager';
/**
 * Created by Papa on 8/26/2017.
 */
export declare abstract class Dao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, QE extends IQEntity> implements IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, QE> {
    private internal;
    static BaseSave<EntitySelect extends IEntitySelectProperties>(config: EntitySelect): PropertyDecorator;
    airportDatabase: IAirportDatabase;
    databaseFacade: IDatabaseFacade;
    entityStateManager: IEntityStateManager;
    lookup: ILookup;
    updateCacheManager: IUpdateCacheManager;
    db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, QE>;
    constructor(dbEntityId: DbEntityId, Q: QApplication, internal?: boolean);
    mapById(entities: (Entity & IAirEntity)[]): Map<string, Entity>;
    count(context?: IContext): Promise<number>;
    exists(entityId: ApplicationEntity_LocalId, context?: IContext): Promise<boolean>;
    findAll(entityIds?: ApplicationEntity_LocalId[], context?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findAllAsTrees(entityIds?: ApplicationEntity_LocalId[], context?: IContext, cacheForUpdate?: boolean): Promise<Entity[]>;
    findOne(AirEntityId: Entity | AirEntityId | string, forUpdate?: boolean, context?: IContext): Promise<Entity>;
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo, context?: IContext): Promise<ISaveResult>;
    markForDeletion<EntityInfo extends EntityCreate | EntityCreate[]>(entityIdInfo: EntityInfo, context?: IContext): void;
    protected _repositoryId(): {
        actor: {
            _localId: any;
        };
        _actorRecordId: any;
        ageSuitability: any;
        repository: {
            _localId: any;
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
    protected _findUnique<E extends IAirEntity & Entity>(rawGraphQuery: RawEntityQuery<EntitySelect> | {
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