var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { INTERNAL_APP, INTERNAL_DOMAIN } from '@airport/ground-control';
import { Q } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { AbstractMutationManager } from './AbstractMutationManager';
let TransactionManager = class TransactionManager extends AbstractMutationManager {
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    async initialize(dbName, context) {
        return await this.storeDriver.initialize(dbName, context);
        // await this.dataStore.initialize(dbName)
        // await this.repositoryManager.initialize();
    }
    getInProgressTransactionById(transactionId) {
        return this.terminalStore.getTransactionManager()
            .transactionInProgressMap.get(transactionId);
    }
    isServer(context) {
        return this.terminalStore.getIsServer();
    }
    async transactInternal(transactionalCallback, context) {
        await this.transact({
            application: INTERNAL_APP,
            domain: INTERNAL_DOMAIN,
            methodName: null,
            objectName: null
        }, transactionalCallback, context);
    }
    async transact(credentials, transactionalCallback, context) {
        if (context.transaction) {
            // Nested transact() calls in internal operations
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
            console.error(e);
            await this.rollback(credentials, context);
            throw e;
        }
    }
    async startTransaction(credentials, context) {
        if (context.transaction) {
            return;
        }
        const transactionManagerStore = this.terminalStore.getTransactionManager();
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
                        context,
                        credentials,
                        reject,
                        resolve
                    });
                });
            }
        }
        const transaction = await this.internalStartTransaction(credentials, parentTransaction, context);
        if (!parentTransaction) {
            const rootTransaction = transaction;
            rootTransaction.numberOfOperations = 0;
            // Internal calls don't maintain rootTransaction and can create more than
            // one repository at a time.  APIs exposed externally will never be top
            // level transactions
            if (credentials.domain !== INTERNAL_DOMAIN) {
                const userSession = await this.terminalSessionManager.getUserSession();
                userSession.currentRootTransaction = rootTransaction;
            }
        }
        return transaction;
    }
    async internalStartTransaction(credentials, parentTransaction, context) {
        const transactionManagerStore = this.terminalStore.getTransactionManager();
        const transaction = await this.storeDriver
            .setupTransaction(context, parentTransaction);
        await this.storeDriver.startTransaction(transaction, context);
        transaction.credentials = credentials;
        await this.setupTransaction(credentials, transaction, parentTransaction, transactionManagerStore, context);
        return transaction;
    }
    async rollback(credentials, context) {
        const transaction = this.getTransactionFromContextOrCredentials(credentials, context);
        let parentTransaction = transaction.parentTransaction;
        await transaction.rollback(null, context);
        const transactionCleared = await this.clearTransaction(transaction, parentTransaction, credentials, context);
        if (!parentTransaction) {
            await this.clearUserSessionRootTransaction(transaction);
        }
        if (transactionCleared) {
            await this.resumeParentOrPendingTransaction(parentTransaction, context);
        }
    }
    getTransactionFromContextOrCredentials(credentials, context) {
        let transaction = context.transaction;
        if (!transaction) {
            if (!credentials.transactionId) {
                throw new Error(`
No Transaction Id is passed in Credentials for a transactional operation.
				`);
            }
            const transactionManagerStore = this.terminalStore
                .getTransactionManager();
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
        for (; ancestorTransaction.parentTransaction; ancestorTransaction = ancestorTransaction.parentTransaction) {
        }
        context.rootTransaction = ancestorTransaction;
        return transaction;
    }
    async resumeParentOrPendingTransaction(parentTransaction, context) {
        const transactionManagerStore = this.terminalStore.getTransactionManager();
        if (parentTransaction) {
            await this.setupTransaction(parentTransaction.credentials, parentTransaction, parentTransaction.parentTransaction, transactionManagerStore, context);
        }
        else if (transactionManagerStore.pendingTransactionQueue.length) {
            const pendingTransaction = transactionManagerStore.pendingTransactionQueue.pop();
            const transaction = await this.internalStartTransaction(pendingTransaction.credentials, null, pendingTransaction.context);
            pendingTransaction.resolve(transaction);
        }
    }
    async commit(credentials, context) {
        const transaction = this.getTransactionFromContextOrCredentials(credentials, context);
        let parentTransaction = transaction.parentTransaction;
        try {
            if (parentTransaction) {
                if (!context.doNotRecordHistory) {
                    this.copyTransactionHistoryToParentTransaction(transaction, parentTransaction);
                }
            }
            else {
                // This is the root transaction, save it's history, along with any nested transactions
                if (!context.doNotRecordHistory) {
                    await this.saveRepositoryHistory(transaction, context);
                }
            }
            this.activeQueries.rerunQueries();
            await transaction.commit(null, context);
            let transactionHistory = transaction.transactionHistory;
            if (!context.doNotRecordHistory) {
                if (!parentTransaction && transactionHistory.allRecordHistory.length) {
                    await this.synchronizationOutManager.synchronizeOut(transactionHistory.repositoryTransactionHistories);
                }
            }
            if (!parentTransaction) {
                await this.clearUserSessionRootTransaction(transaction);
            }
        }
        finally {
            if (await this.clearTransaction(transaction, parentTransaction, credentials, context)) {
                // Right now transactions are tied to @Api() calls,
                // If an @Api() fails to commit the parent @Api() call should resume
                // it's transaction or the next 
                await this.resumeParentOrPendingTransaction(parentTransaction, context);
            }
        }
    }
    async clearUserSessionRootTransaction(transaction) {
        // Internal calls don't maintain rootTransaction and can create more than
        // one repository at a time.  APIs exposed externally will never be top
        // level transactions
        if (transaction.credentials.domain === INTERNAL_DOMAIN) {
            return;
        }
        const userSession = await this.terminalSessionManager.getUserSession();
        userSession.currentRootTransaction = null;
    }
    copyTransactionHistoryToParentTransaction(transaction, parentTransaction) {
        let childTransactionHistory = transaction.transactionHistory;
        let parentTransactionHistory = parentTransaction.transactionHistory;
        for (const operationHistory of childTransactionHistory.allOperationHistory) {
            const repositoryId = operationHistory.repositoryTransactionHistory.repository._localId;
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
        if (!context.doNotRecordHistory) {
            transaction.transactionHistory = this.transactionHistoryDuo.getNewRecord();
        }
        transactionManagerStore.transactionInProgressMap.set(transaction.id, transaction);
        if (parentTransaction) {
            transactionManagerStore.transactionInProgressMap.delete(parentTransaction.id);
            let ancestorTransaction = transaction;
            for (; ancestorTransaction.parentTransaction; ancestorTransaction = ancestorTransaction.parentTransaction) {
            }
            context.rootTransaction = ancestorTransaction;
        }
        else {
            transactionManagerStore.rootTransactionInProgressMap.set(transaction.id, transaction);
            context.rootTransaction = transaction;
        }
    }
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
        const transactionManagerStore = this.terminalStore
            .getTransactionManager();
        transactionManagerStore.transactionInProgressMap.delete(transaction.id);
        if (!parentTransaction) {
            transactionManagerStore.rootTransactionInProgressMap.delete(transaction.id);
        }
        context.transaction = null;
        credentials.transactionId = null;
        return true;
    }
    async saveRepositoryHistory(transaction, context) {
        let transactionHistory = transaction.transactionHistory;
        if (!transactionHistory.allRecordHistory.length) {
            return false;
        }
        let applicationMap = transactionHistory.applicationMap;
        const transactionHistoryIds = await this.idGenerator.generateTransactionHistory_LocalIds(transactionHistory.repositoryTransactionHistories.length, transactionHistory.allOperationHistory.length, transactionHistory.allRecordHistory.length);
        applicationMap.ensureEntity(Q.TransactionHistory.__driver__.dbEntity, true);
        transactionHistory._localId = transactionHistoryIds.transactionHistory_LocalId;
        await this.doInsertValues(transaction, Q.TransactionHistory, [transactionHistory], context);
        applicationMap.ensureEntity(Q.RepositoryTransactionHistory.__driver__.dbEntity, true);
        transactionHistory.repositoryTransactionHistories.forEach((repositoryTransactionHistory, index) => {
            repositoryTransactionHistory._localId = transactionHistoryIds.repositoryHistory_LocalIds[index];
            repositoryTransactionHistory.transactionHistory = transactionHistory;
        });
        await this.doInsertValues(transaction, Q.RepositoryTransactionHistory, transactionHistory.repositoryTransactionHistories, context);
        applicationMap.ensureEntity(Q.OperationHistory.__driver__.dbEntity, true);
        transactionHistory.allOperationHistory.forEach((operationHistory, index) => {
            operationHistory._localId = transactionHistoryIds.operationHistory_LocalIds[index];
        });
        await this.doInsertValues(transaction, Q.OperationHistory, transactionHistory.allOperationHistory, context);
        applicationMap.ensureEntity(Q.RecordHistory.__driver__.dbEntity, true);
        transactionHistory.allRecordHistory.forEach((recordHistory, index) => {
            recordHistory._localId = transactionHistoryIds.recordHistory_LocalIds[index];
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
};
__decorate([
    Inject()
], TransactionManager.prototype, "activeQueries", void 0);
__decorate([
    Inject()
], TransactionManager.prototype, "idGenerator", void 0);
__decorate([
    Inject()
], TransactionManager.prototype, "storeDriver", void 0);
__decorate([
    Inject()
], TransactionManager.prototype, "synchronizationOutManager", void 0);
__decorate([
    Inject()
], TransactionManager.prototype, "terminalSessionManager", void 0);
__decorate([
    Inject()
], TransactionManager.prototype, "terminalStore", void 0);
__decorate([
    Inject()
], TransactionManager.prototype, "transactionHistoryDuo", void 0);
TransactionManager = __decorate([
    Injected()
], TransactionManager);
export { TransactionManager };
//# sourceMappingURL=TransactionManager.js.map