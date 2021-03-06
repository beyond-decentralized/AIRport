import { IAirportDatabase, IUtils } from '@airport/air-traffic-control';
import { IRootTransaction, PortableQuery, ISequenceGenerator } from '@airport/ground-control';
import { IActor, IOperationHistoryDuo, IRecordHistoryDuo, IRepositoryTransactionHistoryDuo } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { IApplicationUtils } from '@airport/tarmaq-query';
import { IDeleteManager, IHistoryManager, IOperationContext, ITransaction } from '@airport/terminal-map';
export declare class DeleteManager implements IDeleteManager {
    airportDatabase: IAirportDatabase;
    applicationUtils: IApplicationUtils;
    historyManager: IHistoryManager;
    operationHistoryDuo: IOperationHistoryDuo;
    recordHistoryDuo: IRecordHistoryDuo;
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    sequenceGenerator: ISequenceGenerator;
    utils: IUtils;
    deleteWhere(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context?: IOperationContext): Promise<number>;
    private recordRepositoryIds;
    private columnProcessed;
    private recordTreeToDelete;
    private getCascadeSubTree;
}
//# sourceMappingURL=DeleteManager.d.ts.map