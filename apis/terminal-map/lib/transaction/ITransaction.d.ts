import { ITransactionHistory } from '@airport/holding-pattern';
import { IStoreDriver } from '../core/data/StoreDriver';
import { ICredentials } from '../Credentials';
export interface ITransaction extends IStoreDriver {
    credentials: ICredentials;
    isSync: boolean;
    transHistory: ITransactionHistory;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    saveTransaction(transaction: ITransactionHistory): Promise<void>;
}
//# sourceMappingURL=ITransaction.d.ts.map