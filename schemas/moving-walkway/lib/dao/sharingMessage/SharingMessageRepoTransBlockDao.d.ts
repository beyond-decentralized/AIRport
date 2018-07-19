import { IUtils } from "@airport/air-control";
import { BaseSharingMessageRepoTransBlockDao, IBaseSharingMessageRepoTransBlockDao } from "../..";
export interface ISharingMessageRepoTransBlockDao extends IBaseSharingMessageRepoTransBlockDao {
}
export declare class SharingMessageRepoTransBlockDao extends BaseSharingMessageRepoTransBlockDao implements ISharingMessageRepoTransBlockDao {
    constructor(utils: IUtils);
}
