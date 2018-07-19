import { IUtils } from "@airport/air-control";
import { IAirportDatabase } from "@airport/air-control/lib/lingo/AirportDatabase";
import { RepositoryTransactionHistoryBlockId, RepositoryTransactionHistoryId } from "@airport/holding-pattern";
import { BaseRepositoryTransactionHistoryUpdateStageDao, IBaseRepositoryTransactionHistoryUpdateStageDao } from "../..";
export declare type RepositoryTransactionHistoryUpdateStageValues = [RepositoryTransactionHistoryId, RepositoryTransactionHistoryBlockId];
export interface IRepositoryTransactionHistoryUpdateStageDao extends IBaseRepositoryTransactionHistoryUpdateStageDao {
    insertValues(values: RepositoryTransactionHistoryUpdateStageValues[]): Promise<number>;
    updateRepositoryTransactionHistory(): Promise<number>;
    delete(): Promise<number>;
}
export declare class RepositoryTransactionHistoryUpdateStageDao extends BaseRepositoryTransactionHistoryUpdateStageDao implements IRepositoryTransactionHistoryUpdateStageDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    insertValues(values: RepositoryTransactionHistoryUpdateStageValues[]): Promise<number>;
    updateRepositoryTransactionHistory(): Promise<number>;
    delete(): Promise<number>;
}
