import type {
    IRootTransaction,
    PortableQuery,
    RecordHistory_LocalId
} from "@airport/ground-control";
import type {
    IActor
} from "@airport/holding-pattern/dist/app/bundle";
import { IOperationContext } from "../processing/OperationContext";
import { ITransaction } from "../transaction/ITransaction";

export type Record_LocalId = number;

export interface IInsertManager {

    insertValues(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
        rootTransaction: IRootTransaction,
        context: IOperationContext,
        ensureGeneratedValues?: boolean
    ): Promise<number>;

    insertValuesGetLocalIds(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
        rootTransaction: IRootTransaction,
        context: IOperationContext,
    ): Promise<RecordHistory_LocalId[] | Record_LocalId[][]>;

}