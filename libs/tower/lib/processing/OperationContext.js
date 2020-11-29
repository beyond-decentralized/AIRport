import { AIR_DB, ENTITY_STATE_MANAGER, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, RELATION_MANAGER, SCHEMA_UTILS, UPDATE_CACHE, } from '@airport/air-control';
import { DI } from '@airport/di';
import { STORE_DRIVER } from '@airport/ground-control';
import { OPERATION_CONTEXT_LOADER, TRANS_SERVER } from '../tokens';
export class IocOperationContext {
    async init() {
        const [airDb, entityStateManager, fieldUtils, metadataUtils, queryFacade, queryUtils, relationManager, schemaUtils, storeDriver, transactionalServer, updateCache] = await DI.db()
            .get(AIR_DB, ENTITY_STATE_MANAGER, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, RELATION_MANAGER, SCHEMA_UTILS, STORE_DRIVER, TRANS_SERVER, UPDATE_CACHE);
        this.airDb = airDb;
        this.entityStateManager = entityStateManager;
        this.fieldUtils = fieldUtils;
        this.metadataUtils = metadataUtils;
        this.queryFacade = queryFacade;
        this.queryUtils = queryUtils;
        this.relationManager = relationManager;
        this.schemaUtils = schemaUtils;
        this.storeDriver = storeDriver;
        this.transactionalServer = transactionalServer;
        this.updateCache = updateCache;
    }
}
export class OperationContextLoader {
    async ensure(ctx) {
        if (!ctx.ioc) {
            ctx.ioc = new IocOperationContext();
            await ctx.ioc.init();
        }
    }
}
DI.set(OPERATION_CONTEXT_LOADER, OperationContextLoader);
//# sourceMappingURL=OperationContext.js.map