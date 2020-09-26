import {SEQUENCE_GENERATOR} from '@airport/check-in'
import {DI}                 from '@airport/di'
import {
	STORE_DRIVER,
	StoreType
}                           from '@airport/ground-control'

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
			const webSqlDriverFile = await import('../../db/websql/src/WebSqlDriver')
			StoreDriver            = webSqlDriverFile.WebSqlDriver
			break
		case StoreType.SQLJS:
			const sqlJsDriverFile = await import('../../db/sqljs/src/SqlJsDriver')
			StoreDriver           = sqlJsDriverFile.SqlJsDriver
			break
		default:
			throw new Error(`Unsupported StoreType: ${storeType}`)
	}

	const sqLiteSequenceGeneratorFile = await import('../../db/sqlite/src/SqLiteSequenceGenerator')
	const SqLiteSequenceGenerator = sqLiteSequenceGeneratorFile.SqLiteSequenceGenerator

	DI.set(STORE_DRIVER, StoreDriver)
	DI.set(SEQUENCE_GENERATOR, SqLiteSequenceGenerator)
}
