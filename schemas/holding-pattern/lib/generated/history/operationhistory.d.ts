import { IRepositoryTransactionHistory } from './repositorytransactionhistory';
import { ISchemaEntity } from '@airport/airspace';
import { IRecordHistory } from './recordhistory';
export interface IOperationHistory {
    id: number;
    orderNumber?: number;
    changeType?: string;
    systemWideOperationId?: number;
    repositoryTransactionHistory?: IRepositoryTransactionHistory;
    entity?: ISchemaEntity;
    recordHistory?: IRecordHistory[];
}
//# sourceMappingURL=operationhistory.d.ts.map