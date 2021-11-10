import { IAirportDatabase, IFieldUtils, IQMetadataUtils, IQueryFacade, IQueryUtils, IRelationManager, ISchemaUtils } from "@airport/air-control";
import { IContext } from "@airport/di";
import { DbEntity, IEntityStateManager, IStoreDriver } from "@airport/ground-control";
import { IDeleteManager } from "../orchestration/DeleteManager";
import { IInsertManager } from "../orchestration/InsertManager";
import { IQueryManager } from "../orchestration/QueryManager";
import { IUpdateManager } from "../orchestration/UpdateManager";
import { ITransactionalServer } from "../transaction/ITransactionalServer";
import { ICascadeGraphVerifier } from "./CascadeGraphVerifier";
import { IDependencyGraphResolver } from "./DependencyGraphResolver";
import { IEntityGraphReconstructor } from "./EntityGraphReconstructor";
import { IOperationManager } from "./OperationManager";
import { IStructuralEntityValidator } from "./StructuralEntityValidator";
export interface IOperationContext extends IContext {
    checkIfProcessed: boolean;
    dbEntity: DbEntity;
    entityCascadeGraph: any;
    internal: boolean;
    ioc: IIocOperationContext;
}
export interface IQueryOperationContext extends IOperationContext {
    repositorySource?: string;
    repositoryUuid?: string;
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
//# sourceMappingURL=OperationContext.d.ts.map