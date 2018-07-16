import { IUtils } from "@airport/air-control";
import { MissingRecordId } from "../../ddl/ddl";
import { BaseMissingRecordRepoTransBlockDao, IBaseMissingRecordRepoTransBlockDao } from "../../generated/generated";
export interface IMissingRecordRepoTransBlockDao extends IBaseMissingRecordRepoTransBlockDao {
    deleteWhereMissingRecordIdsIn(missingRecordIds: MissingRecordId[]): Promise<void>;
}
export declare class MissingRecordRepoTransBlockDao extends BaseMissingRecordRepoTransBlockDao implements IMissingRecordRepoTransBlockDao {
    constructor(utils: IUtils);
    deleteWhereMissingRecordIdsIn(missingRecordIds: MissingRecordId[]): Promise<void>;
}
