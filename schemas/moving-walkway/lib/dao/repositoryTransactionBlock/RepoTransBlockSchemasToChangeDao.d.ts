import { IUtils } from "@airport/air-control";
import { BaseRepoTransBlockSchemasToChangeDao, IBaseRepoTransBlockSchemasToChangeDao } from "../../generated/generated";
export interface IRepoTransBlockSchemasToChangeDao extends IBaseRepoTransBlockSchemasToChangeDao {
}
export declare class RepoTransBlockSchemasToChangeDao extends BaseRepoTransBlockSchemasToChangeDao {
    constructor(utils: IUtils);
}
