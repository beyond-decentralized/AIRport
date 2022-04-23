import { AIRPORT_DATABASE } from '@airport/air-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { injectSequenceGenerator } from '@airport/sequence';
import { DATABASE_MANAGER } from '@airport/terminal';

export * from './SqlJsDriver'
export * from './SqlJsQueryAdaptor'
export * from './SqlJsTransaction'

injectSequenceGenerator()

export async function startDb(
	domainName: string
) {
	await DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE);
	const dbManager = await DEPENDENCY_INJECTION.db().get(DATABASE_MANAGER);
	await dbManager.initWithDb(domainName, {});
}

export async function closeDb() {

}
