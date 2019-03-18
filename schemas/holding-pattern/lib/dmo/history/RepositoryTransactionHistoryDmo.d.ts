import { ChangeType, DbEntity } from '@airport/ground-control';
import { ActorId } from '../../ddl/ddl';
import { BaseRepositoryTransactionHistoryDmo, IActor, IOperationHistory, IRepository, IRepositoryTransactionHistory } from '../../generated/generated';
export interface IRepositoryTransactionHistoryDmo {
    getNewRecord(repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
    newRecord(data?: IRepositoryTransactionHistory): IRepositoryTransactionHistory;
    sortRepoTransHistories(repoTransHistories: IRepositoryTransactionHistory[], actorMapById: Map<ActorId, IActor>): void;
    startOperation(repositoryTransactionHistory: IRepositoryTransactionHistory, entityChangeType: ChangeType, dbEntity: DbEntity): IOperationHistory;
}
export declare class RepositoryTransactionHistoryDmo extends BaseRepositoryTransactionHistoryDmo implements IRepositoryTransactionHistoryDmo {
    private operHistoryDmo;
    constructor();
    getNewRecord(repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
    newRecord(data?: IRepositoryTransactionHistory): IRepositoryTransactionHistory;
    sortRepoTransHistories(repoTransHistories: IRepositoryTransactionHistory[], actorMapById: Map<ActorId, IActor>): void;
    startOperation(repositoryTransactionHistory: IRepositoryTransactionHistory, entityChangeType: ChangeType, dbEntity: DbEntity): IOperationHistory;
    private compareDates;
    private compareNumbers;
}
