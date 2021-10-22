import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { STORE_DRIVER } from '@airport/ground-control';
import { DATABASE_MANAGER } from '@airport/terminal';

export * from './DDLManager'
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
    const storeDriver = await DI.db().get(STORE_DRIVER)
    await storeDriver.initialize(connectionString, {})
    await DI.db().get(AIRPORT_DATABASE);
    const dbManager = await DI.db().get(DATABASE_MANAGER);
    await dbManager.initWithDb(domainName, {});
}

export async function closeDb() {

}
