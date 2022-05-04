import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { IOC } from '@airport/direction-indicator';
import { DATABASE_MANAGER } from '@airport/terminal';

export * from './MySqlDriver';
export * from './MySqlQueryAdaptor';
export * from './MySqlSchemaBuilder';
export * from './MySqlTransaction';
export * from './tokens';

export async function startDb(
	domainName: string
) {
	await IOC.get(AIRPORT_DATABASE);
	const dbManager = await IOC.get(DATABASE_MANAGER);
	await dbManager.initWithDb(domainName, {});
}

export async function closeDb() {

}
