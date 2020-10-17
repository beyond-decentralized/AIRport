import { container, DI } from '@airport/di';
import { STORE_DRIVER } from '@airport/ground-control';
import { QUERY_MANAGER } from '../tokens';
export class QueryManager {
    async find(portableQuery, cachedSqlQueryId) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        return await storeDriver.find(portableQuery, {}, cachedSqlQueryId);
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        return await storeDriver.findOne(portableQuery, {}, cachedSqlQueryId);
    }
    async search(portableQuery, cachedSqlQueryId) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        return await storeDriver.search(portableQuery, {}, cachedSqlQueryId);
    }
    async searchOne(portableQuery, cachedSqlQueryId) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        return await storeDriver.searchOne(portableQuery, {}, cachedSqlQueryId);
    }
}
DI.set(QUERY_MANAGER, QueryManager);
//# sourceMappingURL=QueryManager.js.map