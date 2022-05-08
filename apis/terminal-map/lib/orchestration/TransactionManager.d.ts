import { IContext } from '@airport/direction-indicator';
import { IRootTransaction } from '@airport/ground-control';
import { ITransaction } from '../transaction/ITransaction';
import { ICredentials, ITransactionCredentials } from '../Credentials';
export interface IApiCallContext extends IContext {
    errorMessage?: string;
}
export interface ITransactionContext {
    doNotRecordHistory?: boolean;
    nestedTransactionDepth?: number;
    transaction?: ITransaction;
    rootTransaction?: IRootTransaction;
}
export interface ITransactionalCallback {
    (transaction: ITransaction, context?: IContext): Promise<void>;
}
export interface ITransactionManager {
    initialize(dbName: string, context: IContext): Promise<void>;
    isServer(contex?: IContext): boolean;
    transact(credentials: ICredentials, callback: ITransactionalCallback, context: IContext): Promise<void>;
    transactInternal(callback: ITransactionalCallback, context: IContext): Promise<void>;
    startTransaction(credentials: ICredentials, context: ITransactionContext): Promise<ITransaction>;
    rollback(credentials: ITransactionCredentials, context: IContext): Promise<void>;
    getTransactionFromContextOrCredentials(credentials: ITransactionCredentials, context: ITransactionContext): Promise<ITransaction>;
    commit(credentials: ITransactionCredentials, context: IContext): Promise<void>;
}
//# sourceMappingURL=TransactionManager.d.ts.map