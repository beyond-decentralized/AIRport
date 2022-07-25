import { ChangeType, DbEntity, IRootTransaction } from '@airport/ground-control';
import { SystemWideOperationId } from '../../ddl/common';
import { Actor_LocalId, AirEntity_ActorRecordId } from '../../ddl/ddl';
import { IActor, IOperationHistory, IRecordHistory, IRepositoryTransactionHistory } from '../../generated/generated';
import { IRecordHistoryDuo } from './RecordHistoryDuo';
export interface IOperationHistoryDuo {
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, actor: IActor, repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId, rootTransaction: IRootTransaction): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorId: Actor_LocalId, _actorRecordId: AirEntity_ActorRecordId): IRecordHistory;
}
export declare class OperationHistoryDuo implements IOperationHistoryDuo {
    recordHistoryDuo: IRecordHistoryDuo;
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, actor: IActor, repositoryTransactionHistory: IRepositoryTransactionHistory, systemWideOperationId: SystemWideOperationId, rootTransaction: IRootTransaction): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorId: Actor_LocalId, _actorRecordId: AirEntity_ActorRecordId): IRecordHistory;
}
//# sourceMappingURL=OperationHistoryDuo.d.ts.map