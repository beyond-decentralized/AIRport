import { AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, UPDATE_CACHE, } from '@airport/air-control';
import { DI } from '@airport/di';
import { TRANS_SERVER } from './tokens';
export class IocContext {
    async init() {
        const [airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transactionalServer, updateCache] = await DI.db()
            .get(AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, TRANS_SERVER, UPDATE_CACHE);
        this.airDb = airDb;
        this.fieldUtils = fieldUtils;
        this.metadataUtils = metadataUtils;
        this.queryFacade = queryFacade;
        this.queryUtils = queryUtils;
        this.schemaUtils = schemaUtils;
        this.transactionalServer = transactionalServer;
        this.updateCache = updateCache;
    }
}
//# sourceMappingURL=Context.js.map