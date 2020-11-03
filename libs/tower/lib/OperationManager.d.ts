import { Delete, EntityIdData, IAirportDatabase, IEntityUpdateColumns, IEntityUpdateProperties, IFieldUtils, IQEntity, IQMetadataUtils, IQueryFacade, IQueryUtils, ISchemaUtils, IUpdateCache, RawInsertColumnValues, RawInsertValues, UpdateColumns, UpdateProperties } from '@airport/air-control';
import { CascadeOverwrite, DbColumn, DbEntity, DbProperty, DbRelation } from '@airport/ground-control';
import { ITransactionalServer } from './core/data/ITransactionalServer';
import { ITransaction } from './ITransaction';
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
    protected performCreate<E, EntityCascadeGraph>(dbEntity: DbEntity, entity: E, createdEntityMap: {
        [entityId: string]: any;
    }[][], airDb: IAirportDatabase, fieldUtils: IFieldUtils, metadataUtils: IQMetadataUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transaction: ITransaction, transactionalServer: ITransactionalServer, updateCache: IUpdateCache, idData?: EntityIdData, cascadeOverwrite?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performBulkCreate<E, EntityCascadeGraph>(dbEntity: DbEntity, entities: E[], createdEntityMap: {
        [entityId: string]: any;
    }[][], airDb: IAirportDatabase, fieldUtils: IFieldUtils, metadataUtils: IQMetadataUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transaction: ITransaction, transactionalServer: ITransactionalServer, updateCache: IUpdateCache, checkIfProcessed?: boolean, cascadeOverwrite?: CascadeOverwrite | EntityCascadeGraph, ensureGeneratedValues?: boolean): Promise<number>;
    protected internalInsertColumnValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertColumnValues: RawInsertColumnValues<IQE>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, transaction: ITransaction): Promise<number>;
    protected internalInsertValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, transaction: ITransaction, ensureGeneratedValues?: boolean): Promise<number>;
    protected internalInsertColumnValuesGenerateIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertColumnValues: RawInsertColumnValues<IQE>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, transaction: ITransaction): Promise<number[] | string[] | number[][] | string[][]>;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performUpdate<E, EntityCascadeGraph>(dbEntity: DbEntity, entity: E, updatedEntityMap: {
        [entityId: string]: any;
    }[][], airDb: IAirportDatabase, fieldUtils: IFieldUtils, metadataUtils: IQMetadataUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transaction: ITransaction, transactionalServer: ITransactionalServer, updateCache: IUpdateCache, originalValue?: E, cascadeOverwrite?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    protected internalInsertValuesGetIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE>, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, transaction: ITransaction, transactionalServer: ITransactionalServer): Promise<number[] | string[] | number[][] | string[][]>;
    protected abstract getOriginalRecord(dbEntity: DbEntity, idKey: string, updateCache: IUpdateCache): Promise<any>;
    protected internalUpdateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(dbEntity: DbEntity, updateColumns: UpdateColumns<IEUC, IQE>, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, transaction: ITransaction, transactionalServer: ITransactionalServer): Promise<number>;
    protected internalUpdateWhere<E, IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(dbEntity: DbEntity, update: UpdateProperties<IEUP, IQE>, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, transaction: ITransaction, transactionalServer: ITransactionalServer): Promise<number>;
    /**
     * Transactional context must have been started by the time this method is called.
     * @param qEntity
     * @param entity
     */
    protected performDelete<E, EntityCascadeGraph>(dbEntity: DbEntity, entity: E, airDb: IAirportDatabase, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transaction: ITransaction, transactionalServer: ITransactionalServer): Promise<number>;
    protected internalDeleteWhere<E, IQE extends IQEntity>(dbEntity: DbEntity, aDelete: Delete<IQE>, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, transaction: ITransaction, transactionalServer: ITransactionalServer): Promise<number>;
    private internalCreate;
    private checkCascade;
    private columnProcessed;
    private cascadeOnPersist;
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
    private isProcessed;
    private internalDelete;
}
//# sourceMappingURL=OperationManager.d.ts.map