import { IAirportDatabase } from '@airport/air-traffic-control';
import { IApplicationUtils, IFieldUtils, IQueryUtils, IRelationManager } from '@airport/tarmaq-query';
import { IRootTransaction, PortableQuery, ISequenceGenerator } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { IHistoryManager, IOperationContext, ITransaction, IUpdateManager } from '@airport/terminal-map';
import { IQueryFacade } from '@airport/tarmaq-dao';
import { IOperationHistoryDuo, IRecordHistoryDuo, IRepositoryTransactionHistoryDuo } from '@airport/holding-pattern/lib/duo/duo';
export declare class UpdateManager implements IUpdateManager {
    airportDatabase: IAirportDatabase;
    applicationUtils: IApplicationUtils;
    fieldUtils: IFieldUtils;
    historyManager: IHistoryManager;
    operationHistoryDuo: IOperationHistoryDuo;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    recordHistoryDuo: IRecordHistoryDuo;
    relationManager: IRelationManager;
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    sequenceGenerator: ISequenceGenerator;
    updateValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context: IOperationContext): Promise<number>;
    private addUpdateHistory;
    private addNewValueHistory;
    private groupRecordsByRepository;
}
//# sourceMappingURL=UpdateManager.d.ts.map