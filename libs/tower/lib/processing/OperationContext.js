import { AIR_DB, ENTITY_STATE_MANAGER, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, RELATION_MANAGER, SCHEMA_UTILS, UPDATE_CACHE, } from '@airport/air-control';
import { DI } from '@airport/di';
import { STORE_DRIVER } from '@airport/ground-control';
import { CASCADE_GRAPH_VERIFIER, DEPENDENCY_GRAPH_RESOLVER, ENTITY_GRAPH_RECONSTRUCTOR, OPERATION_CONTEXT_LOADER, STRUCTURAL_ENTITY_VALIDATOR, TRANS_SERVER } from '../tokens';
export class IocOperationContext {
    async init() {
        const [airDb, cascadeGraphVerifier, dependencyGraphResolver, entityGraphReconstructor, entityStateManager, fieldUtils, metadataUtils, queryFacade, queryUtils, relationManager, schemaUtils, storeDriver, structuralEntityValidator, transactionalServer, updateCache] = await DI.db()
            .get(AIR_DB, CASCADE_GRAPH_VERIFIER, DEPENDENCY_GRAPH_RESOLVER, ENTITY_GRAPH_RECONSTRUCTOR, ENTITY_STATE_MANAGER, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, RELATION_MANAGER, SCHEMA_UTILS, STORE_DRIVER, STRUCTURAL_ENTITY_VALIDATOR, TRANS_SERVER, UPDATE_CACHE);
        this.airDb = airDb;
        this.cascadeGraphVerifier = cascadeGraphVerifier;
        this.dependencyGraphResolver = dependencyGraphResolver;
        this.entityGraphReconstructor = entityGraphReconstructor;
        this.entityStateManager = entityStateManager;
        this.fieldUtils = fieldUtils;
        this.metadataUtils = metadataUtils;
        this.queryFacade = queryFacade;
        this.queryUtils = queryUtils;
        this.relationManager = relationManager;
        this.schemaUtils = schemaUtils;
        this.storeDriver = storeDriver;
        this.structuralEntityValidator = structuralEntityValidator;
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