import { IRootTransaction, PortableQuery } from "@airport/ground-control";
import { IActor, IRecordHistory } from "@airport/holding-pattern-runtime";
import { IOperationContext } from "../processing/OperationContext";
import { ITransaction } from "../transaction/ITransaction";
export interface IUpdateManager {
    updateValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, ctx: IOperationContext): Promise<number>;
}
export interface RecordHistoryMap {
    [repositoryId: number]: {
        [actorId: number]: {
            [actorRecordId: number]: IRecordHistory;
        };
    };
}
//# sourceMappingURL=UpdateManager.d.ts.map