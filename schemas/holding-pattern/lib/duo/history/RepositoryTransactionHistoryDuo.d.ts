import { ChangeType, DbEntity, IRootTransaction } from '@airport/ground-control';
import { Actor_LocalId, SystemWideOperationId } from '../../ddl/ddl';
import { IActor, IOperationHistory, IRepositoryTransactionHistory } from '../../generated/generated';
import { Repository_LocalId } from '../../types';
import { IOperationHistoryDuo } from './OperationHistoryDuo';
export interface IRepositoryTransactionHistoryDuo {
    getNewRecord(repositoryId: Repository_LocalId, isRepositoryCreation: boolean): IRepositoryTransactionHistory;
    newRecord(data?: IRepositoryTransactionHistory): IRepositoryTransactionHistory;
    sortRepoTransHistories(repoTransHistories: IRepositoryTransactionHistory[], actorMapById: Map<Actor_LocalId, IActor>): void;
    startOperation(repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId, entityChangeType: ChangeType, dbEntity: DbEntity, actor: IActor, rootTransaction: IRootTransaction): IOperationHistory;
}
export declare class RepositoryTransactionHistoryDuo implements IRepositoryTransactionHistoryDuo {
    operationHistoryDuo: IOperationHistoryDuo;
    getNewRecord(repositoryId: Repository_LocalId, isRepositoryCreation: boolean): IRepositoryTransactionHistory;
    newRecord(data?: IRepositoryTransactionHistory): IRepositoryTransactionHistory;
    sortRepoTransHistories(repoTransHistories: IRepositoryTransactionHistory[], actorMapById: Map<Actor_LocalId, IActor>): void;
    startOperation(repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId, entityChangeType: ChangeType, dbEntity: DbEntity, actor: IActor, rootTransaction: IRootTransaction): IOperationHistory;
    private compareDates;
    private compareNumbers;
}
//# sourceMappingURL=RepositoryTransactionHistoryDuo.d.ts.map