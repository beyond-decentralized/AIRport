import { container, DI, IContext } from "@airport/di";
import { StoreType, TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import { ICredentials, IStoreDriver, ITransaction, ITransactionContext, ITransactionManager, TRANSACTION_MANAGER } from "@airport/terminal-map";
import { IIframeTransactionalConnector } from ".";
import { Transaction } from "./Transaction";

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
        if (this.currentTransactionId) {
            await transactionalCallback(new Transaction(this), context)
            return
        }
        await this.startTransaction(_, context)
        try {
            await transactionalCallback(new Transaction(this), context)
            await this.commit(null, context)
        } catch (e) {
            await this.rollback(null, context)
        }

    }

    /*
     * If exposed externally a stack of nested transactions will have to be kept in terminal window
     * to keep track if nested transactions are not closed
     */
    async startTransaction(
        _: ICredentials,
        context: ITransactionContext,
    ): Promise<void> {
        if (this.currentTransactionId) {
            throw new Error(`Cannot explictly start a nested transaction, please use the 'transactional' function`)
        }
        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR) as IIframeTransactionalConnector
        const transactionId = await transactionalConnector.startTransaction(context)
        if (!transactionId) {
            throw new Error(`Could not start transaction, check AIRport terminal tab/app logs.`)
        }

        this.currentTransactionId = transactionId as any
    }

    /*
     * If exposed externally a stack of nested transactions will have to be kept in terminal window
     * to keep track if nested transactions are not closed
     */
    async rollback(
        _: ITransaction,
        context: IContext,
    ): Promise<void> {
        if (!this.currentTransactionId) {
            throw new Error(`Cannot rollback, no transaction in progress`)
        }
        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR) as IIframeTransactionalConnector
        try {
            const success = await transactionalConnector.rollback({
                ...context,
                transactionId: this.currentTransactionId
            })
            if (!success) {
                throw new Error(`Could not rollback transaction, check AIRport terminal tab/app logs.`)
            }
        } catch (e) {
            console.error(e)
            throw e
        } finally {
            this.currentTransactionId = null
        }
    }

    /*
     * If exposed externally a stack of nested transactions will have to be kept in terminal window
     * to keep track if nested transactions are not closed
     */
    async commit(
        _: ITransaction,
        context: IContext,
    ): Promise<void> {
        if (!this.currentTransactionId) {
            throw new Error(`Cannot commit, no transaction in progress`)
        }
        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR) as IIframeTransactionalConnector
        try {
            const success = await transactionalConnector.commit({
                ...context,
                transactionId: this.currentTransactionId
            })
            if (!success) {
                throw new Error(`Could not commit˜ transaction, check AIRport terminal tab/app logs.`)
            }
        } catch (e) {
            console.error(e)
            throw e
        } finally {
            this.currentTransactionId = null
        }
    }

}
DI.set(TRANSACTION_MANAGER, TransactionManager);
