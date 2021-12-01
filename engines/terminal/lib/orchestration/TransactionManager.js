import { container, DI } from '@airport/di';
import { ACTIVE_QUERIES, ID_GENERATOR } from '@airport/fuel-hydrant-system';
import { STORE_DRIVER } from '@airport/ground-control';
import { Q, TRANSACTION_HISTORY_DUO, } from '@airport/holding-pattern';
import { TRANSACTION_MANAGER } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export class TransactionManager extends AbstractMutationManager {
    constructor() {
        super(...arguments);
        this.transactionIndexQueue = [];
        this.signatureOfTransactionInProgress = null;
        this.transactionInProgress = null;
        this.yieldToRunningTransaction = 200;
    }
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    async initialize(dbName, context) {
        const storeDriver = await container(this)
            .get(STORE_DRIVER);
        return await storeDriver.initialize(dbName, context);
        // await this.dataStore.initialize(dbName)
        // await this.repositoryManager.initialize();
    }
    isServer(context) {
        return container(this).getSync(STORE_DRIVER).isServer(context);
    }
    async transact(credentials, transactionalCallback, context) {
        if (context.transaction) {
            await transactionalCallback(context.transaction, context);
            return;
        }
        const [storeDriver, transHistoryDuo] = await container(this)
            .get(STORE_DRIVER, TRANSACTION_HISTORY_DUO);
        const isServer = storeDriver.isServer(context);
        if (!isServer) {
            if (credentials.applicationSignature === this.signatureOfTransactionInProgress) {
                await transactionalCallback(this.transactionInProgress, context);
                return;
            }
            else if (this.transactionIndexQueue.filter(transIndex => transIndex === credentials.applicationSignature).length) {
                // Either just continue using the current transaction
                // or return (domain shouldn't be initiating multiple transactions
                // at the same time
                throw new Error(`'${credentials.applicationSignature}' initialized multiple transactions
				at the same time. Only one concurrent transaction is allowed per application.`);
                // return;
            }
            this.transactionIndexQueue.push(credentials.applicationSignature);
        }
        while (!this.canRunTransaction(credentials.applicationSignature, storeDriver, context)) {
            await this.wait(this.yieldToRunningTransaction);
        }
        if (!isServer) {
            this.transactionIndexQueue = this.transactionIndexQueue.filter(transIndex => transIndex !== credentials.applicationSignature);
            this.signatureOfTransactionInProgress = credentials.applicationSignature;
        }
        await storeDriver.transact(async (transaction) => {
            this.transactionInProgress = transaction;
            context.transaction = transaction;
            transaction.transHistory = transHistoryDuo.getNewRecord();
            transaction.credentials = credentials;
            try {
                await transactionalCallback(transaction, context);
                await this.commit(transaction, context);
            }
            catch (e) {
                console.error(e);
                await this.rollback(transaction, context);
            }
            finally {
                context.transaction = null;
            }
        }, context);
    }
    async rollback(transaction, context) {
        const storeDriver = await container(this)
            .get(STORE_DRIVER);
        if (!storeDriver.isServer(context) && this.signatureOfTransactionInProgress !== transaction.credentials.applicationSignature) {
            let foundTransactionInQueue = false;
            this.transactionIndexQueue.filter(transIndex => {
                if (transIndex === transaction.credentials.applicationSignature) {
                    foundTransactionInQueue = true;
                    return false;
                }
                return true;
            });
            if (!foundTransactionInQueue) {
                throw new Error(`Could not find transaction '${transaction.credentials.applicationSignature}' is not found`);
            }
            return;
        }
        try {
            await transaction.rollback();
        }
        finally {
            this.clearTransaction();
        }
    }
    async commit(transaction, context) {
        const [activeQueries, idGenerator, storeDriver] = await container(this)
            .get(ACTIVE_QUERIES, ID_GENERATOR, STORE_DRIVER);
        if (!storeDriver.isServer(context)
            && this.signatureOfTransactionInProgress !== transaction.credentials.applicationSignature) {
            throw new Error(`Cannot commit inactive transaction '${transaction.credentials.applicationSignature}'.`);
        }
        try {
            await this.saveRepositoryHistory(transaction, idGenerator, context);
            // TODO: what else needs to be saved (if anything)?
            await transaction.saveTransaction(transaction.transHistory);
            activeQueries.rerunQueries();
            await transaction.commit();
        }
        finally {
            this.clearTransaction();
        }
    }
    // @Transactional()
    // private async recordRepositoryTransactionBlock(
    // 	transaction: IRepositoryTransactionHistory
    // ): Promise<void> {
    // 	if (this.onlineManager.isOnline()) {
    // 		// let repository = transaction.repository;
    // 		transaction.serialize();
    //
    // 		let deltaStore = this.repositoryManager.getDeltaStore(transaction.repository);
    // 		await deltaStore.addChanges(deltaStore.config.changeListConfig, [transaction]);
    //
    // 		transaction.deserialize(
    // 			// repository
    // 		);
    // 		await this.offlineDeltaStore.markChangesAsSynced(transaction.repository,
    // [transaction]);
    // this.queries.markQueriesToRerun(transaction.transactionHistory.applicationMap); } }
    clearTransaction() {
        this.signatureOfTransactionInProgress = null;
        this.transactionInProgress = null;
        if (this.transactionIndexQueue.length) {
            this.signatureOfTransactionInProgress = this.transactionIndexQueue.shift();
        }
    }
    async saveRepositoryHistory(transaction, idGenerator, context) {
        let transactionHistory = transaction.transHistory;
        if (!transactionHistory.allRecordHistory.length) {
            return false;
        }
        let applicationMap = transactionHistory.applicationMap;
        const transHistoryIds = await idGenerator.generateTransactionHistoryIds(transactionHistory.repositoryTransactionHistories.length, transactionHistory.allOperationHistory.length, transactionHistory.allRecordHistory.length);
        applicationMap.ensureEntity(Q.TransactionHistory.__driver__.dbEntity, true);
        transactionHistory.id = transHistoryIds.transactionHistoryId;
        await this.doInsertValues(transaction, Q.TransactionHistory, [transactionHistory], context);
        applicationMap.ensureEntity(Q.RepositoryTransactionHistory.__driver__.dbEntity, true);
        transactionHistory.repositoryTransactionHistories.forEach((repositoryTransactionHistory, index) => {
            repositoryTransactionHistory.id = transHistoryIds.repositoryHistoryIds[index];
        });
        await this.doInsertValues(transaction, Q.RepositoryTransactionHistory, transactionHistory.repositoryTransactionHistories, context);
        applicationMap.ensureEntity(Q.OperationHistory.__driver__.dbEntity, true);
        transactionHistory.allOperationHistory.forEach((operationHistory, index) => {
            operationHistory.id = transHistoryIds.operationHistoryIds[index];
        });
        await this.doInsertValues(transaction, Q.OperationHistory, transactionHistory.allOperationHistory, context);
        applicationMap.ensureEntity(Q.RecordHistory.__driver__.dbEntity, true);
        transactionHistory.allRecordHistory.forEach((recordHistory, index) => {
            recordHistory.id = transHistoryIds.recordHistoryIds[index];
        });
        await this.doInsertValues(transaction, Q.RecordHistory, transactionHistory.allRecordHistory, context);
        if (transactionHistory.allRecordHistoryNewValues.length) {
            applicationMap.ensureEntity(Q.RecordHistoryNewValue.__driver__.dbEntity, true);
            await this.doInsertValues(transaction, Q.RecordHistoryNewValue, transactionHistory.allRecordHistoryNewValues, context);
        }
        if (transactionHistory.allRecordHistoryOldValues.length) {
            applicationMap.ensureEntity(Q.RecordHistoryOldValue.__driver__.dbEntity, true);
            await this.doInsertValues(transaction, Q.RecordHistoryOldValue, transactionHistory.allRecordHistoryOldValues, context);
        }
        return true;
    }
    async wait(timeoutMillis) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve();
                }, timeoutMillis);
            }
            catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
    canRunTransaction(domainAndPort, storeDriver, context) {
        if (storeDriver.isServer(context)) {
            return true;
        }
        if (this.signatureOfTransactionInProgress) {
            return false;
        }
        return this.transactionIndexQueue[this.transactionIndexQueue.length - 1]
            === domainAndPort;
    }
}
DI.set(TRANSACTION_MANAGER, TransactionManager);
//# sourceMappingURL=TransactionManager.js.map