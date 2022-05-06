import { IContext } from "@airport/direction-indicator";
import type {
    IRootTransaction,
    PortableQuery
} from "@airport/ground-control";
import type {
    IActor,
    RecordHistoryId
} from "@airport/holding-pattern-runtime";
import { IOperationContext } from "../processing/OperationContext";
import { ITransaction } from "../transaction/ITransaction";

export type RecordId = number;

export interface IInsertManager {

    insertValues(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
		rootTransaction: IRootTransaction,
        context: IOperationContext,
        ensureGeneratedValues?: boolean
    ): Promise<number>;

    insertValuesGetIds(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
		rootTransaction: IRootTransaction,
        context: IOperationContext,
    ): Promise<RecordHistoryId[] | RecordId[][]>;

}