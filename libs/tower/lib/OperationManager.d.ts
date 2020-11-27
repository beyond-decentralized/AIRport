import { Delete, EntityIdData, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, IUpdateCache, RawInsertColumnValues, RawInsertValues, UpdateColumns, UpdateProperties } from '@airport/air-control';
import { DbColumn, DbEntity, DbProperty, DbRelation } from '@airport/ground-control';
import { ITransaction } from './ITransaction';
import { IOperationContext } from './OperationContext';
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
    protected performCreate<E, EntityCascadeGraph>(entity: E, operatedOnEntityIndicator: boolean[], transaction: ITransaction, ctx: IOperationContext<E, EntityCascadeGraph>, idData?: EntityIdData): Promise<number>;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performBulkCreate<E, EntityCascadeGraph>(entities: E[], operatedOnEntityIndicator: boolean[], transaction: ITransaction, ctx: IOperationContext<E, EntityCascadeGraph>, ensureGeneratedValues?: boolean): Promise<number>;
    protected internalInsertColumnValues<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE>, transaction: ITransaction, ctx: IOperationContext<any, any>): Promise<number>;
    protected internalInsertValues<E, EntityCascadeGraph, IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE>, transaction: ITransaction, ctx: IOperationContext<E, EntityCascadeGraph>, ensureGeneratedValues?: boolean): Promise<number>;
    protected internalInsertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE>, transaction: ITransaction, ctx: IOperationContext<any, any>): Promise<number[] | string[] | number[][] | string[][]>;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performUpdate<E, EntityCascadeGraph>(entity: E, operatedOnEntityIndicator: boolean[], transaction: ITransaction, ctx: IOperationContext<E, EntityCascadeGraph>, originalValue?: E): Promise<number>;
    protected internalInsertValuesGetIds<E, EntityCascadeGraph, IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE>, transaction: ITransaction, ctx: IOperationContext<E, EntityCascadeGraph>): Promise<number[] | string[] | number[][] | string[][]>;
    protected abstract getOriginalRecord<T>(dbEntity: DbEntity, entity: T, updateCache: IUpdateCache): Promise<any>;
    protected internalUpdateColumnsWhere<E, EntityCascadeGraph, IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(updateColumns: UpdateColumns<IEUC, IQE>, transaction: ITransaction, ctx: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    protected internalUpdateWhere<E, EntityCascadeGraph, IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(update: UpdateProperties<IEUP, IQE>, transaction: ITransaction, ctx: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    /**
     * Transactional context must have been started by the time this method is called.
     * @param qEntity
     * @param entity
     */
    protected performDelete<E, EntityCascadeGraph>(entity: E, transaction: ITransaction, ctx: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    protected internalDeleteWhere<E, EntityCascadeGraph, IQE extends IQEntity>(aDelete: Delete<IQE>, transaction: ITransaction, ctx: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    private internalCreate;
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
    private markAsProcessed;
    /**
     * TODO: the client should identify all entities (makes sense since it has an interlinked
     * graph before serialization) and they all should come in marked already.  Then its a
     * matter of checking those markings on the server.
     * @param entity
     * @param operatedOnEntityMap
     * @param dbEntity
     * @param schemaUtils
     * @private
     */
    private isProcessed;
    private internalDelete;
}
//# sourceMappingURL=OperationManager.d.ts.map