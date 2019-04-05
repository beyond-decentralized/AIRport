import {DI} from '@airport/di'
import {
	STORE_DRIVER,
	StoreType
}           from '@airport/ground-control'

declare function require(moduleName: string): any;

/**
 * Created by Papa on 5/28/2016.
 */

export async function setStoreDriver(
	storeType: StoreType,
): Promise<void> {
	let StoreDriver
	switch (storeType) {
		case StoreType.SQLITE_CORDOVA:
			const webSqlDriverFile = await import('./webSql/WebSqlDriver')
			StoreDriver            = new webSqlDriverFile.WebSqlDriver
			break
		case StoreType.SQLJS:
			const sqlJsDriverFile = await import('./sqlJs/SqlJsDriver')
			StoreDriver           = new sqlJsDriverFile.SqlJsDriver
			break
		default:
			throw `Unsupported StoreType: ${storeType}`
	}


	DI.set(STORE_DRIVER, StoreDriver)
}
