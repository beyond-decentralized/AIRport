import { Delete, EntityIdData, IAirportDatabase, IEntityUpdateColumns, IEntityUpdateProperties, IFieldUtils, IQEntity, IQMetadataUtils, IQueryFacade, IQueryUtils, ISchemaUtils, IUpdateCache, MappedEntityArray, RawInsertColumnValues, RawInsertValues, UpdateColumns, UpdateProperties, UpdateRecord } from '@airport/air-control';
import { CascadeOverwrite, DbColumn, DbEntity, DbProperty, DbRelation, ITransactionalConnector, JSONBaseOperation } from '@airport/ground-control';
/**
 * Created by Papa on 11/15/2016.
 */
export interface ResultWithCascade {
    recordChanged?: boolean;
    numberOfAffectedRecords: number;
    cascadeRecords: CascadeRecord[];
}
export interface CascadeRecord {
    relation: DbRelation;
    manyEntities: any[];
}
export interface IOperationManager {
    throwUnexpectedProperty(dbProperty: DbProperty, dbColumn: DbColumn, value: any): any;
}
export declare abstract class OperationManager implements IOperationManager {
    throwUnexpectedProperty(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
    protected warn(message: string): void;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performCreate<E>(dbEntity: DbEntity, entity: E, createdEntityMap: {
        [entityId: string]: any;
    }[][], airDb: IAirportDatabase, fieldUtils: IFieldUtils, metadataUtils: IQMetadataUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector, updateCache: IUpdateCache, idData?: EntityIdData, cascadeOverwrite?: CascadeOverwrite): Promise<number>;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performBulkCreate<E>(dbEntity: DbEntity, entities: E[], createdEntityMap: {
        [entityId: string]: any;
    }[][], airDb: IAirportDatabase, fieldUtils: IFieldUtils, metadataUtils: IQMetadataUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector, updateCache: IUpdateCache, checkIfProcessed?: boolean, cascadeOverwrite?: CascadeOverwrite, ensureGeneratedValues?: boolean): Promise<number>;
    private internalCreate;
    private columnProcessed;
    protected internalInsertColumnValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertColumnValues: RawInsertColumnValues<IQE>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): Promise<number>;
    protected internalInsertValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, ensureGeneratedValues?: boolean): Promise<number>;
    protected internalInsertColumnValuesGenerateIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertColumnValues: RawInsertColumnValues<IQE>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): Promise<number[] | string[] | number[][] | string[][]>;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performUpdate<E>(dbEntity: DbEntity, entity: E, updatedEntityMap: {
        [entityId: string]: any;
    }[][], airDb: IAirportDatabase, fieldUtils: IFieldUtils, metadataUtils: IQMetadataUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector, updateCache: IUpdateCache, originalValue?: E, cascadeOverwrite?: CascadeOverwrite): Promise<number>;
    protected internalInsertValuesGetIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE>, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, transConnector: ITransactionalConnector): Promise<number[] | string[] | number[][] | string[][]>;
    private cascadeOnPersist;
    protected abstract getOriginalRecord(dbEntity: DbEntity, idKey: string, updateCache: IUpdateCache): Promise<any>;
    protected abstract getOriginalValues(entitiesToUpdate: UpdateRecord[], dbEntity: DbEntity, airDb: IAirportDatabase, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector, updateCache: IUpdateCache): Promise<MappedEntityArray<any>>;
    protected getIdsWhereClause(entitiesToUpdate: UpdateRecord[], qEntity: IQEntity): JSONBaseOperation;
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    private internalUpdate;
    private ensureNonRelationalValue;
    private assertRelationValueIsAnObject;
    private assertManyToOneNotArray;
    private assertOneToManyIsArray;
    protected internalUpdateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(dbEntity: DbEntity, updateColumns: UpdateColumns<IEUC, IQE>, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, transConnector: ITransactionalConnector): Promise<number>;
    protected internalUpdateWhere<E, IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(dbEntity: DbEntity, update: UpdateProperties<IEUP, IQE>, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, transConnector: ITransactionalConnector): Promise<number>;
    /**
     * Transactional context must have been started by the time this method is called.
     * @param qEntity
     * @param entity
     */
    protected performDelete<E>(dbEntity: DbEntity, entity: E, airDb: IAirportDatabase, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector): Promise<number>;
    private isProcessed;
    protected internalDeleteWhere<E, IQE extends IQEntity>(dbEntity: DbEntity, aDelete: Delete<IQE>, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, transConnector: ITransactionalConnector): Promise<number>;
    private internalDelete;
}
