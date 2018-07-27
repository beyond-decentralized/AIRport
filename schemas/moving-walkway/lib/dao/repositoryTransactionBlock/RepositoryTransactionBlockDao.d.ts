import { IUtils } from "@airport/air-control";
import { TmRepositoryTransactionBlockId } from "@airport/arrivals-n-departures";
import { MissingRecordId, MissingRecordStatus } from "../../ddl/ddl";
import { IRepositoryTransactionBlockDmo } from "../../dmo/repositoryTransactionBlock/RepositoryTransactionBlockDmo";
import { BaseRepositoryTransactionBlockDao, IBaseRepositoryTransactionBlockDao, IRepositoryTransactionBlock } from "../../generated/generated";
export interface IRepositoryTransactionBlockDao extends IBaseRepositoryTransactionBlockDao {
    updateFromResponseStage(): Promise<number>;
    findWithMissingRecordIdsAndNoMissingRecordsWithStatus(missingRecordIds: MissingRecordId[], status: MissingRecordStatus): Promise<IRepositoryTransactionBlock[]>;
    clearContentsWhereIdsIn(repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[]): Promise<void>;
}
export declare class RepositoryTransactionBlockDao extends BaseRepositoryTransactionBlockDao implements IRepositoryTransactionBlockDao {
    private dmo;
    constructor(utils: IUtils, dmo: IRepositoryTransactionBlockDmo);
    updateFromResponseStage(): Promise<number>;
    findWithMissingRecordIdsAndNoMissingRecordsWithStatus(missingRecordIds: MissingRecordId[], status: MissingRecordStatus): Promise<IRepositoryTransactionBlock[]>;
    clearContentsWhereIdsIn(repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[]): Promise<void>;
}
