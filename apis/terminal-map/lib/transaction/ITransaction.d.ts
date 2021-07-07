import { IStoreDriver } from '@airport/ground-control';
import { ITransactionHistory } from '@airport/holding-pattern';
import { ICredentials } from '../Credentials';
export interface ITransaction extends IStoreDriver {
    credentials: ICredentials;
    transHistory: ITransactionHistory;
    saveTransaction(transaction: ITransactionHistory): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
//# sourceMappingURL=ITransaction.d.ts.map