import { AIRPORT_DATABASE, ENTITY_STATE_MANAGER, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, RELATION_MANAGER, SCHEMA_UTILS, UPDATE_CACHE, } from '@airport/air-control';
import { DI } from '@airport/di';
import { STORE_DRIVER } from '@airport/ground-control';
import { CASCADE_GRAPH_VERIFIER, DEPENDENCY_GRAPH_RESOLVER, ENTITY_GRAPH_RECONSTRUCTOR, OPERATION_CONTEXT_LOADER, STRUCTURAL_ENTITY_VALIDATOR, TRANSACTIONAL_SERVER } from '../tokens';
export class IocOperationContext {
    static async init(context) {
        const [airDb, cascadeGraphVerifier, dependencyGraphResolver, entityGraphReconstructor, entityStateManager, fieldUtils, metadataUtils, queryFacade, queryUtils, relationManager, schemaUtils, storeDriver, structuralEntityValidator, transactionalServer, updateCache] = await DI.db()
            .get(AIRPORT_DATABASE, CASCADE_GRAPH_VERIFIER, DEPENDENCY_GRAPH_RESOLVER, ENTITY_GRAPH_RECONSTRUCTOR, ENTITY_STATE_MANAGER, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, RELATION_MANAGER, SCHEMA_UTILS, STORE_DRIVER, STRUCTURAL_ENTITY_VALIDATOR, TRANSACTIONAL_SERVER, UPDATE_CACHE);
        context.airDb = airDb;
        context.cascadeGraphVerifier = cascadeGraphVerifier;
        context.dependencyGraphResolver = dependencyGraphResolver;
        context.entityGraphReconstructor = entityGraphReconstructor;
        context.entityStateManager = entityStateManager;
        context.fieldUtils = fieldUtils;
        context.metadataUtils = metadataUtils;
        context.queryFacade = queryFacade;
        context.queryUtils = queryUtils;
        context.relationManager = relationManager;
        context.schemaUtils = schemaUtils;
        context.storeDriver = storeDriver;
        context.structuralEntityValidator = structuralEntityValidator;
        context.transactionalServer = transactionalServer;
        context.updateCache = updateCache;
    }
    static async ensure(context) {
        if (!context.airDb || !context.cascadeGraphVerifier || !context.dependencyGraphResolver
            || !context.entityGraphReconstructor || !context.entityStateManager || !context.fieldUtils
            || !context.metadataUtils || !context.queryFacade || !context.queryUtils
            || !context.relationManager || !context.schemaUtils || !context.storeDriver
            || !context.structuralEntityValidator || !context.transactionalServer
            || !context.updateCache) {
            await IocOperationContext.init(context);
        }
    }
}
export class OperationContextLoader {
    async ensure(context) {
        if (!context.ioc) {
            context.ioc = new IocOperationContext();
            await IocOperationContext.init(context.ioc);
        }
        else {
            IocOperationContext.ensure(context.ioc);
        }
    }
}
DI.set(OPERATION_CONTEXT_LOADER, OperationContextLoader);
//# sourceMappingURL=OperationContext.js.map