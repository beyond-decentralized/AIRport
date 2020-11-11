import { DI } from '@airport/di';
import { TRANS_CONNECTOR } from '@airport/ground-control';
import { AIR_DB, ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, UPDATE_CACHE } from '../../tokens';
export class IocQueryContext {
    static async ensure(ctx) {
        if (!ctx.ioc) {
            ctx.ioc = new IocQueryContext();
            await ctx.ioc.init();
        }
    }
    async init() {
        const [airDb, entityUtils, fieldUtils, queryFacade, queryUtils, schemaUtils, transactionalConnector, updateCache] = await DI.db()
            .get(AIR_DB, ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, TRANS_CONNECTOR, UPDATE_CACHE);
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
//# sourceMappingURL=QueryContext.js.map