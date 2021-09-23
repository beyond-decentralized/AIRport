import type { ISaveResult } from "@airport/ground-control";
import type { IActor } from "@airport/holding-pattern";
import type { ITransaction } from "../transaction/ITransaction";
import type { IOperationContext } from "./OperationContext";

export interface IOperationManager {

    performSave<E>(
        entities: E | E[],
        actor: IActor,
        transaction: ITransaction,
        context: IOperationContext,
    ): Promise<ISaveResult>

}