import { IUtils } from "@airport/air-control";
import { IAirportDatabase } from "@airport/air-control/lib/index";
import { BaseRepositoryDao } from "../../generated/baseDaos";
export interface IRepositoryDao {
}
export declare class RepositoryDao extends BaseRepositoryDao implements IRepositoryDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
}
