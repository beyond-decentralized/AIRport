import { IAirportDatabase, IDao, IEntityCreateProperties, IEntityDatabaseFacade, IEntityFind, IEntityFindOne, IEntityIdProperties, IEntitySearch, IEntitySearchOne, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, IUtils, QSchema, UpdateCacheType } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
/**
 * Created by Papa on 8/26/2017.
 */
export declare abstract class Dao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, QE extends IQEntity> implements IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, QE> {
    protected db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, QE>;
    protected utils: IUtils;
    protected airDb: IAirportDatabase;
    constructor(dbEntity: DbEntity, Q: QSchema);
    readonly find: IEntityFind<Entity, Array<Entity>, EntitySelect>;
    readonly findOne: IEntityFindOne<Entity, EntitySelect>;
    readonly search: IEntitySearch<Entity, Array<Entity>, EntitySelect>;
    readonly searchOne: IEntitySearchOne<Entity, EntitySelect>;
    releaseCachedForUpdate(updateCacheType: UpdateCacheType, ...entities: Entity[]): void;
    bulkCreate(entities: EntityCreate[], cascade?: boolean, checkIfProcessed?: boolean): Promise<number>;
    count(): Promise<number>;
    create<EntityInfo extends EntityCreate | EntityCreate[]>(entityInfo: EntityInfo): Promise<number>;
    delete(entityIdInfo: EntityId | EntityId[]): Promise<number>;
    deleteAll(): Promise<number>;
    exists(entityId: EntityId): Promise<boolean>;
    findAll(entityIds?: EntityId[], cacheForUpdate?: boolean): Promise<Entity[]>;
    findAllAsTrees(entityIds?: EntityId[], cacheForUpdate?: boolean): Promise<Entity[]>;
    findById(entityId: EntityId, cacheForUpdate?: boolean): Promise<Entity>;
    save<EntityInfo extends EntityCreate | EntityCreate[]>(entity: EntityInfo): Promise<number>;
    update(entityInfo: EntityCreate | EntityCreate[]): Promise<number>;
}
