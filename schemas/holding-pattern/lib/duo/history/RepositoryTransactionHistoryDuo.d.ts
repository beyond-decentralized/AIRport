import { ChangeType, DbEntity } from '@airport/ground-control';
import { Actor_Id, Repository_Id, SystemWideOperationId } from '../../ddl/ddl';
import { BaseRepositoryTransactionHistoryDuo, IActor, IOperationHistory, IRepositoryTransactionHistory } from '../../generated/generated';
import { IOperationHistoryDuo } from './OperationHistoryDuo';
export interface IRepositoryTransactionHistoryDuo {
    getNewRecord(repositoryId: Repository_Id, actor: IActor): IRepositoryTransactionHistory;
    newRecord(data?: IRepositoryTransactionHistory): IRepositoryTransactionHistory;
    sortRepoTransHistories(repoTransHistories: IRepositoryTransactionHistory[], actorMapById: Map<Actor_Id, IActor>): void;
    startOperation(repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId, entityChangeType: ChangeType, dbEntity: DbEntity, operHistoryDuo: IOperationHistoryDuo): IOperationHistory;
}
export declare class RepositoryTransactionHistoryDuo extends BaseRepositoryTransactionHistoryDuo implements IRepositoryTransactionHistoryDuo {
    getNewRecord(repositoryId: Repository_Id, actor: IActor): IRepositoryTransactionHistory;
    newRecord(data?: IRepositoryTransactionHistory): IRepositoryTransactionHistory;
    sortRepoTransHistories(repoTransHistories: IRepositoryTransactionHistory[], actorMapById: Map<Actor_Id, IActor>): void;
    startOperation(repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId, entityChangeType: ChangeType, dbEntity: DbEntity, operHistoryDuo: IOperationHistoryDuo): IOperationHistory;
    private compareDates;
    private compareNumbers;
}
//# sourceMappingURL=RepositoryTransactionHistoryDuo.d.ts.map