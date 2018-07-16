import { IAirportDatabase } from "@airport/air-control/lib/lingo/AirportDatabase";
import { IUtils } from "@airport/air-control/lib/lingo/utils/Utils";
import { RepoTransBlockSyncOutcomeType, TmRepositoryTransactionBlockId } from "@airport/arrivals-n-departures";
import { SharingNodeId } from "../../ddl/ddl";
import { BaseSharingNodeRepoTransBlockStageDao, IBaseSharingNodeRepoTransBlockStageDao } from "../../generated/generated";
export declare type SharingNodeRepoTransBlockStageValues = [SharingNodeId, TmRepositoryTransactionBlockId, RepoTransBlockSyncOutcomeType];
export interface ISharingNodeRepoTransBlockStageDao extends IBaseSharingNodeRepoTransBlockStageDao {
    insertValues(values: SharingNodeRepoTransBlockStageValues[]): Promise<number>;
    delete(): Promise<number>;
}
export declare class SharingNodeRepoTransBlockStageDao extends BaseSharingNodeRepoTransBlockStageDao implements ISharingNodeRepoTransBlockStageDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    insertValues(values: SharingNodeRepoTransBlockStageValues[]): Promise<number>;
    delete(): Promise<number>;
}
