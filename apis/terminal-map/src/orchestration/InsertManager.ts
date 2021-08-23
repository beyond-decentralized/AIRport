import { IContext } from "@airport/di";
import {
    DistributionStrategy,
    PlatformType,
    PortableQuery
} from "@airport/ground-control";
import {
    IActor,
    RecordHistoryId
} from "@airport/holding-pattern";
import { ITransaction } from "../transaction/ITransaction";

export type RecordId = number;

export interface IInsertManager {

    insertValues(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
        context: IContext,
        ensureGeneratedValues?: boolean
    ): Promise<number>;

    insertValuesGetIds(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
        context: IContext,
    ): Promise<RecordHistoryId[] | RecordId[][]>;

    addRepository(
        name: string,
        url: string,
        platform: PlatformType,
        platformConfig: string,
        distributionStrategy: DistributionStrategy,
    ): Promise<number>;

}