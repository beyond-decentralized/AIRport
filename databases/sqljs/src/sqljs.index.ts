import { IOC } from '@airport/direction-indicator';
import { injectSequenceGenerator } from '@airport/sequence';
import { DatabaseManager } from '@airport/terminal/dist/esm/terminal.index';

export * from './SqlJsDriver'
export * from './SqlJsQueryAdaptor'
export * from './SqlJsTransaction'
export * from './sqljs.injection'

injectSequenceGenerator()

export async function startDb(
	domainName: string
) {
	const dbManager = await IOC.get(DatabaseManager);
	await dbManager.initWithDb(domainName, {});
}

export async function closeDb() {

}
