import { container, DI, IContext } from "@airport/di";
import { StoreType, TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import { ICredentials, IStoreDriver, ITransaction, ITransactionContext, ITransactionManager, TRANSACTION_MANAGER } from "@airport/terminal-map";
import { IIframeTransactionalConnector } from "./src";

export class TransactionManager
    implements ITransactionManager {

    storeType: StoreType;

    sourceOfTransactionInProgress: string
    transactionInProgress: ITransaction

    private currentTransactionId: string

    async initialize(
        dbName: string,
        context: IContext,
    ): Promise<void> {
    }

    isServer(
        context?: IContext
    ) {
        return false;
    }

    async transact(
        _: ICredentials,
        transactionalCallback: {
            (
                transaction: IStoreDriver,
                context: IContext
            ): Promise<void> | void
        },
        context: ITransactionContext,
    ): Promise<void> {
        if (this.transactionInProgress) {
            await transactionalCallback(context.transaction, context)
            return
        }

        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR) as IIframeTransactionalConnector

        try {
            await this.startTransaction(_, context)
        } catch (e) {

        }
        try {
            await transactionalCallback(null, context)
            await transactionalConnector.commit()
        } catch {
            await transactionalConnector.rollback()
        } finally {
            this.transactionInProgress = null
        }

    }

    async startTransaction(
        _: ICredentials,
        context: ITransactionContext,
    ): Promise<void> {
        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR) as IIframeTransactionalConnector
        const transactionId = await transactionalConnector.startTransaction(context)
        if (!transactionId) {
            throw new Error(`Could not start transaction, check AIRport terminal tab/app logs.`)
        }

        this.currentTransactionId = transactionId
    }

    async rollback(
        transaction: ITransaction,
        context: IContext,
    ): Promise<void> {
    }

    async commit(
        transaction: ITransaction,
        context: IContext,
    ): Promise<void> {

    }

}
DI.set(TRANSACTION_MANAGER, TransactionManager);
