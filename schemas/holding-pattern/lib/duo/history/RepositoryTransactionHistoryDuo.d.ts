import { ChangeType, DbEntity } from '@airport/ground-control';
import { ActorId } from '../../ddl/ddl';
import { BaseRepositoryTransactionHistoryDuo, IActor, IOperationHistory, IRepository, IRepositoryTransactionHistory } from '../../generated/generated';
import { IOperationHistoryDuo } from './OperationHistoryDuo';
export interface IRepositoryTransactionHistoryDuo {
    getNewRecord(repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
    newRecord(data?: IRepositoryTransactionHistory): IRepositoryTransactionHistory;
    sortRepoTransHistories(repoTransHistories: IRepositoryTransactionHistory[], actorMapById: Map<ActorId, IActor>): void;
    startOperation(repositoryTransactionHistory: IRepositoryTransactionHistory, entityChangeType: ChangeType, dbEntity: DbEntity, operHistoryDuo: IOperationHistoryDuo): IOperationHistory;
}
export declare class RepositoryTransactionHistoryDuo extends BaseRepositoryTransactionHistoryDuo implements IRepositoryTransactionHistoryDuo {
    getNewRecord(repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
    newRecord(data?: IRepositoryTransactionHistory): IRepositoryTransactionHistory;
    sortRepoTransHistories(repoTransHistories: IRepositoryTransactionHistory[], actorMapById: Map<ActorId, IActor>): void;
    startOperation(repositoryTransactionHistory: IRepositoryTransactionHistory, entityChangeType: ChangeType, dbEntity: DbEntity, operHistoryDuo: IOperationHistoryDuo): IOperationHistory;
    private compareDates;
    private compareNumbers;
}
