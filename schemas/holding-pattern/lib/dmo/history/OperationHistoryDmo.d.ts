import { ChangeType, DbEntity } from '@airport/ground-control';
import { IBaseOperationHistoryDmo } from '../../';
import { RepositoryEntityActorRecordId } from '../../ddl/ddl';
import { BaseOperationHistoryDmo, IOperationHistory, IRecordHistory, IRepositoryTransactionHistory } from '../../generated/generated';
import { IRecordHistoryDmo } from './RecordHistoryDmo';
export interface IOperationHistoryDmo extends IBaseOperationHistoryDmo {
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, repositoryTransactionHistory: IRepositoryTransactionHistory): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
}
export declare class OperationHistoryDmo extends BaseOperationHistoryDmo implements IOperationHistoryDmo {
    private recordHistoryDmo;
    constructor(recordHistoryDmo: IRecordHistoryDmo);
    getNewRecord(entityChangeType: ChangeType, dbEntity: DbEntity, repositoryTransactionHistory: IRepositoryTransactionHistory): IOperationHistory;
    sort(ew1: IOperationHistory, ew2: IOperationHistory): number;
    startRecordHistory(operationHistory: IOperationHistory, actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
}
