import { DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { AIRPORT_DATABASE, ENTITY_UTILS, FIELD_UTILS, QUERY_CONTEXT_LOADER, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, UPDATE_CACHE } from '../../tokens';
export class IocQueryContext {
    async init() {
        const [airDb, entityUtils, fieldUtils, queryFacade, queryUtils, schemaUtils, transactionalConnector, updateCache] = await DI.db()
            .get(AIRPORT_DATABASE, ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, TRANSACTIONAL_CONNECTOR, UPDATE_CACHE);
        this.airDb = airDb;
        this.entityUtils = entityUtils;
        this.fieldUtils = fieldUtils;
        this.queryFacade = queryFacade;
        this.queryUtils = queryUtils;
        this.schemaUtils = schemaUtils;
        this.transactionalConnector = transactionalConnector;
        this.updateCache = updateCache;
    }
}
export class QueryContextLoader {
    async ensure(ctx) {
        if (!ctx.ioc) {
            ctx.ioc = new IocQueryContext();
            await ctx.ioc.init();
        }
    }
}
DI.set(QUERY_CONTEXT_LOADER, QueryContextLoader);
//# sourceMappingURL=QueryContext.js.map