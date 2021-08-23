import { container, DI } from '@airport/di';
import { STORE_DRIVER } from '@airport/ground-control';
import { QUERY_MANAGER } from '../tokens';
export class QueryManager {
    async find(portableQuery, context, cachedSqlQueryId) {
        const storeDriver = await container(this)
            .get(STORE_DRIVER);
        return await storeDriver.find(portableQuery, {}, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        const storeDriver = await container(this)
            .get(STORE_DRIVER);
        return await storeDriver.findOne(portableQuery, {}, context, cachedSqlQueryId);
    }
    search(portableQuery, context, cachedSqlQueryId) {
        const storeDriver = container(this)
            .getSync(STORE_DRIVER);
        return storeDriver.search(portableQuery, {}, context, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        const storeDriver = container(this)
            .getSync(STORE_DRIVER);
        return storeDriver.searchOne(portableQuery, {}, context, cachedSqlQueryId);
    }
}
DI.set(QUERY_MANAGER, QueryManager);
//# sourceMappingURL=QueryManager.js.map