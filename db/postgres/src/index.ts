import { AIRPORT_DATABASE } from '@airport/air-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { STORE_DRIVER } from '@airport/terminal-map';
import { DATABASE_MANAGER } from '@airport/terminal';

export * from './PostgreQueryAdaptor'
export * from './PostgreSchemaBuilder'
export * from './PostgreSqlDriver'
export * from './PostgreSqlSchemaBuilder'
export * from './PostgreTransaction'

export async function startDb(
    domainName: string,
    connectionString: string,
    // database: string,
    // port: string = '26257'
) {
    const storeDriver = await DEPENDENCY_INJECTION.db().get(STORE_DRIVER)
    await storeDriver.initialize(connectionString, {})
    await DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE);
    const dbManager = await DEPENDENCY_INJECTION.db().get(DATABASE_MANAGER);
    await dbManager.initWithDb(domainName, {});
}

export async function closeDb() {

}
