import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { IOC } from '@airport/direction-indicator';
import { injectSequenceGenerator } from '@airport/sequence';
import { DATABASE_MANAGER } from '@airport/terminal';

export * from './SqlJsDriver'
export * from './SqlJsQueryAdaptor'
export * from './SqlJsTransaction'
export * from './tokens'

injectSequenceGenerator()

export async function startDb(
	domainName: string
) {
	await IOC.get(AIRPORT_DATABASE);
	const dbManager = await IOC.get(DATABASE_MANAGER);
	await dbManager.initWithDb(domainName, {});
}

export async function closeDb() {

}
