import { IContext } from "@airport/di";
import type { PortableQuery } from "@airport/ground-control";
import type { IActor, RecordHistoryId } from "@airport/holding-pattern";
import { ITransaction } from "../transaction/ITransaction";
export declare type RecordId = number;
export interface IInsertManager {
    insertValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, context: IContext): Promise<RecordHistoryId[] | RecordId[][]>;
    addRepository(actor: IActor, context: IContext): Promise<number>;
}
//# sourceMappingURL=InsertManager.d.ts.map