import { IContext } from "@airport/direction-indicator";
import { DbEntity } from "../application/DbEntity";

export interface IAbstractQueryContext
    extends IContext {
    checkIfProcessed: boolean
    dbEntity?: DbEntity
}
