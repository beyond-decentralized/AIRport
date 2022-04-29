export class QueryManager {
    async find(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        return await this.storeDriver.find(portableQuery, {}, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        return await this.storeDriver.findOne(portableQuery, {}, context, cachedSqlQueryId);
    }
    search(portableQuery, context, cachedSqlQueryId) {
        // TODO: checking for presence of a repository in in an observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)
        return this.storeDriver.search(portableQuery, {}, context, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        // TODO: checking for presence of a repository in in an observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)
        return this.storeDriver.searchOne(portableQuery, {}, context, cachedSqlQueryId);
    }
    async ensureRepositoryPresenceAndCurrentState(context) {
        if (context.repository && context.repository.source && context.repository.uuId) {
            await this.repositoryLoader.loadRepository(context.repository.source, context.repository.uuId, context);
        }
    }
}
//# sourceMappingURL=QueryManager.js.map