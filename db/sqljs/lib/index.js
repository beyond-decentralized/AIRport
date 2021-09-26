import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { DATABASE_MANAGER } from '@airport/terminal';
export * from './SqlJsDriver';
export * from './SqlJsQueryAdaptor';
export async function startDb(domainName) {
    await DI.db().get(AIRPORT_DATABASE);
    const dbManager = await DI.db().get(DATABASE_MANAGER);
    await dbManager.initWithDb(domainName, {}, ...schemas);
}
export async function closeDb() {
}
//# sourceMappingURL=index.js.map