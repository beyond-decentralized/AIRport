import { IRepositoryTransactionHistory } from './repositorytransactionhistory';
import { ISchemaEntity } from '@airport/traffic-pattern';
import { IRecordHistory } from './recordhistory';
export interface IOperationHistory {
    id: number;
    repositoryTransactionHistory: IRepositoryTransactionHistory;
    orderNumber?: number;
    changeType?: string;
    systemWideOperationId?: number;
    entity?: ISchemaEntity;
    recordHistory?: IRecordHistory[];
}
//# sourceMappingURL=operationhistory.d.ts.map