import { IContext } from '@airport/di';
import { IStoreDriver, StoreType } from '@airport/ground-control';
import { ICredentials } from './Credentials';
export interface ITransactionManager {
    storeType: StoreType;
    transactionInProgress: string;
    initialize(dbName: string, context: IContext): Promise<void>;
    transact(credentials: ICredentials, callback: {
        (transaction: IStoreDriver): Promise<void>;
    }, context: IContext): Promise<void>;
}
//# sourceMappingURL=TransactionManager.d.ts.map