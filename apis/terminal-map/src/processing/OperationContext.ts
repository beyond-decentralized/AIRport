import {
    IAirportDatabase,
    IFieldUtils,
    IQMetadataUtils,
    IQueryFacade,
    IQueryUtils,
    IRelationManager,
    IApplicationUtils,
    IEntityUtils
} from "@airport/air-control";
import { IContext } from "@airport/direction-indicator";
import {
    DbEntity,
    IEntityStateManager,
    ITransactionalConnector
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
import { IStoreDriver } from "../core/data/StoreDriver";

export interface IOperationContext
    extends IContext {
    actor: IActor
    checkIfProcessed: boolean
    dbEntity: DbEntity
    entityCascadeGraph: any
    internal: boolean
    isSaveOperation?: boolean
    // Only one new repository can be created at at time
    newRepository?: IRepository
}

export interface IQueryOperationContext
    extends IOperationContext {
}
