import { IContext } from '@airport/di';
import { IStoreDriver, StoreType } from '@airport/ground-control';
import { ITransaction } from '../transaction/ITransaction';
import { ICredentials } from '../Credentials';
export interface ITransactionContext {
    transaction: ITransaction;
}
export interface ITransactionManager {
    storeType: StoreType;
    transactionInProgress: string;
    initialize(dbName: string, context: IContext): Promise<void>;
    isServer(contex?: IContext): boolean;
    transact(credentials: ICredentials, callback: {
        (transaction: IStoreDriver, context?: IContext): Promise<void> | void;
    }, context: IContext): Promise<void>;
}
//# sourceMappingURL=TransactionManager.d.ts.map