import {IAirportDatabase, IUtils, Utils} from "../../../../apis/air-control/lib/index";
import {IStoreDriver, StoreType}         from "../../../../apis/ground-control/lib/index";
import {WebSqlDriver}                    from "./webSql/WebSqlDriver";
import {SqlJsDriver}                     from "./sqlJs/SqlJsDriver";
import { ActiveQueries }                 from "./ActiveQueries";

declare function require( moduleName: string ): any;

/**
 * Created by Papa on 5/28/2016.
 */

export function getStoreDriver(
	airportDb: IAirportDatabase,
	utils: IUtils,
	queries: ActiveQueries,
	storeType: StoreType,
): IStoreDriver {
	switch (storeType) {
		case StoreType.SQLITE_CORDOVA:
			let WebSqlDriverClass: typeof WebSqlDriver = require("./webSql/WebSqlDriver").WebSqlDriver;
			return new WebSqlDriverClass(airportDb, utils, queries);
		case StoreType.SQLJS:
			let SqlJsDriverClass: typeof SqlJsDriver = require("./sqlJs/SqlJsDriver").SqlJsDriver;
			return new SqlJsDriverClass(airportDb, utils, queries);
		default:
			throw `Unsupported StoreType: ${storeType}`;
	}
}
