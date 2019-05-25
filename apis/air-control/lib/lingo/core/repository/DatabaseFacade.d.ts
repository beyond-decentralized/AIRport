import { DbEntity, DistributionStrategy, ITransactionalConnector, PlatformType, PortableQuery, QueryResultType } from "@airport/ground-control";
import { IObservable } from "@airport/observe";
import { AbstractQuery } from "../../../impl/query/facade/AbstractQuery";
import { UpdateCacheType } from "../../query/api/EntityLookup";
import { INonEntityFind } from '../../query/api/NonEntityFind';
import { INonEntityFindOne } from '../../query/api/NonEntityFindOne';
import { INonEntitySearch } from '../../query/api/NonEntitySearch';
import { INonEntitySearchOne } from '../../query/api/NonEntitySearchOne';
import { RawDelete } from '../../query/facade/Delete';
import { RawInsertColumnValues, RawInsertValues } from "../../query/facade/InsertValues";
import { RawUpdate, RawUpdateColumns } from '../../query/facade/Update';
import { MappedEntityArray } from "../../query/MappedEntityArray";
import { EntityIdData } from "../../utils/SchemaUtils";
import { IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from "../entity/Entity";
export interface UpdateRecord {
    newValue: any;
    originalValue: any;
    idData: EntityIdData;
}
export interface IFunctionWrapper<QF extends Function> {
    find: QF;
}
/**
 * Facade for all DB operations not related to a particular entity.
 */
export interface IDatabaseFacade {
    /**
     * Name of the terminal
     */
    name: string;
    /**
     * The Promise based API for all non-Entity 'find' (find many) queries.
     */
    find: INonEntityFind;
    /**
     * The Promise based API for all non-Entity 'findOne' queries.
     */
    findOne: INonEntityFindOne;
    /**
     * The Observable based API for all non-Entity 'search' (search many) queries.
     */
    search: INonEntitySearch;
    /**
     * The Observable based API for all non-Entity 'searchOne' queries.
     */
    searchOne: INonEntitySearchOne;
    entity: IQueryFacade;
    /**
     * Connector to the transactional server.
     */
    transConnector: ITransactionalConnector;
    /**
     * Start Context for an UpdateProperties Operation.  All entity update operations must be
     * performed on cached entities.
     *
     * This starts recording all queries and allows the update to diff recorded
     * query results with the updated object to get the actual changed fields.
     *
     * @param {Entity} entities
     */
    cacheForUpdate(cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    /**
     * Releases UpdateProperties Cache for entities that haven't been released
     * via an update call.
     *
     * @param {Entity} entities
     */
    releaseCachedForUpdate(cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    /**
     * Completely drops update cache.
     */
    dropUpdateCache(): void;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created (1 or 0)
     */
    create<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created
     */
    bulkCreate<E>(dbEntity: DbEntity, entities: E[], checkIfProcessed: boolean, // defaults to true
    cascade: boolean, // defaults to false
    ensureGeneratedValues?: boolean): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number>;
    insertValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number[] | string[]>;
    insertValuesGenerateIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number[] | string[]>;
    /**
     * Deletes an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records deleted (1 or 0)
     */
    delete<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    deleteWhere<IQE extends IQEntity>(dbEntity: DbEntity, rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }): Promise<number>;
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    save<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    /**
     * Updates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records updated (1 or 0)
     */
    update<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(dbEntity: DbEntity, rawUpdateColumns: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }): Promise<number>;
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(dbEntity: DbEntity, rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
        (...args: any[]): RawUpdate<IEUP, IQE>;
    }): Promise<number>;
    getOriginalRecord(dbEntity: DbEntity, idKey: string): Promise<any>;
    getOriginalValues(entitiesToUpdate: UpdateRecord[], dbEntity: DbEntity): Promise<MappedEntityArray<any>>;
    prepare<QF extends Function>(queryFunction: QF): IFunctionWrapper<QF>;
}
export interface IQueryFacade {
    find<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Promise<EntityArray>;
    findOne<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Promise<E>;
    search<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): IObservable<EntityArray>;
    searchOne<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): IObservable<E>;
    getPortableQuery<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType): PortableQuery;
}
