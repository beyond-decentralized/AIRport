import { container, DI } from '@airport/di';
import { OPERATION_CONTEXT_LOADER } from '@airport/ground-control';
import { Actor } from '@airport/holding-pattern';
import { TRANSACTION_MANAGER, TRANSACTIONAL_SERVER, TERMINAL_STORE } from '@airport/terminal-map';
import { transactional } from '@airport/tower';
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
        const transManager = await container(this)
            .get(TRANSACTION_MANAGER);
        return await transManager.initialize('airport', context);
    }
    async addRepository(
    // url: string,
    // platform: PlatformType,
    // platformConfig: string,
    // distributionStrategy: DistributionStrategy,
    credentials, context) {
        await this.ensureIocContext(context);
        const actor = await this.getActor(credentials);
        // FIXME: check actor
        let repositoryId = 0;
        await transactional(async (transaction) => {
            // TODO: figure out how addRepository will work
            repositoryId = await context.ioc.insertManager.addRepository(
            // url, platform, platformConfig, distributionStrategy
            actor, context);
        }, context);
        return repositoryId;
    }
    async find(portableQuery, credentials, context, cachedSqlQueryId) {
        await this.ensureIocContext(context);
        return await context.ioc.queryManager.find(portableQuery, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, credentials, context, cachedSqlQueryId) {
        await this.ensureIocContext(context);
        return await context.ioc.queryManager.findOne(portableQuery, context, cachedSqlQueryId);
    }
    search(portableQuery, credentials, context, cachedSqlQueryId) {
        this.ensureIocContextSync(context);
        return context.ioc.queryManager.search(portableQuery, context);
    }
    searchOne(portableQuery, credentials, context, cachedSqlQueryId) {
        this.ensureIocContextSync(context);
        return context.ioc.queryManager.searchOne(portableQuery, context);
    }
    async startTransaction(credentials, context) {
        throw new Error('FIXME: implement');
    }
    async commit(credentials, context) {
        throw new Error('FIXME: implement');
    }
    async rollback(credentials, context) {
        throw new Error('FIXME: implement');
    }
    async save(entity, credentials, context) {
        if (!entity) {
            return null;
        }
        await this.ensureIocContext(context);
        const actor = await this.getActor(credentials);
        context.actor = actor;
        let saveResult;
        await transactional(async (transaction) => {
            saveResult = await context.ioc.operationManager.performSave(entity, actor, transaction, context);
        }, context);
        return saveResult;
    }
    async saveToDestination(repositoryDestination, entity, credentials, context) {
        if (!entity) {
            return null;
        }
        await this.ensureIocContext(context);
        const actor = await this.getActor(credentials);
        context.actor = actor;
        let saveResult;
        await transactional(async (transaction) => {
            // TODO: save to serialized repository to the specified destination
            saveResult = await context.ioc.operationManager.performSave(entity, actor, transaction, context);
        }, context);
        return saveResult;
    }
    async insertValues(portableQuery, credentials, context, ensureGeneratedValues // for internal use only
    ) {
        const values = portableQuery.jsonQuery.V;
        if (!values.length) {
            return 0;
        }
        const firstValuesRow = values[0];
        if (!firstValuesRow || !firstValuesRow.length) {
            return 0;
        }
        const numValuesInRow = firstValuesRow.length;
        for (let valuesRow of values) {
            if (valuesRow.length !== numValuesInRow) {
                return 0;
            }
        }
        await this.ensureIocContext(context);
        const actor = await this.getActor(credentials);
        let numInsertedRecords;
        await transactional(async (transaction) => {
            numInsertedRecords = await context.ioc.insertManager.insertValues(portableQuery, actor, transaction, context, ensureGeneratedValues);
        }, context);
        return numInsertedRecords;
    }
    async insertValuesGetIds(portableQuery, credentials, context) {
        await this.ensureIocContext(context);
        const actor = await this.getActor(credentials);
        let ids;
        await transactional(async (transaction) => {
            ids = await context.ioc.insertManager.insertValuesGetIds(portableQuery, actor, transaction, context);
        }, context);
        return ids;
    }
    async updateValues(portableQuery, credentials, context) {
        await this.ensureIocContext(context);
        const actor = await this.getActor(credentials);
        let numUpdatedRecords;
        await transactional(async (transaction) => {
            numUpdatedRecords = await context.ioc.updateManager.updateValues(portableQuery, actor, transaction, context);
        }, context);
        return numUpdatedRecords;
    }
    async deleteWhere(portableQuery, credentials, context) {
        await this.ensureIocContext(context);
        const actor = await this.getActor(credentials);
        let numDeletedRecords;
        await transactional(async (transaction) => {
            numDeletedRecords = await context.ioc.deleteManager.deleteWhere(portableQuery, actor, transaction, context);
        }, context);
        return numDeletedRecords;
    }
    async getActor(credentials) {
        if (this.tempActor) {
            return this.tempActor;
        }
        if (credentials.applicationSignature === 'internal') {
            return new Actor();
        }
        const terminalStore = await container(this).get(TERMINAL_STORE);
        const actors = terminalStore.getApplicationActorMapBySignature()
            .get(credentials.applicationSignature);
        const localTerminal = terminalStore.getFrameworkActor().terminal;
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
            throw new Error(`Could not find actor for Application Signature:
	${credentials.applicationSignature}`);
        }
        return actor;
    }
    async ensureIocContext(context) {
        const operationContextLoader = await container(this)
            .get(OPERATION_CONTEXT_LOADER);
        await operationContextLoader.ensure(context);
    }
    async ensureIocContextSync(context) {
        const operationContextLoader = container(this)
            .getSync(OPERATION_CONTEXT_LOADER);
        operationContextLoader.ensureSync(context);
    }
}
DI.set(TRANSACTIONAL_SERVER, TransactionalServer);
export function injectTransactionalServer() {
    console.log('Injecting TransactionalServer');
}
//# sourceMappingURL=TransactionalServer.js.map