import { IAirportDatabase, IUtils } from "@airport/air-control";
import { IStoreDriver, StoreType } from "@airport/ground-control";
import { ActiveQueries } from "./ActiveQueries";
/**
 * Created by Papa on 5/28/2016.
 */
export declare function getStoreDriver(airportDb: IAirportDatabase, utils: IUtils, queries: ActiveQueries, storeType: StoreType): IStoreDriver;
