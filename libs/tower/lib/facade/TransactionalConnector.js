import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { TRANSACTIONAL_SERVER } from '@airport/tower';
export class TransactionalConnector {
    async init() {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        await transServer.init();
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.addRepository(name, url, platform, platformConfig, distributionStrategy, {
            domainAndPort: 'test'
        }, context);
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.find(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.findOne(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async search(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.search(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async searchOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.searchOne(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    /**
     * This is a TIQL Insert statement coming from the client.
     * It will have an id of the operation to be invoked, as
     * well as the parameters for this specific operation.
     * The operation will then be looked up from the schema,
     * parsed, cached (if appropriate) and executed.
     *
     * NOTE: some of these operations will be internal
     *
     * In a client Dao this will look like:
     *
     * @Prepared()
     * @Insert(...)
     *
     */
    insert(
    // todo define parameters
    ) {
        // TODO: implement
        throw new Error(`TODO: implement`);
    }
    /**
     * @Update(...)
     */
    update(
    // todo define parameters
    ) {
        // TODO: implement
        throw new Error(`TODO: implement`);
    }
    /**
     * @Delete(...)
     */
    delete(
    // todo define parameters
    ) {
        // TODO: implement
        throw new Error(`TODO: implement`);
    }
    save(entity, context) {
        throw new Error(`Not Implemented`);
    }
}
DI.set(TRANSACTIONAL_CONNECTOR, TransactionalConnector);
export function injectTransactionalConnector() {
    // console.log('Injecting TransactionalConnector')
}
//# sourceMappingURL=TransactionalConnector.js.map