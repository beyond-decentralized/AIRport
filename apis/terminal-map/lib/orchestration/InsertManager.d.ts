import type { PortableQuery } from "@airport/ground-control";
import type { IActor, RecordHistoryId } from "@airport/holding-pattern";
import { IOperationContext } from "../processing/OperationContext";
import { ITransaction } from "../transaction/ITransaction";
export declare type RecordId = number;
export interface IInsertManager {
    insertValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, context: IOperationContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, context: IOperationContext): Promise<RecordHistoryId[] | RecordId[][]>;
    addRepository(actor: IActor, context: IOperationContext): Promise<number>;
}
//# sourceMappingURL=InsertManager.d.ts.map