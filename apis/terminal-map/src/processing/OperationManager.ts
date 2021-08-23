import { ISaveResult } from "@airport/ground-control";
import { IActor } from "@airport/holding-pattern";
import { ITransaction } from "../transaction/ITransaction";
import { IOperationContext } from "./OperationContext";

export interface IOperationManager {

    performSave<E>(
        entities: E | E[],
        actor: IActor,
        transaction: ITransaction,
        context: IOperationContext,
    ): Promise<ISaveResult>

}