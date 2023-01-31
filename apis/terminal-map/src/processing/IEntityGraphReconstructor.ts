import { IOperationContext } from "./IOperationContext";

export interface IEntityGraphReconstructor {

    restoreEntityGraph<T>(
        root: T[],
        context: IOperationContext
    ): T[]

}