import { IUtils } from "@airport/air-control";
import { BaseApplicationDao, IBaseApplicationDao } from "../generated/baseDaos";
export interface IApplicationDao extends IBaseApplicationDao {
}
export declare class ApplicationDao extends BaseApplicationDao implements IApplicationDao {
    constructor(utils: IUtils);
}
