import {
	IAirportDatabase,
	IUtils
}                      from '@airport/air-control'
import {
	IStoreDriver,
	StoreType
}                      from '@airport/ground-control'
import {ActiveQueries} from './ActiveQueries'
import {SqlJsDriver}   from './sqlJs/SqlJsDriver'
import {WebSqlDriver}  from './webSql/WebSqlDriver'

declare function require(moduleName: string): any;

/**
 * Created by Papa on 5/28/2016.
 */

export function getStoreDriver(
	storeType: StoreType,
): IStoreDriver {
	switch (storeType) {
		case StoreType.SQLITE_CORDOVA:
			let WebSqlDriverClass: typeof WebSqlDriver = require('./webSql/WebSqlDriver').WebSqlDriver
			return new WebSqlDriverClass()
		case StoreType.SQLJS:
			let SqlJsDriverClass: typeof SqlJsDriver = require('./sqlJs/SqlJsDriver').SqlJsDriver
			return new SqlJsDriverClass()
		default:
			throw `Unsupported StoreType: ${storeType}`
	}
}
