import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { JsonSchema } from '@airport/ground-control';
import { DATABASE_MANAGER } from '@airport/terminal';

export * from './SqlStorage'
export * from './WebSqlDriver'
export * from './WebSqlQueryAdaptor'
export * from './WebSqlTransaction'

export async function startDb(
	domainName: string,
	...schemas: JsonSchema[]
) {
	await DI.db().get(AIRPORT_DATABASE);
	const dbManager = await DI.db().get(DATABASE_MANAGER);
	await dbManager.initWithDb(domainName, {}, ...schemas);
}

export async function closeDb() {

}
