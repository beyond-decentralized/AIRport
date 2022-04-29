import { IAirportDatabase, IApplicationUtils } from '@airport/air-control';
import { ISequenceGenerator } from '@airport/check-in';
import { IRootTransaction, PortableQuery } from '@airport/ground-control';
import { IActor, IOperationHistoryDuo, IRecordHistoryDuo, IRepositoryTransactionHistoryDuo } from '@airport/holding-pattern';
import { IDeleteManager, IHistoryManager, IOperationContext, ITransaction } from '@airport/terminal-map';
export declare class DeleteManager implements IDeleteManager {
    airportDatabase: IAirportDatabase;
    applicationUtils: IApplicationUtils;
    historyManager: IHistoryManager;
    operationHistoryDuo: IOperationHistoryDuo;
    recordHistoryDuo: IRecordHistoryDuo;
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    sequenceGenerator: ISequenceGenerator;
    deleteWhere(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context?: IOperationContext): Promise<number>;
    private recordRepositoryIds;
    private columnProcessed;
    private recordTreeToDelete;
    private getCascadeSubTree;
}
//# sourceMappingURL=DeleteManager.d.ts.map