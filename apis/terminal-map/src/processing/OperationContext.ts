import {
    IAirportDatabase,
    IFieldUtils,
    IQMetadataUtils,
    IQueryContext,
    IQueryFacade,
    IQueryUtils,
    IRelationManager,
    ISchemaUtils
} from "@airport/air-control";
import { IContext } from "@airport/di";
import {
    DbEntity,
    IEntityStateManager,
    IStoreDriver
} from "@airport/ground-control";
import { IActor, IRepository } from "@airport/holding-pattern";
import { IRepositoryManager } from "../repository/RepositoryManager";
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

export interface IOperationContext
    extends IContext {
    actor: IActor
    checkIfProcessed: boolean
    dbEntity: DbEntity
    entityCascadeGraph: any
    internal: boolean
    ioc: IIocOperationContext
    isSaveOperation?: boolean
    newRepository?: IRepository
}

export interface IQueryOperationContext
    extends IOperationContext {
    repositorySource?: string
    repositoryUuid?: string
}

export interface IIocOperationContext {

    airDb: IAirportDatabase
    cascadeGraphVerifier: ICascadeGraphVerifier
    deleteManager: IDeleteManager
    dependencyGraphResolver: IDependencyGraphResolver
    entityGraphReconstructor: IEntityGraphReconstructor
    entityStateManager: IEntityStateManager
    fieldUtils: IFieldUtils
    insertManager: IInsertManager
    metadataUtils: IQMetadataUtils
    operationManager: IOperationManager
    queryFacade: IQueryFacade
    queryManager: IQueryManager
    queryUtils: IQueryUtils
    relationManager: IRelationManager
    repositoryManager: IRepositoryManager
    schemaUtils: ISchemaUtils
    storeDriver: IStoreDriver
    structuralEntityValidator: IStructuralEntityValidator
    transactionalServer: ITransactionalServer
    updateManager: IUpdateManager

}