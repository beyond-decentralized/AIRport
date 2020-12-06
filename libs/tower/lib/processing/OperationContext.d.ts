import { IAirportDatabase, IEntityStateManager, IFieldUtils, IQMetadataUtils, IQueryFacade, IQueryUtils, IRelationManager, ISchemaUtils, IUpdateCache } from '@airport/air-control';
import { IContext } from '@airport/di';
import { DbEntity, IStoreDriver } from '@airport/ground-control';
import { ITransactionalServer } from '../core/data/ITransactionalServer';
import { ICascadeGraphVerifier } from './CascadeGraphVerifier';
import { IDependencyGraphResolver } from './DependencyGraphResolver';
import { IEntityGraphReconstructor } from './EntityGraphReconstructor';
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
    dependencyGraphResolver: IDependencyGraphResolver;
    entityGraphReconstructor: IEntityGraphReconstructor;
    entityStateManager: IEntityStateManager;
    fieldUtils: IFieldUtils;
    metadataUtils: IQMetadataUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    relationManager: IRelationManager;
    schemaUtils: ISchemaUtils;
    storeDriver: IStoreDriver;
    structuralEntityValidator: IStructuralEntityValidator;
    transactionalServer: ITransactionalServer;
    updateCache: IUpdateCache;
}
export declare class IocOperationContext implements IIocOperationContext {
    airDb: IAirportDatabase;
    cascadeGraphVerifier: ICascadeGraphVerifier;
    dependencyGraphResolver: IDependencyGraphResolver;
    entityGraphReconstructor: IEntityGraphReconstructor;
    entityStateManager: IEntityStateManager;
    fieldUtils: IFieldUtils;
    metadataUtils: IQMetadataUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    relationManager: IRelationManager;
    schemaUtils: ISchemaUtils;
    storeDriver: IStoreDriver;
    structuralEntityValidator: IStructuralEntityValidator;
    transactionalServer: ITransactionalServer;
    updateCache: IUpdateCache;
    static init(context: IIocOperationContext): Promise<void>;
    static ensure(context: IIocOperationContext): Promise<void>;
}
export interface IOperationContextLoader {
    ensure(context: IOperationContext<any, any>): Promise<void>;
}
export declare class OperationContextLoader implements IOperationContextLoader {
    ensure(context: IOperationContext<any, any>): Promise<void>;
}
//# sourceMappingURL=OperationContext.d.ts.map