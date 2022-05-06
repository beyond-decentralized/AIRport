import { IContext } from "@airport/direction-indicator";
import {
    DbEntity
} from "@airport/ground-control";
import { IActor, IRepository } from "@airport/holding-pattern-runtime";

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
