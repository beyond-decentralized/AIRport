import { IStoreDriver, StoreType } from '@airport/ground-control';
import { ICredentials } from './Credentials';
export interface ITransactionManager {
    storeType: StoreType;
    transactionInProgress: string;
    init(dbName: string): Promise<void>;
    transact(credentials: ICredentials, callback: {
        (transaction: IStoreDriver): Promise<void>;
    }): Promise<void>;
}
//# sourceMappingURL=TransactionManager.d.ts.map