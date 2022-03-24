import { AIRPORT_DATABASE, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, RELATION_MANAGER, APPLICATION_UTILS, ENTITY_UTILS, } from '@airport/air-control';
import { DI } from '@airport/di';
import { ENTITY_STATE_MANAGER, OPERATION_CONTEXT_LOADER, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { STORE_DRIVER, TRANSACTIONAL_SERVER } from '@airport/terminal-map';
import { CASCADE_GRAPH_VERIFIER, DELETE_MANAGER, DEPENDENCY_GRAPH_RESOLVER, ENTITY_GRAPH_RECONSTRUCTOR, INSERT_MANAGER, OPERATION_MANAGER, QUERY_MANAGER, REPOSITORY_MANAGER, STRUCTURAL_ENTITY_VALIDATOR, UPDATE_MANAGER, } from '../tokens';
export class IocOperationContext {
    static async init(context) {
        const [airDb, cascadeGraphVerifier, deleteManager, dependencyGraphResolver, entityGraphReconstructor, entityStateManager, entityUtils, fieldUtils, insertManager, metadataUtils, operationManager, queryFacade, queryManager, queryUtils, relationManager, repositoryManager, applicationUtils, storeDriver, structuralEntityValidator, transactionalConnector, transactionalServer, updateManager] = await DI.db()
            .get(AIRPORT_DATABASE, CASCADE_GRAPH_VERIFIER, DELETE_MANAGER, DEPENDENCY_GRAPH_RESOLVER, ENTITY_GRAPH_RECONSTRUCTOR, ENTITY_STATE_MANAGER, ENTITY_UTILS, FIELD_UTILS, INSERT_MANAGER, Q_METADATA_UTILS, OPERATION_MANAGER, QUERY_FACADE, QUERY_MANAGER, QUERY_UTILS, RELATION_MANAGER, REPOSITORY_MANAGER, APPLICATION_UTILS, STORE_DRIVER, STRUCTURAL_ENTITY_VALIDATOR, TRANSACTIONAL_CONNECTOR, TRANSACTIONAL_SERVER, UPDATE_MANAGER);
        context.airDb = airDb;
        context.cascadeGraphVerifier = cascadeGraphVerifier;
        context.deleteManager = deleteManager;
        context.dependencyGraphResolver = dependencyGraphResolver;
        context.entityGraphReconstructor = entityGraphReconstructor;
        context.entityStateManager = entityStateManager;
        context.entityUtils = entityUtils;
        context.fieldUtils = fieldUtils;
        context.insertManager = insertManager;
        context.metadataUtils = metadataUtils;
        context.operationManager = operationManager;
        context.queryFacade = queryFacade;
        context.queryManager = queryManager;
        context.queryUtils = queryUtils;
        context.relationManager = relationManager;
        context.repositoryManager = repositoryManager;
        context.applicationUtils = applicationUtils;
        context.storeDriver = storeDriver;
        context.structuralEntityValidator = structuralEntityValidator;
        context.transactionalConnector = transactionalConnector;
        context.transactionalServer = transactionalServer;
        context.updateManager = updateManager;
    }
    static initSync(context) {
        const [airDb, cascadeGraphVerifier, deleteManager, dependencyGraphResolver, entityGraphReconstructor, entityStateManager, entityUtils, fieldUtils, insertManager, metadataUtils, operationManager, queryFacade, queryManager, queryUtils, relationManager, applicationUtils, storeDriver, structuralEntityValidator, transactionalConnector, transactionalServer, updateManager] = DI.db()
            .getSync(AIRPORT_DATABASE, CASCADE_GRAPH_VERIFIER, DELETE_MANAGER, DEPENDENCY_GRAPH_RESOLVER, ENTITY_GRAPH_RECONSTRUCTOR, ENTITY_STATE_MANAGER, ENTITY_UTILS, FIELD_UTILS, INSERT_MANAGER, OPERATION_MANAGER, Q_METADATA_UTILS, QUERY_FACADE, QUERY_MANAGER, QUERY_UTILS, RELATION_MANAGER, APPLICATION_UTILS, STORE_DRIVER, STRUCTURAL_ENTITY_VALIDATOR, TRANSACTIONAL_CONNECTOR, TRANSACTIONAL_SERVER, UPDATE_MANAGER);
        context.airDb = airDb;
        context.cascadeGraphVerifier = cascadeGraphVerifier;
        context.deleteManager = deleteManager;
        context.dependencyGraphResolver = dependencyGraphResolver;
        context.entityGraphReconstructor = entityGraphReconstructor;
        context.entityStateManager = entityStateManager;
        context.entityUtils = entityUtils;
        context.fieldUtils = fieldUtils;
        context.insertManager = insertManager;
        context.metadataUtils = metadataUtils;
        context.operationManager = operationManager;
        context.queryFacade = queryFacade;
        context.queryManager = queryManager;
        context.queryUtils = queryUtils;
        context.relationManager = relationManager;
        context.applicationUtils = applicationUtils;
        context.storeDriver = storeDriver;
        context.structuralEntityValidator = structuralEntityValidator;
        context.transactionalConnector = transactionalConnector;
        context.transactionalServer = transactionalServer;
        context.updateManager = updateManager;
    }
    static async ensure(context) {
        if (!context.airDb || !context.cascadeGraphVerifier || !context.deleteManager
            || !context.dependencyGraphResolver || !context.entityGraphReconstructor
            || !context.entityStateManager || !context.entityUtils || !context.fieldUtils
            || !context.insertManager || !context.metadataUtils || !context.operationManager
            || !context.queryFacade || !context.queryManager || !context.queryUtils
            || !context.relationManager || !context.applicationUtils || !context.storeDriver
            || !context.structuralEntityValidator || !context.transactionalConnector
            || !context.transactionalServer || !context.updateManager) {
            await IocOperationContext.init(context);
        }
    }
    static ensureSync(context) {
        if (!context.airDb || !context.cascadeGraphVerifier || !context.deleteManager
            || !context.dependencyGraphResolver || !context.entityGraphReconstructor
            || !context.entityStateManager || !context.entityUtils || !context.fieldUtils
            || !context.insertManager || !context.metadataUtils || !context.operationManager
            || !context.queryFacade || !context.queryManager || !context.queryUtils
            || !context.relationManager || !context.applicationUtils || !context.storeDriver
            || !context.structuralEntityValidator || !context.transactionalConnector
            || !context.transactionalServer || !context.updateManager) {
            IocOperationContext.initSync(context);
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
            await IocOperationContext.ensure(context.ioc);
        }
    }
    ensureSync(context) {
        if (!context.ioc) {
            context.ioc = new IocOperationContext();
            IocOperationContext.initSync(context.ioc);
        }
        else {
            IocOperationContext.ensureSync(context.ioc);
        }
    }
}
DI.set(OPERATION_CONTEXT_LOADER, OperationContextLoader);
//# sourceMappingURL=OperationContext.js.map