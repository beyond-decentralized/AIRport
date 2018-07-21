import { DbEntity, IAirportDatabase, IUtils } from "@airport/air-control";
export interface IIdGenerator {
    generateTransHistoryId(): number;
    generateRepoTransHistoryId(): number;
    generateOperationHistoryId(): number;
    generateRecordHistoryId(): number;
    generateHoldingPatternEntityId(holdingPatternEntityName: string): number;
    generateEntityId(dbEntity: DbEntity, entity: any): number;
    loadLatestIds(): Promise<void>;
}
/**
 * Created by Papa on 9/2/2016.
 */
export declare class IdGenerator implements IIdGenerator {
    private airportDb;
    private utils;
    private lastIds;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    generateTransHistoryId(): number;
    generateRepoTransHistoryId(): number;
    generateOperationHistoryId(): number;
    generateRecordHistoryId(): number;
    generateHoldingPatternEntityId(holdingPatternEntityName: string): number;
    generateEntityId(dbEntity: DbEntity, entity?: any): number;
    /**
     * Ids are tracked on per-Entity basis.  Id's are assigned optimistically can be
     * retroactively updated if sync conflicts arise.  At load time latest ids
     * are loaded into memory and then are maintained in memory for the uptime of the
     * db server.
     * @returns {Promise<void>}
     */
    loadLatestIds(): Promise<void>;
    private generateByHoldingPatternEntityName;
    private getMaxIdQueries;
}
