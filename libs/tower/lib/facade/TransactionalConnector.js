import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { TRANSACTIONAL_SERVER } from '../tokens';
var isServer = false;
export function setIsServer() {
    isServer = true;
}
export class TransactionalConnector {
    async init() {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        await transServer.init();
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy, context) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.addRepository(name, url, platform, platformConfig, distributionStrategy, {
            domainAndPort: 'test'
        }, context);
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.find(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.findOne(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async search(portableQuery, context, cachedSqlQueryId) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.search(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async searchOne(portableQuery, context, cachedSqlQueryId) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
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
        if (!isServer) {
            throw new Error('Not implemented');
        }
        // TODO: implement
        throw new Error(`TODO: implement`);
    }
    /**
     * @Update(...)
     */
    update(
    // todo define parameters
    ) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        // TODO: implement
        throw new Error(`TODO: implement`);
    }
    /**
     * @Delete(...)
     */
    delete(
    // todo define parameters
    ) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        // TODO: implement
        throw new Error(`TODO: implement`);
    }
    async save(entity, context) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.save(entity, null, context);
    }
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValues(portableQuery, null, context, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, context) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValuesGetIds(portableQuery, null, context);
    }
    async updateValues(portableQuery, context) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.updateValues(portableQuery, null, context);
    }
    async deleteWhere(portableQuery, context) {
        if (!isServer) {
            throw new Error('Not implemented');
        }
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.deleteWhere(portableQuery, null, context);
    }
}
DI.set(TRANSACTIONAL_CONNECTOR, TransactionalConnector);
export function injectTransactionalConnector() {
    // console.log('Injecting TransactionalConnector')
}
//# sourceMappingURL=TransactionalConnector.js.map