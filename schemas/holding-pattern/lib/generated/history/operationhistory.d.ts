import { IApplicationEntity } from '@airport/airspace';
import { IActor } from '../infrastructure/actor';
import { IRepositoryTransactionHistory } from './repositorytransactionhistory';
import { IRecordHistory } from './recordhistory';
export interface IOperationHistory {
    _localId: number;
    orderNumber?: number;
    changeType?: string;
    systemWideOperationId?: number;
    entity?: IApplicationEntity;
    actor?: IActor;
    repositoryTransactionHistory?: IRepositoryTransactionHistory;
    recordHistory?: IRecordHistory[];
}
//# sourceMappingURL=operationhistory.d.ts.map