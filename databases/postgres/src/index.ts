import { IOC } from '@airport/direction-indicator';
import { STORE_DRIVER } from '@airport/terminal-map';
import { DATABASE_MANAGER } from '@airport/terminal';

export * from './PostgreQueryAdaptor'
export * from './PostgreSchemaBuilder'
export * from './PostgreSqlDriver'
export * from './PostgreTransaction'
export * from './tokens';

export async function startDb(
    domainName: string,
    connectionString: string,
    // database: string,
    // port: string = '26257'
) {
    const storeDriver = await IOC.get(STORE_DRIVER)
    await storeDriver.initialize(connectionString, {})
    const dbManager = await IOC.get(DATABASE_MANAGER);
    await dbManager.initWithDb(domainName, {});
}

export async function closeDb() {

}
