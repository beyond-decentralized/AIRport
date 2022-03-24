import { container, DI } from '@airport/di';
import { ACTIVE_QUERIES, ID_GENERATOR } from '@airport/fuel-hydrant-system';
import { getFullApplicationNameFromDomainAndName } from '@airport/ground-control';
import { SYNCHRONIZATION_OUT_MANAGER } from '@airport/ground-transport';
import { Q, TRANSACTION_HISTORY_DUO, } from '@airport/holding-pattern';
import { STORE_DRIVER, TRANSACTION_MANAGER } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export class TransactionManager extends AbstractMutationManager {
    constructor() {
        super(...arguments);
        this.transactionIndexQueue = [];
        this.sourceOfTransactionInProgress = null;
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
        const storeDriver = await container(this).get(STORE_DRIVER);
        await this.startTransactionPrep(credentials, context, transactionalCallback);
        await storeDriver.transact(async (transaction) => {
            await this.setupTransaction(credentials, transaction, context);
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
    async startTransaction(credentials, context) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        await this.startTransactionPrep(credentials, context);
        const transaction = await storeDriver.startTransaction();
        await this.setupTransaction(credentials, transaction, context);
    }
    async rollback(transaction, context) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        const fullApplicationName = getFullApplicationNameFromDomainAndName(transaction.credentials.domain, transaction.credentials.application);
        if (!storeDriver.isServer(context) && this.sourceOfTransactionInProgress
            !== fullApplicationName) {
            let foundTransactionInQueue = false;
            this.transactionIndexQueue.filter(transIndex => {
                if (transIndex === fullApplicationName) {
                    foundTransactionInQueue = true;
                    return false;
                }
                return true;
            });
            if (!foundTransactionInQueue) {
                throw new Error(`Could not find transaction '${fullApplicationName}' is not found`);
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
        const fullApplicationName = getFullApplicationNameFromDomainAndName(transaction.credentials.domain, transaction.credentials.application);
        if (!storeDriver.isServer(context)
            && this.sourceOfTransactionInProgress !== fullApplicationName) {
            throw new Error(`Cannot commit inactive transaction '${fullApplicationName}'.`);
        }
        try {
            await this.saveRepositoryHistory(transaction, idGenerator, context);
            await transaction.saveTransaction(transaction.transHistory);
            activeQueries.rerunQueries();
            await transaction.commit();
        }
        finally {
            this.clearTransaction();
        }
        let transactionHistory = transaction.transHistory;
        if (!transactionHistory.allRecordHistory.length) {
            return;
        }
        const synchronizationOutManager = await container(this)
            .get(SYNCHRONIZATION_OUT_MANAGER);
        await synchronizationOutManager.synchronizeOut(transactionHistory.repositoryTransactionHistories);
    }
    async startTransactionPrep(credentials, context, transactionalCallback) {
        if (context.transaction) {
            return;
        }
        const storeDriver = await container(this).get(STORE_DRIVER);
        const isServer = storeDriver.isServer(context);
        const fullApplicationName = getFullApplicationNameFromDomainAndName(credentials.domain, credentials.application);
        if (!isServer) {
            if (fullApplicationName === this.sourceOfTransactionInProgress) {
                if (transactionalCallback) {
                    await transactionalCallback(this.transactionInProgress, context);
                }
                return;
            }
            else if (this.transactionIndexQueue.filter(transIndex => transIndex === fullApplicationName).length) {
                // Either just continue using the current transaction
                // or return (domain shouldn't be initiating multiple transactions
                // at the same time
                throw new Error(`
	Domain:
		${credentials.domain}
	Application:
		${credentials.application}
initialized multiple transactions at the same time.
Only one concurrent transaction is allowed per application.`);
                // return;
            }
            this.transactionIndexQueue.push(fullApplicationName);
        }
        while (!this.canRunTransaction(fullApplicationName, storeDriver, context)) {
            await this.wait(this.yieldToRunningTransaction);
        }
        if (!isServer) {
            this.transactionIndexQueue = this.transactionIndexQueue.filter(transIndex => transIndex !== fullApplicationName);
            this.sourceOfTransactionInProgress = fullApplicationName;
        }
    }
    async setupTransaction(credentials, transaction, context) {
        const transHistoryDuo = await container(this)
            .get(TRANSACTION_HISTORY_DUO);
        this.transactionInProgress = transaction;
        context.transaction = transaction;
        transaction.transHistory = transHistoryDuo.getNewRecord();
        transaction.credentials = credentials;
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
        this.sourceOfTransactionInProgress = null;
        this.transactionInProgress = null;
        if (this.transactionIndexQueue.length) {
            this.sourceOfTransactionInProgress = this.transactionIndexQueue.shift();
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
            repositoryTransactionHistory.transactionHistory = transactionHistory;
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
        if (this.sourceOfTransactionInProgress) {
            return false;
        }
        return this.transactionIndexQueue[this.transactionIndexQueue.length - 1]
            === domainAndPort;
    }
}
DI.set(TRANSACTION_MANAGER, TransactionManager);
//# sourceMappingURL=TransactionManager.js.map