import type { IActor, IAirEntity, IRootTransaction, ISaveResult } from "@airport/ground-control";
import type { ITransaction } from "../transaction/ITransaction";
import type { IOperationContext } from "./IOperationContext";

export interface IOperationManager {

    performSave<E extends IAirEntity, T = E | E[]>(
        entities: T,
        actor: IActor,
        transaction: ITransaction,
        rootTransaction: IRootTransaction,
        context: IOperationContext,
    ): Promise<ISaveResult>

}