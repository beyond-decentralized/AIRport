import { IOC } from '@airport/direction-indicator';
import { DATABASE_MANAGER } from '@airport/terminal';
export * from './MySqlDriver';
export * from './MySqlQueryAdaptor';
export * from './MySqlSchemaBuilder';
export * from './MySqlTransaction';
export * from './tokens';
export async function startDb(domainName) {
    const dbManager = await IOC.get(DATABASE_MANAGER);
    await dbManager.initWithDb(domainName, {});
}
export async function closeDb() {
}
//# sourceMappingURL=index.js.map