import { IContext } from "@airport/di";
import type {
    PortableQuery
} from "@airport/ground-control";
import type {
    IActor,
    RecordHistoryId
} from "@airport/holding-pattern";
import { IOperationContext } from "../processing/OperationContext";
import { ITransaction } from "../transaction/ITransaction";

export type RecordId = number;

export interface IInsertManager {

    insertValues(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
        context: IOperationContext,
        ensureGeneratedValues?: boolean
    ): Promise<number>;

    insertValuesGetIds(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
        context: IOperationContext,
    ): Promise<RecordHistoryId[] | RecordId[][]>;

    addRepository(
        // url: string,
        // platform: PlatformType,
        // platformConfig: string,
        // distributionStrategy: DistributionStrategy,
        actor: IActor,
        context: IOperationContext,
    ): Promise<number>;

}