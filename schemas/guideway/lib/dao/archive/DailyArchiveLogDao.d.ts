import { IUtils } from "@airport/air-control";
import { IAirportDatabase } from "@airport/air-control/lib/lingo/AirportDatabase";
import { DailyArchiveLogValues } from "../../ddl/ddl";
import { BaseDailyArchiveLogDao } from "../../generated/generated";
export interface IDailyArchiveLogDao {
    insertValues(dailyArchiveLogValues: DailyArchiveLogValues[]): Promise<number>;
}
export declare class DailyArchiveLogDao extends BaseDailyArchiveLogDao implements IDailyArchiveLogDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    insertValues(values: DailyArchiveLogValues[]): Promise<number>;
}
