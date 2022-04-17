import { IContext } from '@airport/di';
import { IRootTransaction } from '@airport/ground-control';
import { ITransaction } from '../transaction/ITransaction';
import { ICredentials, ITransactionCredentials } from '../Credentials';
import { IStoreDriver } from '../core/data/StoreDriver';
export interface IApiCallContext extends IContext {
    errorMessage?: string;
}
export interface ITransactionContext {
    transaction?: ITransaction;
    rootTransaction?: IRootTransaction;
}
export interface ITransactionManager {
    initialize(dbName: string, context: IContext): Promise<void>;
    isServer(contex?: IContext): boolean;
    transact(credentials: ICredentials, callback: {
        (transaction: IStoreDriver, context?: IContext): Promise<void> | void;
    }, context: IContext): Promise<void>;
    startTransaction(credentials: ICredentials, context: ITransactionContext): Promise<ITransaction>;
    rollback(credentials: ITransactionCredentials, context: IContext): Promise<void>;
    getTransactionFromContextOrCredentials(credentials: ITransactionCredentials, context: ITransactionContext): Promise<ITransaction>;
    commit(credentials: ITransactionCredentials, context: IContext): Promise<void>;
}
//# sourceMappingURL=TransactionManager.d.ts.map