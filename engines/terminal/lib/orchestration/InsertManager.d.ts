import { IAirportDatabase } from '@airport/air-traffic-control';
import { ISequenceGenerator } from '@airport/check-in';
import { DbColumn, DbEntity, IRootTransaction, JsonInsertValues, PortableQuery } from '@airport/ground-control';
import { IActor, IOperationHistoryDuo, IRecordHistoryDuo, IRepositoryTransactionHistoryDuo } from '@airport/holding-pattern-runtime';
import { IHistoryManager, IInsertManager, IOperationContext, ITransaction, RecordId } from '@airport/terminal-map';
export declare class InsertManager implements IInsertManager {
    airportDatabase: IAirportDatabase;
    historyManager: IHistoryManager;
    operationHistoryDuo: IOperationHistoryDuo;
    recordHistoryDuo: IRecordHistoryDuo;
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    sequenceGenerator: ISequenceGenerator;
    insertValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context: IOperationContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context: IOperationContext): Promise<RecordId[][]>;
    verifyNoGeneratedColumns(dbEntity: DbEntity, jsonInsertValues: JsonInsertValues, errorPrefix: string): DbColumn[];
    private internalInsertValues;
    private validateValueRowLength;
    private ensureGeneratedValues;
    private ensureRepositoryEntityIdValues;
    /**
     *
     * All repository records must have ids when inserted.  Currently AP doesn't support
     * inserting from select and in the values provided id's must either be explicitly
     * specified or already provided. For all repository entities all ids must be
     * auto-generated.
     *
     * @param {DbEntity} dbEntity
     * @param {PortableQuery} portableQuery
     * @returns {Promise<void>}
     */
    private addInsertHistory;
}
//# sourceMappingURL=InsertManager.d.ts.map