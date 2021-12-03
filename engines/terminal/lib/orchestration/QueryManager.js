import { REPOSITORY_LOADER } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { STORE_DRIVER } from '@airport/ground-control';
import { QUERY_MANAGER } from '../tokens';
export class QueryManager {
    async find(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        const storeDriver = await container(this)
            .get(STORE_DRIVER);
        return await storeDriver.find(portableQuery, {}, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        const storeDriver = await container(this)
            .get(STORE_DRIVER);
        return await storeDriver.findOne(portableQuery, {}, context, cachedSqlQueryId);
    }
    search(portableQuery, context, cachedSqlQueryId) {
        // TODO: checking for presence of a repository in in an observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)
        const storeDriver = container(this)
            .getSync(STORE_DRIVER);
        return storeDriver.search(portableQuery, {}, context, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        // TODO: checking for presence of a repository in in an observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)
        const storeDriver = container(this)
            .getSync(STORE_DRIVER);
        return storeDriver.searchOne(portableQuery, {}, context, cachedSqlQueryId);
    }
    async ensureRepositoryPresenceAndCurrentState(context) {
        if (context.repository && context.repository.source && context.repository.uuId) {
            const repositoryLoader = await DI.db().get(REPOSITORY_LOADER);
            await repositoryLoader.loadRepository(context.repository.source, context.repository.uuId);
        }
    }
}
DI.set(QUERY_MANAGER, QueryManager);
//# sourceMappingURL=QueryManager.js.map