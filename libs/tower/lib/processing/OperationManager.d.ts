import { Delete, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, IUpdateCache, RawInsertColumnValues, RawInsertValues, UpdateColumns, UpdateProperties } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
import { ITransaction } from '../ITransaction';
import { IOperationContext } from './OperationContext';
/**
 * Created by Papa on 11/15/2016.
 */
export interface IOperationManager {
}
export declare abstract class OperationManager implements IOperationManager {
    protected abstract getOriginalRecord<T>(dbEntity: DbEntity, entity: T, updateCache: IUpdateCache): Promise<any>;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    protected performSave<E, EntityCascadeGraph>(entities: E | E[], transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    protected internalCreate<E, EntityCascadeGraph>(entities: E[], transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>, ensureGeneratedValues?: boolean): Promise<number>;
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    protected internalUpdate<E, EntityCascadeGraph>(entity: E, originalEntity: E, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    protected internalDelete<E, EntityCascadeGraph>(entity: E, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    protected internalInsertColumnValues<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE>, transaction: ITransaction, context: IOperationContext<any, any>): Promise<number>;
    protected internalInsertValues<E, EntityCascadeGraph, IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE>, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>, ensureGeneratedValues?: boolean): Promise<number>;
    protected internalInsertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE>, transaction: ITransaction, context: IOperationContext<any, any>): Promise<number[] | string[] | number[][] | string[][]>;
    protected internalInsertValuesGetIds<E, EntityCascadeGraph, IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE>, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<number[] | string[] | number[][] | string[][]>;
    protected internalUpdateColumnsWhere<E, EntityCascadeGraph, IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(updateColumns: UpdateColumns<IEUC, IQE>, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    protected internalUpdateWhere<E, EntityCascadeGraph, IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(update: UpdateProperties<IEUP, IQE>, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    protected internalDeleteWhere<E, EntityCascadeGraph, IQE extends IQEntity>(aDelete: Delete<IQE>, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
}
//# sourceMappingURL=OperationManager.d.ts.map