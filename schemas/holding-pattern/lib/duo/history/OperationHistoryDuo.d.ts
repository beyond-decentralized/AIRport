import { ChangeType, DbEntity } from '@airport/ground-control';
import { SystemWideOperationId } from '../../ddl/common';
import { Actor_Id, RepositoryEntity_ActorRecordId } from '../../ddl/ddl';
import { BaseOperationHistoryDuo, IBaseOperationHistoryDuo, IOperationHistory, IRecordHistory, IRepositoryTransactionHistory } from '../../generated/generated';
import { IRecordHistoryDuo } from './RecordHistoryDuo';
export interface IOperationHistoryDuo extends IBaseOperationHistoryDuo {
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorId: Actor_Id, actorRecordId: RepositoryEntity_ActorRecordId, recHistoryDuo: IRecordHistoryDuo): IRecordHistory;
}
export declare class OperationHistoryDuo extends BaseOperationHistoryDuo implements IOperationHistoryDuo {
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorId: Actor_Id, actorRecordId: RepositoryEntity_ActorRecordId, recHistoryDuo: IRecordHistoryDuo): IRecordHistory;
}
//# sourceMappingURL=OperationHistoryDuo.d.ts.map