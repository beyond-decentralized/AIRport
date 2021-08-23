import { IOperationContext } from "./OperationContext";

export interface IEntityGraphReconstructor {

    restoreEntityGraph<T>(
        root: T[],
        context: IOperationContext
    ): T[]

}