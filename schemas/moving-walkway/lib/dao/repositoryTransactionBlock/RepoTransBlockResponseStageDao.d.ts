import { IUtils } from "@airport/air-control";
import { IAirportDatabase } from "@airport/air-control/lib/lingo/AirportDatabase";
import { RepoTransBlockSyncOutcomeType, TmRepositoryTransactionBlockId } from "@airport/arrivals-n-departures";
import { BaseRepoTransBlockResponseStageDao } from "../../generated/generated";
export declare type RepoTransBlockResponseStageValues = [TmRepositoryTransactionBlockId, RepoTransBlockSyncOutcomeType];
export interface IRepoTransBlockResponseStageDao {
    insertValues(values: RepoTransBlockResponseStageValues[]): Promise<number>;
    delete(): Promise<number>;
}
export declare class RepoTransBlockResponseStageDao extends BaseRepoTransBlockResponseStageDao implements IRepoTransBlockResponseStageDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, repoTransBlockResponseStageDao: any, utils: IUtils);
    insertValues(values: RepoTransBlockResponseStageValues[]): Promise<number>;
    delete(): Promise<number>;
}
