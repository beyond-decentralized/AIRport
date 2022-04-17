import { container, DI } from '@airport/di';
import { ACTIVE_QUERIES, ID_GENERATOR, } from '@airport/fuel-hydrant-system';
import { INTERNAL_DOMAIN } from '@airport/ground-control';
import { SYNCHRONIZATION_OUT_MANAGER } from '@airport/ground-transport';
import { Q, TRANSACTION_HISTORY_DUO, } from '@airport/holding-pattern';
import { STORE_DRIVER, TERMINAL_STORE, TRANSACTION_MANAGER } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export class TransactionManager extends AbstractMutationManager {
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    async initialize(dbName, context) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        return await storeDriver.initialize(dbName, context);
        // await this.dataStore.initialize(dbName)
        // await this.repositoryManager.initialize();
    }
    getInProgressTransactionById(transactionId) {
        const terminalStore = container(this).getSync(TERMINAL_STORE);
        return terminalStore.getTransactionManager().transactionInProgressMap.get(transactionId);
    }
    isServer(context) {
        return container(this).getSync(STORE_DRIVER).isServer(context);
    }
    async transact(credentials, transactionalCallback, context) {
        if (context.transaction) {
            // Nested transactal() calls in internal operations
            // do not create nested transactions 
            await transactionalCallback(context.transaction, context);
            return;
        }
        const transaction = await this.startTransaction(credentials, context);
        try {
            await transactionalCallback(transaction, context);
            await this.commit(credentials, context);
        }
        catch (e) {
            await this.rollback(credentials, context);
            throw e;
        }
    }
    async startTransaction(credentials, context) {
        const terminalStore = await container(this).get(TERMINAL_STORE);
        const transactionManagerStore = terminalStore.getTransactionManager();
        let parentTransaction;
        if (credentials.transactionId) {
            parentTransaction = transactionManagerStore
                .transactionInProgressMap.get(credentials.transactionId);
            if (!parentTransaction) {
                throw new Error(`
Recieved a startTransaction call (@Api call) with parent transaction id:
	${credentials.transactionId}
But, there is no such transaction in progress.`);
            }
            if (parentTransaction.id !==
                credentials.transactionId) {
                throw new Error(`
In-progress transaction id does not match the passed in transaction id:
${credentials.transactionId}`);
            }
            this.checkForCircularDependencies(parentTransaction, credentials);
        }
        else {
            /*
             * NOTE: Current policy is to NOT limit the number of transactions
             * a domain can initiate.  In the future, specifically for the
             * client-side Turbase, it may make sence to limit the number
             * of transactions to 1 per tab.  This can be accomplished by
             * generating a unique id on the nested client iframe of an
             * application.
             */
            /*
throw new Error(`
    Domain:
        ${credentials.domain}
    Application:
        ${credentials.application}
initialized multiple transactions at the same time.
Only one concurrent transaction is allowed per application.`)
            */
            if (!this.isServer(context)
                && transactionManagerStore.transactionInProgressMap.size > 0) {
                // Delay the start of the transaction
                return new Promise((resolve, reject) => {
                    // Add the transaction to the queue of pending transactions
                    transactionManagerStore.pendingTransactionQueue.unshift({
                        credentials,
                        reject,
                        resolve
                    });
                });
            }
        }
        const transaction = await this.internalStartTransaction(credentials, parentTransaction, context);
        if (!parentTransaction) {
            transaction.numberOfOperations = 0;
        }
        return transaction;
    }
    async internalStartTransaction(credentials, parentTransaction, context) {
        const [storeDriver, terminalStore] = await container(this)
            .get(STORE_DRIVER, TERMINAL_STORE);
        const transactionManagerStore = terminalStore.getTransactionManager();
        const transaction = await storeDriver.setupTransaction(context, parentTransaction);
        await storeDriver.startTransaction(transaction, context);
        transaction.credentials = credentials;
        await this.setupTransaction(credentials, transaction, parentTransaction, transactionManagerStore, context);
        return transaction;
    }
    async rollback(credentials, context) {
        const transaction = await this.getTransactionFromContextOrCredentials(credentials, context);
        let parentTransaction = transaction.parentTransaction;
        await transaction.rollback(null, context);
        await this.clearTransaction(transaction, parentTransaction, credentials, context);
        await this.resumeParentOrPendingTransaction(parentTransaction, context);
    }
    async getTransactionFromContextOrCredentials(credentials, context) {
        let transaction = context.transaction;
        if (!transaction) {
            if (!credentials.transactionId) {
                throw new Error(`
No Transaction Id is passed in Credentials for a Rollback operation.
				`);
            }
            const terminalStore = await container(this).get(TERMINAL_STORE);
            const transactionManagerStore = terminalStore.getTransactionManager();
            transaction = transactionManagerStore.transactionInProgressMap.get(credentials.transactionId);
            if (!transaction) {
                throw new Error(`
Could not find Transaction: ${credentials.transactionId} in Transactons in-progress.
NOTE: nested/child transactions must be commited or rolled back before their
parent transactions.
				`);
            }
            context.transaction = transaction;
        }
        let ancestorTransaction = transaction;
        while (ancestorTransaction = ancestorTransaction.parentTransaction)
            ;
        context.rootTransaction = ancestorTransaction;
        return transaction;
    }
    async resumeParentOrPendingTransaction(parentTransaction, context) {
        const terminalStore = await container(this).get(TERMINAL_STORE);
        const transactionManagerStore = terminalStore.getTransactionManager();
        if (parentTransaction) {
            await this.setupTransaction(parentTransaction.credentials, parentTransaction, parentTransaction.parentTransaction, transactionManagerStore, context);
        }
        else if (transactionManagerStore.pendingTransactionQueue.length) {
            const pendingTransaction = transactionManagerStore.pendingTransactionQueue.pop();
            const transaction = await this.internalStartTransaction(pendingTransaction.credentials, null, context);
            pendingTransaction.resolve(transaction);
        }
    }
    async commit(credentials, context) {
        const transaction = await this.getTransactionFromContextOrCredentials(credentials, context);
        let parentTransaction = transaction.parentTransaction;
        try {
            if (parentTransaction) {
                // Copy transaction history to the parent transaction
                let childTransactionHistory = transaction.transactionHistory;
                let parentTransactionHistory = parentTransaction.transactionHistory;
                for (const operationHistory of childTransactionHistory.allOperationHistory) {
                    const repositoryId = operationHistory.repositoryTransactionHistory.repository.id;
                    const parentRepositoryTransactionRecord = parentTransactionHistory
                        .repositoryTransactionHistoryMap[repositoryId];
                    if (parentRepositoryTransactionRecord) {
                        operationHistory.repositoryTransactionHistory = parentRepositoryTransactionRecord;
                    }
                    else {
                        parentTransactionHistory.repositoryTransactionHistoryMap[repositoryId]
                            = operationHistory.repositoryTransactionHistory;
                        parentTransactionHistory.repositoryTransactionHistories
                            .push(operationHistory.repositoryTransactionHistory);
                    }
                }
                parentTransactionHistory.allOperationHistory = parentTransactionHistory
                    .allOperationHistory.concat(childTransactionHistory.allOperationHistory);
                parentTransactionHistory.allRecordHistory = parentTransactionHistory
                    .allRecordHistory.concat(childTransactionHistory.allRecordHistory);
                parentTransactionHistory.allRecordHistoryNewValues = parentTransactionHistory
                    .allRecordHistoryNewValues.concat(childTransactionHistory.allRecordHistoryNewValues);
                parentTransactionHistory.allRecordHistoryOldValues = parentTransactionHistory
                    .allRecordHistoryOldValues.concat(childTransactionHistory.allRecordHistoryOldValues);
            }
            else {
                // This is the root transaction, save it's history, along with any nested transactions
                await this.saveRepositoryHistory(transaction, context);
                await transaction.saveTransaction(transaction.transactionHistory);
            }
            const activeQueries = await container(this).get(ACTIVE_QUERIES);
            activeQueries.rerunQueries();
            await transaction.commit(null, context);
            let transactionHistory = transaction.transactionHistory;
            if (!parentTransaction && transactionHistory.allRecordHistory.length) {
                const synchronizationOutManager = await container(this)
                    .get(SYNCHRONIZATION_OUT_MANAGER);
                await synchronizationOutManager.synchronizeOut(transactionHistory.repositoryTransactionHistories);
            }
        }
        finally {
            await this.clearTransaction(transaction, parentTransaction, credentials, context);
            // Right now transactions are tied to @Api() calls,
            // If an @Api() fails to commit the parent @Api() call should resume
            // it's transaction or the next 
            await this.resumeParentOrPendingTransaction(parentTransaction, context);
        }
    }
    checkForCircularDependencies(transaction, credentials) {
        if (credentials.domain === INTERNAL_DOMAIN) {
            return;
        }
        do {
            if (this.isSameSource(transaction, credentials)) {
                let callHerarchy = this.getApiName(credentials);
                let hierarchyTransaction = transaction;
                do {
                    callHerarchy = `${this.getApiName(hierarchyTransaction.initiator)} ->
${callHerarchy}`;
                } while (hierarchyTransaction = hierarchyTransaction.parentTransaction);
                throw new Error(`Circular API call detected:
				
${callHerarchy}

				`);
            }
        } while (transaction = transaction.parentTransaction);
    }
    async setupTransaction(credentials, transaction, parentTransaction, transactionManagerStore, context) {
        context.transaction = transaction;
        credentials.transactionId = transaction.id;
        const transactionHistoryDuo = await container(this).get(TRANSACTION_HISTORY_DUO);
        transaction.transactionHistory = transactionHistoryDuo.getNewRecord();
        transactionManagerStore.transactionInProgressMap.set(transaction.id, transaction);
        if (parentTransaction) {
            transactionManagerStore.transactionInProgressMap.delete(parentTransaction.id);
        }
        else {
            transactionManagerStore.rootTransactionInProgressMap.set(transaction.id, transaction);
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
    isSameSource(transaction, credentials) {
        const initiator = transaction.initiator;
        return initiator.domain === credentials.domain
            && initiator.application === credentials.application
            && initiator.objectName === credentials.objectName
            && initiator.methodName === credentials.methodName;
    }
    getApiName(nameContainer) {
        return `${nameContainer.domain}.${nameContainer.application}.${nameContainer.objectName}.${nameContainer.methodName}`;
    }
    async clearTransaction(transaction, parentTransaction, credentials, context) {
        const terminalStore = await container(this).get(TERMINAL_STORE);
        const transactionManagerStore = terminalStore.getTransactionManager();
        transactionManagerStore.transactionInProgressMap.delete(transaction.id);
        if (!parentTransaction) {
            transactionManagerStore.rootTransactionInProgressMap.delete(transaction.id);
        }
        context.transaction = null;
        credentials.transactionId = null;
    }
    async saveRepositoryHistory(transaction, context) {
        let transactionHistory = transaction.transactionHistory;
        if (!transactionHistory.allRecordHistory.length) {
            return false;
        }
        let applicationMap = transactionHistory.applicationMap;
        const idGenerator = await container(this).get(ID_GENERATOR);
        const transactionHistoryIds = await idGenerator.generateTransactionHistoryIds(transactionHistory.repositoryTransactionHistories.length, transactionHistory.allOperationHistory.length, transactionHistory.allRecordHistory.length);
        applicationMap.ensureEntity(Q.TransactionHistory.__driver__.dbEntity, true);
        transactionHistory.id = transactionHistoryIds.transactionHistoryId;
        await this.doInsertValues(transaction, Q.TransactionHistory, [transactionHistory], context);
        applicationMap.ensureEntity(Q.RepositoryTransactionHistory.__driver__.dbEntity, true);
        transactionHistory.repositoryTransactionHistories.forEach((repositoryTransactionHistory, index) => {
            repositoryTransactionHistory.id = transactionHistoryIds.repositoryHistoryIds[index];
            repositoryTransactionHistory.transactionHistory = transactionHistory;
        });
        await this.doInsertValues(transaction, Q.RepositoryTransactionHistory, transactionHistory.repositoryTransactionHistories, context);
        applicationMap.ensureEntity(Q.OperationHistory.__driver__.dbEntity, true);
        transactionHistory.allOperationHistory.forEach((operationHistory, index) => {
            operationHistory.id = transactionHistoryIds.operationHistoryIds[index];
        });
        await this.doInsertValues(transaction, Q.OperationHistory, transactionHistory.allOperationHistory, context);
        applicationMap.ensureEntity(Q.RecordHistory.__driver__.dbEntity, true);
        transactionHistory.allRecordHistory.forEach((recordHistory, index) => {
            recordHistory.id = transactionHistoryIds.recordHistoryIds[index];
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
}
DI.set(TRANSACTION_MANAGER, TransactionManager);
//# sourceMappingURL=TransactionManager.js.map