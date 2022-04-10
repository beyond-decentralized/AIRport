import { IContext } from '@airport/di';
import { StoreType } from '@airport/ground-control';
import { ITransaction } from '../transaction/ITransaction';
import { ICredentials } from '../Credentials';
import { IStoreDriver } from '../core/data/StoreDriver';
export interface IApiCallContext extends IContext {
    errorMessage?: string;
}
export interface ITransactionContext {
    transaction?: ITransaction;
}
export interface ITransactionManager {
    storeType: StoreType;
    transactionInProgress: ITransaction;
    initialize(dbName: string, context: IContext): Promise<void>;
    isServer(contex?: IContext): boolean;
    transact(credentials: ICredentials, callback: {
        (transaction: IStoreDriver, context?: IContext): Promise<void> | void;
    }, context: IContext): Promise<void>;
    startTransaction(credentials: ICredentials, context: ITransactionContext): Promise<ITransaction>;
    rollback(transaction: ITransaction, context: IContext): Promise<void>;
    commit(transaction: ITransaction, context: IContext): Promise<void>;
}
//# sourceMappingURL=TransactionManager.d.ts.map