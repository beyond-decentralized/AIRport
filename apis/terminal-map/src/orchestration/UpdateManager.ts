import { PortableQuery } from "@airport/ground-control";
import {
    IActor,
    IRecordHistory
} from "@airport/holding-pattern";
import { IOperationContext } from "../processing/OperationContext";
import { ITransaction } from "../transaction/ITransaction";

export interface IUpdateManager {

    updateValues(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
        ctx: IOperationContext
    ): Promise<number>;

}

export interface RecordHistoryMap {
    [repositoryId: number]: {
        [actorId: number]: {
            [actorRecordId: number]: IRecordHistory
        }
    };
}
