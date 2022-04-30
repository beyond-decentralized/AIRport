import { INTERNAL_DOMAIN } from '@airport/ground-control';
import { Actor } from '@airport/holding-pattern';
/**
 * Keeps track of transactions, per client and validates that a given
 * transaction belongs to the provided client.  If the connection
 * information matches, passes the transaction for handling.
 *
 * All transactions are queued.  Read operations are not blocked while
 * any transaction is in progress.  Best way to make sure that you get
 * the latest state is to subscribe to a query, which is guaranteed to
 * be updated after data has changed.
 *
 *
 * Should read operations be blocked while transactions are in process?
 * Probably not since they will just get snapshot of the state at any
 * given point in time and transactionality takes care of not exposing
 * inconsistent state.  There doesn't appear to be a need to que-up
 * read transactions, since SqLite can handle it:
 *
 * https://www.skoumal.net/en/parallel-read-and-write-in-sqlite/
 *
 * Also, there doesn't appear to be a reason to prioritize remote transactions
 * over local ones, since ultimately the state needs to sync either way.
 * A single transactional queue should be enough.
 *
 */
export class TransactionalServer {
    async init(context = {}) {
        return await this.transactionManager.initialize('airport', context);
    }
    async addRepository(credentials, context) {
        await this.ensureContext(context);
        this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        const actor = await this.getActor(credentials);
        // FIXME: check actor
        let repositoryId = 0;
        await this.transactionManager.transactInternal(async () => {
            const repository = await this.repositoryManager.createRepository(
            // url, platform, platformConfig, distributionStrategy
            actor, context);
            repositoryId = repository.id;
        }, context);
        return repositoryId;
    }
    async find(portableQuery, credentials, context, cachedSqlQueryId) {
        await this.ensureContext(context);
        if (credentials.transactionId) {
            this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        }
        return await this.queryManager.find(portableQuery, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, credentials, context, cachedSqlQueryId) {
        await this.ensureContext(context);
        if (credentials.transactionId) {
            this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        }
        return await this.queryManager.findOne(portableQuery, context, cachedSqlQueryId);
    }
    search(portableQuery, credentials, context, cachedSqlQueryId) {
        this.ensureContextSync(context);
        if (credentials.transactionId) {
            this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        }
        return this.queryManager.search(portableQuery, context);
    }
    searchOne(portableQuery, credentials, context, cachedSqlQueryId) {
        this.ensureContextSync(context);
        if (credentials.transactionId) {
            this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        }
        return this.queryManager.searchOne(portableQuery, context);
    }
    async startTransaction(credentials, context) {
        try {
            await this.ensureContext(context);
            await this.transactionManager.startTransaction(credentials, context);
            return true;
        }
        catch (e) {
            context.errorMessage = e.message;
            console.error(e);
            return false;
        }
    }
    async commit(credentials, context) {
        try {
            await this.ensureContext(context);
            await this.transactionManager.commit(credentials, context);
            return true;
        }
        catch (e) {
            console.error(e);
            context.errorMessage = e.message;
            return false;
        }
    }
    async rollback(credentials, context) {
        if (context.transaction) {
        }
        try {
            await this.ensureContext(context);
            await this.transactionManager.rollback(credentials, context);
            return true;
        }
        catch (e) {
            console.error(e);
            context.errorMessage = e.message;
            return false;
        }
    }
    async save(entity, credentials, context) {
        if (!entity) {
            return null;
        }
        await this.ensureContext(context);
        this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        const actor = await this.getActor(credentials);
        context.actor = actor;
        let saveResult;
        await this.transactionManager.transactInternal(async (transaction, context) => {
            saveResult = await this.operationManager.performSave(entity, actor, transaction, context.rootTransaction, context);
        }, context);
        return saveResult;
    }
    async saveToDestination(repositoryDestination, entity, credentials, context) {
        if (!entity) {
            return null;
        }
        await this.ensureContext(context);
        this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        const actor = await this.getActor(credentials);
        context.actor = actor;
        let saveResult;
        await this.transactionManager.transactInternal(async (transaction, context) => {
            // TODO: save to serialized repository to the specified destination
            saveResult = await this.operationManager.performSave(entity, actor, transaction, context.rootTransaction, context);
        }, context);
        return saveResult;
    }
    async insertValues(portableQuery, credentials, context, ensureGeneratedValues // for internal use only
    ) {
        await this.ensureContext(context);
        this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        const actor = await this.getActor(credentials);
        let numInsertedRecords;
        await this.transactionManager.transactInternal(async (transaction, context) => {
            numInsertedRecords = await this.insertManager.insertValues(portableQuery, actor, transaction, context.rootTransaction, context, ensureGeneratedValues);
        }, context);
        return numInsertedRecords;
    }
    async insertValuesGetIds(portableQuery, credentials, context) {
        await this.ensureContext(context);
        this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        const actor = await this.getActor(credentials);
        let ids;
        await this.transactionManager.transactInternal(async (transaction, context) => {
            ids = await this.insertManager.insertValuesGetIds(portableQuery, actor, transaction, context.rootTransaction, context);
        }, context);
        return ids;
    }
    async updateValues(portableQuery, credentials, context) {
        await this.ensureContext(context);
        this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        const actor = await this.getActor(credentials);
        let numUpdatedRecords;
        await this.transactionManager.transactInternal(async (transaction, context) => {
            numUpdatedRecords = await this.updateManager.updateValues(portableQuery, actor, transaction, context.rootTransaction, context);
        }, context);
        return numUpdatedRecords;
    }
    async deleteWhere(portableQuery, credentials, context) {
        await this.ensureContext(context);
        this.transactionManager.getTransactionFromContextOrCredentials(credentials, context);
        const actor = await this.getActor(credentials);
        let numDeletedRecords;
        await this.transactionManager.transactInternal(async (transaction, context) => {
            numDeletedRecords = await this.deleteManager.deleteWhere(portableQuery, actor, transaction, context.rootTransaction, context);
        }, context);
        return numDeletedRecords;
    }
    async getActor(credentials) {
        if (this.tempActor) {
            return this.tempActor;
        }
        if (credentials.domain === INTERNAL_DOMAIN) {
            return new Actor();
        }
        let actors;
        const actorMapForDomain = this.terminalStore
            .getApplicationActorMapByDomainAndApplicationNames().get(credentials.domain);
        if (actorMapForDomain) {
            actors = actorMapForDomain.get(credentials.application);
        }
        else {
            throw new Error(`No Actors found for
	Domain:
		${credentials.domain}
			`);
        }
        if (!actors) {
            throw new Error(`No Actors found for
	Domain:
		${credentials.domain}
	Application:
		${credentials.application}
			`);
        }
        const localTerminal = this.terminalStore.getFrameworkActor().terminal;
        if (!localTerminal.isLocal) {
            throw new Error(`Expecting terminal of the TerminalStore.frameworkActor to be .isLocal`);
        }
        let actor;
        for (const anActor of actors) {
            if (anActor.terminal.uuId === localTerminal.uuId) {
                actor = anActor;
                break;
            }
        }
        if (!actor) {
            throw new Error(`Could not find actor for
	Domain:
		${credentials.domain}
	Application:
		${credentials.application}
			`);
        }
        return actor;
    }
    async ensureContext(context) {
        await this.operationContextLoader.ensure(context);
    }
    async ensureContextSync(context) {
        this.operationContextLoader.ensureSync(context);
    }
}
export function injectTransactionalServer() {
    console.log('Injecting TransactionalServer');
}
//# sourceMappingURL=TransactionalServer.js.map