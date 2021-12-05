import { IAirportDatabase, IFieldUtils, IQMetadataUtils, IQueryFacade, IQueryUtils, IRelationManager, IApplicationUtils, IEntityUtils } from '@airport/air-control';
import { IEntityStateManager, IOperationContextLoader, IStoreDriver, ITransactionalConnector } from '@airport/ground-control';
import { ICascadeGraphVerifier, IDeleteManager, IDependencyGraphResolver, IEntityGraphReconstructor, IInsertManager, IIocOperationContext, IOperationContext, IOperationManager, IQueryManager, IRepositoryManager, IStructuralEntityValidator, ITransactionalServer, IUpdateManager } from '@airport/terminal-map';
export declare class IocOperationContext implements IIocOperationContext {
    airDb: IAirportDatabase;
    cascadeGraphVerifier: ICascadeGraphVerifier;
    deleteManager: IDeleteManager;
    dependencyGraphResolver: IDependencyGraphResolver;
    entityGraphReconstructor: IEntityGraphReconstructor;
    entityStateManager: IEntityStateManager;
    entityUtils: IEntityUtils;
    fieldUtils: IFieldUtils;
    insertManager: IInsertManager;
    metadataUtils: IQMetadataUtils;
    operationManager: IOperationManager;
    queryFacade: IQueryFacade;
    queryManager: IQueryManager;
    queryUtils: IQueryUtils;
    relationManager: IRelationManager;
    repositoryManager: IRepositoryManager;
    applicationUtils: IApplicationUtils;
    storeDriver: IStoreDriver;
    structuralEntityValidator: IStructuralEntityValidator;
    transactionalConnector: ITransactionalConnector;
    transactionalServer: ITransactionalServer;
    updateManager: IUpdateManager;
    static init(context: IIocOperationContext): Promise<void>;
    static initSync(context: IIocOperationContext): void;
    static ensure(context: IIocOperationContext): Promise<void>;
    static ensureSync(context: IIocOperationContext): void;
}
export declare class OperationContextLoader implements IOperationContextLoader {
    ensure(context: IOperationContext): Promise<void>;
    ensureSync(context: IOperationContext): void;
}
//# sourceMappingURL=OperationContext.d.ts.map