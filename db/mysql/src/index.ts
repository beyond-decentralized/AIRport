import { AIRPORT_DATABASE } from '@airport/air-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { DATABASE_MANAGER } from '@airport/terminal';

export * from './MySqlDriver';
export * from './MySqlQueryAdaptor';
export * from './MySqlSchemaBuilder';
export * from './MySqlTransaction';

export async function startDb(
	domainName: string
) {
	await DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE);
	const dbManager = await DEPENDENCY_INJECTION.db().get(DATABASE_MANAGER);
	await dbManager.initWithDb(domainName, {});
}

export async function closeDb() {

}
