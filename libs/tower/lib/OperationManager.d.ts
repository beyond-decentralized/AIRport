import { Delete, EntityIdData, IAirportDatabase, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, IQueryFacade, IUtils, MappedEntityArray, RawInsertColumnValues, RawInsertValues, UpdateColumns, UpdateProperties, UpdateRecord } from "@airport/air-control";
import { DbColumn, DbEntity, DbProperty, DbRelation, JSONBaseOperation } from "@airport/ground-control";
import { IInternalTransactionalConnector } from "./core/data/IInternalTransactionalConnector";
import { IUpdateCache } from "./core/data/UpdateCache";
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
    protected airportDb: IAirportDatabase;
    utils: IUtils;
    entity: IQueryFacade;
    transactionClient: IInternalTransactionalConnector;
    updateCache: IUpdateCache;
    transactionInProgress: boolean;
    higherOrderOpsYieldLength: number;
    constructor(airportDb: IAirportDatabase, utils: IUtils, entity: IQueryFacade, transactionClient: IInternalTransactionalConnector, updateCache: IUpdateCache);
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
    }[][], idData?: EntityIdData, cascadeAlways?: boolean): Promise<number>;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performBulkCreate<E>(dbEntity: DbEntity, entities: E[], createdEntityMap: {
        [entityId: string]: any;
    }[][], checkIfProcessed?: boolean, cascadeAlways?: boolean): Promise<number>;
    private internalCreate;
    private getGeneratedProperty;
    private columnProcessed;
    protected internalInsertColumnValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertColumnValues: RawInsertColumnValues<IQE>): Promise<number>;
    protected internalInsertValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE>): Promise<number>;
    protected internalInsertColumnValuesGenerateIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertColumnValues: RawInsertColumnValues<IQE>): Promise<number[] | string[]>;
    protected internalInsertValuesGetIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE>): Promise<number[] | string[]>;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performUpdate<E>(dbEntity: DbEntity, entity: E, updatedEntityMap: {
        [entityId: string]: any;
    }[][], originalValue?: E, cascadeAlways?: boolean): Promise<number>;
    private cascadeOnPersist;
    protected abstract getOriginalRecord(dbEntity: DbEntity, idKey: string): Promise<any>;
    protected abstract getOriginalValues(entitiesToUpdate: UpdateRecord[], dbEntity: DbEntity): Promise<MappedEntityArray<any>>;
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
    protected internalUpdateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(dbEntity: DbEntity, updateColumns: UpdateColumns<IEUC, IQE>): Promise<number>;
    protected internalUpdateWhere<E, IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(dbEntity: DbEntity, update: UpdateProperties<IEUP, IQE>): Promise<number>;
    /**
     * Transactional context must have been started by the time this method is called.
     * @param qEntity
     * @param entity
     */
    protected performDelete<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    private isProcessed;
    protected internalDeleteWhere<E, IQE extends IQEntity>(dbEntity: DbEntity, aDelete: Delete<IQE>): Promise<number>;
    private internalDelete;
}
