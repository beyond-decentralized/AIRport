import type { IRootTransaction, ISaveResult } from "@airport/ground-control";
import type { IActor } from "@airport/holding-pattern-runtime";
import type { ITransaction } from "../transaction/ITransaction";
import type { IOperationContext } from "./OperationContext";

export interface IOperationManager {

    performSave<E>(
        entities: E | E[],
        actor: IActor,
        transaction: ITransaction,
        rootTransaction: IRootTransaction,
        context: IOperationContext,
    ): Promise<ISaveResult>

}