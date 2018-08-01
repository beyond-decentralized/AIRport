import { IUtils } from "@airport/air-control";
import { BaseRepoTransBlockSchemaToChangeDao, IBaseRepoTransBlockSchemaToChangeDao } from "../../generated/generated";
export interface IRepoTransBlockSchemaToChangeDao extends IBaseRepoTransBlockSchemaToChangeDao {
}
export declare class RepoTransBlockSchemaToChangeDao extends BaseRepoTransBlockSchemaToChangeDao {
    constructor(utils: IUtils);
}
