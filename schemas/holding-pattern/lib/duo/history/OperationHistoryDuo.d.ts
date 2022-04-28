import { ChangeType, DbEntity, IRootTransaction } from '@airport/ground-control';
import { SystemWideOperationId } from '../../ddl/common';
import { Actor_Id, RepositoryEntity_ActorRecordId } from '../../ddl/ddl';
import { BaseOperationHistoryDuo, IActor, IBaseOperationHistoryDuo, IOperationHistory, IRecordHistory, IRepositoryTransactionHistory } from '../../generated/generated';
import { IRecordHistoryDuo } from './RecordHistoryDuo';
export interface IOperationHistoryDuo extends IBaseOperationHistoryDuo {
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, actor: IActor, repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId, rootTransaction: IRootTransaction): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorId: Actor_Id, actorRecordId: RepositoryEntity_ActorRecordId): IRecordHistory;
}
export declare class OperationHistoryDuo extends BaseOperationHistoryDuo implements IOperationHistoryDuo {
    recordHistoryDuo: IRecordHistoryDuo;
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, actor: IActor, repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId, rootTransaction: IRootTransaction): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorId: Actor_Id, actorRecordId: RepositoryEntity_ActorRecordId): IRecordHistory;
}
//# sourceMappingURL=OperationHistoryDuo.d.ts.map