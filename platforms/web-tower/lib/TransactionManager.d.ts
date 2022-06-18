import { IContext } from "@airport/di";
import { StoreType } from "@airport/ground-control";
import { ICredentials, IStoreDriver, ITransaction, ITransactionContext, ITransactionManager } from "@airport/terminal-map";
export declare class TransactionManager implements ITransactionManager {
    storeType: StoreType;
    sourceOfTransactionInProgress: string;
    transactionInProgress: ITransaction;
    private currentTransactionId;
    initialize(dbName: string, context: IContext): Promise<void>;
    isServer(context?: IContext): boolean;
    transact(_: ICredentials, transactionalCallback: {
        (transaction: IStoreDriver, context: IContext): Promise<void> | void;
    }, context: ITransactionContext): Promise<void>;
    startTransaction(_: ICredentials, context: ITransactionContext): Promise<void>;
    rollback(_: ITransaction, context: IContext): Promise<void>;
    commit(_: ITransaction, context: IContext): Promise<void>;
}
//# sourceMappingURL=TransactionManager.d.ts.map