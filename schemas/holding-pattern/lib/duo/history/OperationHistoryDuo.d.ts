import { ChangeType, DbEntity } from '@airport/ground-control';
import { IBaseOperationHistoryDuo } from '../../';
import { RepositoryEntityActorRecordId } from '../../ddl/ddl';
import { BaseOperationHistoryDuo, IOperationHistory, IRecordHistory, IRepositoryTransactionHistory } from '../../generated/generated';
export interface IOperationHistoryDuo extends IBaseOperationHistoryDuo {
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, repositoryTransactionHistory: IRepositoryTransactionHistory): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
}
export declare class OperationHistoryDuo extends BaseOperationHistoryDuo implements IOperationHistoryDuo {
    private recHistoryDuo;
    constructor();
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, repositoryTransactionHistory: IRepositoryTransactionHistory): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
}
