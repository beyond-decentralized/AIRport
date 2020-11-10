import { DbEntity, DistributionStrategy, PlatformType, PortableQuery, QueryResultType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { IEntityContext, IEntityOperationContext } from '../../..';
import { OperationName } from '../../query/Dao';
import { IAbstractQuery } from '../../query/facade/AbstractQuery';
import { RawDelete } from '../../query/facade/Delete';
import { RawInsertColumnValues, RawInsertValues } from '../../query/facade/InsertValues';
import { RawUpdate, RawUpdateColumns } from '../../query/facade/Update';
import { IFieldUtils } from '../../utils/FieldUtils';
import { IQueryUtils } from '../../utils/QueryUtils';
import { EntityIdData } from '../../utils/SchemaUtils';
import { UpdateCacheType } from '../data/UpdateCacheType';
import { IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '../entity/Entity';
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
     * Start Context for an UpdateProperties Operation.  All entity update operations must
     * be performed on cached entities.
     *
     * This starts recording all queries and allows the update to diff recorded
     * query results with the updated object to get the actual changed fields.
     *
     * @param {Entity} entities
     */
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, ctx: IEntityContext): Promise<number>;
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created (1 or 0)
     */
    create<E, EntityCascadeGraph>(entity: E, ctx: IEntityContext, operationName?: OperationName): Promise<number>;
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created
     */
    bulkCreate<E, EntityCascadeGraph>(entities: E[], ctx: IEntityContext, checkIfProcessed: boolean, // defaults to true
    operationName?: OperationName, ensureGeneratedValues?: boolean): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx: IEntityContext): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx: IEntityContext): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    /**
     * Deletes an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records deleted (1 or 0)
     */
    delete<E>(entity: E, ctx: IEntityContext, operationName?: OperationName): Promise<number>;
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    deleteWhere<IQE extends IQEntity>(rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }, ctx: IEntityContext): Promise<number>;
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    save<E, EntityCascadeGraph>(entity: E, ctx: IEntityContext, operationName?: OperationName): Promise<number>;
    /**
     * Updates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records updated (1 or 0)
     */
    update<E, EntityCascadeGraph>(dbEntity: DbEntity, entity: E, ctx: IEntityContext, operationName?: OperationName): Promise<number>;
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(rawUpdateColumns: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }, ctx: IEntityContext): Promise<number>;
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
        (...args: any[]): RawUpdate<IEUP, IQE>;
    }, ctx: IEntityContext): Promise<number>;
    prepare<QF extends Function>(queryFunction: QF): IFunctionWrapper<QF>;
}
export interface IQueryFacade {
    find<E, EntityArray extends Array<E>>(query: IAbstractQuery, queryResultType: QueryResultType, ctx: IEntityOperationContext, cacheForUpdate?: UpdateCacheType): Promise<EntityArray>;
    findOne<E>(query: IAbstractQuery, queryResultType: QueryResultType, ctx: IEntityOperationContext, cacheForUpdate?: UpdateCacheType): Promise<E>;
    search<E, EntityArray extends Array<E>>(query: IAbstractQuery, queryResultType: QueryResultType, ctx: IEntityOperationContext, cacheForUpdate?: UpdateCacheType): Promise<IObservable<EntityArray>>;
    searchOne<E>(query: IAbstractQuery, queryResultType: QueryResultType, ctx: IEntityOperationContext, cacheForUpdate?: UpdateCacheType): Promise<IObservable<E>>;
    getPortableQuery<E>(dbEntity: DbEntity, query: IAbstractQuery, queryResultType: QueryResultType, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): PortableQuery;
}
//# sourceMappingURL=DatabaseFacade.d.ts.map