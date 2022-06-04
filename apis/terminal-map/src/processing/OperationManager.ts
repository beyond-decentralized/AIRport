import type { IRootTransaction, ISaveResult } from "@airport/ground-control";
import type { IActor, IRepositoryEntity } from "@airport/holding-pattern";
import type { ITransaction } from "../transaction/ITransaction";
import type { IOperationContext } from "./OperationContext";

export interface IOperationManager {

    performSave<E extends IRepositoryEntity, T = E | E[]>(
        entities: T,
        actor: IActor,
        transaction: ITransaction,
        rootTransaction: IRootTransaction,
        context: IOperationContext,
    ): Promise<ISaveResult>

}