import { IAirportDatabase, IFieldUtils, IQMetadataUtils, IQueryFacade, IQueryUtils, IRelationManager, ISchemaUtils } from '@airport/air-control';
import { IContext } from '@airport/di';
import { DbEntity, IEntityStateManager, IOperationContextLoader, IStoreDriver } from '@airport/ground-control';
import { ITransactionalServer } from '@airport/terminal-map';
import { IDeleteManager } from '../orchestration/DeleteManager';
import { IInsertManager } from '../orchestration/InsertManager';
import { IQueryManager } from '../orchestration/QueryManager';
import { IUpdateManager } from '../orchestration/UpdateManager';
import { ICascadeGraphVerifier } from './CascadeGraphVerifier';
import { IDependencyGraphResolver } from './DependencyGraphResolver';
import { IEntityGraphReconstructor } from './EntityGraphReconstructor';
import { IOperationManager } from './OperationManager';
import { IStructuralEntityValidator } from './StructuralEntityValidator';
export interface IOperationContext<E, EntityCascadeGraph> extends IContext {
    entityCascadeGraph: EntityCascadeGraph;
    checkIfProcessed: boolean;
    dbEntity: DbEntity;
    ioc: IIocOperationContext;
}
export interface IIocOperationContext {
    airDb: IAirportDatabase;
    cascadeGraphVerifier: ICascadeGraphVerifier;
    deleteManager: IDeleteManager;
    dependencyGraphResolver: IDependencyGraphResolver;
    entityGraphReconstructor: IEntityGraphReconstructor;
    entityStateManager: IEntityStateManager;
    fieldUtils: IFieldUtils;
    insertManager: IInsertManager;
    metadataUtils: IQMetadataUtils;
    operationManager: IOperationManager;
    queryFacade: IQueryFacade;
    queryManager: IQueryManager;
    queryUtils: IQueryUtils;
    relationManager: IRelationManager;
    schemaUtils: ISchemaUtils;
    storeDriver: IStoreDriver;
    structuralEntityValidator: IStructuralEntityValidator;
    transactionalServer: ITransactionalServer;
    updateManager: IUpdateManager;
}
export declare class IocOperationContext implements IIocOperationContext {
    airDb: IAirportDatabase;
    cascadeGraphVerifier: ICascadeGraphVerifier;
    deleteManager: IDeleteManager;
    dependencyGraphResolver: IDependencyGraphResolver;
    entityGraphReconstructor: IEntityGraphReconstructor;
    entityStateManager: IEntityStateManager;
    fieldUtils: IFieldUtils;
    insertManager: IInsertManager;
    metadataUtils: IQMetadataUtils;
    operationManager: IOperationManager;
    queryFacade: IQueryFacade;
    queryManager: IQueryManager;
    queryUtils: IQueryUtils;
    relationManager: IRelationManager;
    schemaUtils: ISchemaUtils;
    storeDriver: IStoreDriver;
    structuralEntityValidator: IStructuralEntityValidator;
    transactionalServer: ITransactionalServer;
    updateManager: IUpdateManager;
    static init(context: IIocOperationContext): Promise<void>;
    static initSync(context: IIocOperationContext): void;
    static ensure(context: IIocOperationContext): Promise<void>;
    static ensureSync(context: IIocOperationContext): void;
}
export declare class OperationContextLoader implements IOperationContextLoader {
    ensure(context: IOperationContext<any, any>): Promise<void>;
    ensureSync(context: IOperationContext<any, any>): void;
}
//# sourceMappingURL=OperationContext.d.ts.map