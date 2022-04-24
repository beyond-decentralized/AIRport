import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { AIRPORT_DATABASE, ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, APPLICATION_UTILS } from '../../tokens';
export class IocQueryContext {
    async init() {
        const [airDb, entityUtils, fieldUtils, queryFacade, queryUtils, applicationUtils, transactionalConnector] = await DEPENDENCY_INJECTION.db()
            .get(AIRPORT_DATABASE, ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, APPLICATION_UTILS, TRANSACTIONAL_CONNECTOR);
        this.airDb = airDb;
        this.entityUtils = entityUtils;
        this.fieldUtils = fieldUtils;
        this.queryFacade = queryFacade;
        this.queryUtils = queryUtils;
        this.applicationUtils = applicationUtils;
        this.transactionalConnector = transactionalConnector;
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
//# sourceMappingURL=QueryContext.js.map