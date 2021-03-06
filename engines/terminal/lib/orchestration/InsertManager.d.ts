import { IAirportDatabase } from '@airport/air-traffic-control';
import { DbColumn, DbEntity, IRootTransaction, JsonInsertValues, PortableQuery, ISequenceGenerator } from '@airport/ground-control';
import { IActor, IOperationHistoryDuo, IRecordHistoryDuo, IRepositoryTransactionHistoryDuo } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { IHistoryManager, IInsertManager, IOperationContext, ITransaction, Record_LocalId } from '@airport/terminal-map';
export declare class InsertManager implements IInsertManager {
    airportDatabase: IAirportDatabase;
    historyManager: IHistoryManager;
    operationHistoryDuo: IOperationHistoryDuo;
    recordHistoryDuo: IRecordHistoryDuo;
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    sequenceGenerator: ISequenceGenerator;
    insertValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context: IOperationContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetLocalIds(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context: IOperationContext): Promise<Record_LocalId[][]>;
    verifyNoGeneratedColumns(dbEntity: DbEntity, jsonInsertValues: JsonInsertValues, errorPrefix: string): DbColumn[];
    private internalInsertValues;
    private validateValueRowLength;
    private ensureGeneratedValues;
    private ensureAirEntityIdValues;
    /**
     *
     * All repository records must have _localIds when inserted.  Currently AP doesn't support
     * inserting from SELECT and in the values provided id's must either be explicitly
     * specified or already provided. For all repository entities all _localIds must be
     * auto-generated.
     *
     * @param {DbEntity} dbEntity
     * @param {PortableQuery} portableQuery
     * @returns {Promise<void>}
     */
    private addInsertHistory;
}
//# sourceMappingURL=InsertManager.d.ts.map