import { ISchemaEntity } from '@airport/airspace';
import { IRepositoryTransactionHistory } from './repositorytransactionhistory';
import { IRecordHistory } from './recordhistory';
export interface IOperationHistory {
    id: number;
    orderNumber?: number;
    changeType?: string;
    systemWideOperationId?: number;
    entity?: ISchemaEntity;
    repositoryTransactionHistory?: IRepositoryTransactionHistory;
    recordHistory?: IRecordHistory[];
}
//# sourceMappingURL=operationhistory.d.ts.map