import { container, DI } from '@airport/di';
import { TRANSACTION_MANAGER } from '@airport/terminal-map';
import { TRANS_SERVER } from '@airport/tower';
import { DELETE_MANAGER, INSERT_MANAGER, QUERY_MANAGER, UPDATE_MANAGER } from '../tokens';
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
        return await transManager.init('airport', context);
    }
    async find(portableQuery, credentials, context, cachedSqlQueryId) {
        const queryManager = await container(this)
            .get(QUERY_MANAGER);
        return await queryManager.find(portableQuery, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, credentials, context, cachedSqlQueryId) {
        const queryManager = await container(this)
            .get(QUERY_MANAGER);
        return await queryManager.findOne(portableQuery, context, cachedSqlQueryId);
    }
    async search(portableQuery, credentials, context, cachedSqlQueryId) {
        const queryManager = await container(this)
            .get(QUERY_MANAGER);
        return await queryManager.search(portableQuery, context);
    }
    async searchOne(portableQuery, credentials, context, cachedSqlQueryId) {
        const queryManager = await container(this)
            .get(QUERY_MANAGER);
        return await queryManager.searchOne(portableQuery, context);
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy, credentials, context) {
        const insertManager = await container(this)
            .get(INSERT_MANAGER);
        return await insertManager.addRepository(name, url, platform, platformConfig, distributionStrategy);
    }
    async insertValues(portableQuery, transaction, context, ensureGeneratedValues // for internal use only
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
        const insertManager = await container(this)
            .get(INSERT_MANAGER);
        const actor = await this.getActor(portableQuery);
        return await insertManager.insertValues(portableQuery, actor, transaction, context, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, transaction, context) {
        const insertManager = await container(this)
            .get(INSERT_MANAGER);
        const actor = await this.getActor(portableQuery);
        return await insertManager.insertValuesGetIds(portableQuery, actor, transaction, context);
    }
    async updateValues(portableQuery, transaction, context) {
        const updateManager = await container(this)
            .get(UPDATE_MANAGER);
        const actor = await this.getActor(portableQuery);
        return await updateManager.updateValues(portableQuery, actor, transaction, context);
    }
    async deleteWhere(portableQuery, transaction, context) {
        const deleteManager = await container(this)
            .get(DELETE_MANAGER);
        const actor = await this.getActor(portableQuery);
        return await deleteManager.deleteWhere(portableQuery, actor, transaction);
    }
    async getActor(portableQuery) {
        if (this.tempActor) {
            return this.tempActor;
        }
        throw new Error(`Not Implemented`);
    }
}
DI.set(TRANS_SERVER, TransactionalServer);
export function injectTransactionalServer() {
    console.log('Injecting TransactionalServer');
}
//# sourceMappingURL=TransactionalServer.js.map