import { IUtils } from "@airport/air-control";
import { BaseApplicationPackageDao, IBaseApplicationDao } from "../generated/baseDaos";
export interface IApplicationPackageDao extends IBaseApplicationDao {
}
export declare class ApplicationPackageDao extends BaseApplicationPackageDao implements IApplicationPackageDao {
    constructor(utils: IUtils);
}
