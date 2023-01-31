import { IContext } from "@airport/direction-indicator";
import {
    DbEntity, IActor
} from "@airport/ground-control";

export interface IOperationContext
    extends IContext {
    actor: IActor
    checkIfProcessed: boolean
    dbEntity: DbEntity
    entityCascadeGraph: any
    internal: boolean
    isSaveOperation?: boolean
}

export interface IQueryOperationContext
    extends IOperationContext {
}
