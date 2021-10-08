import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { injectSequenceGenerator } from '@airport/sequence';
import { DATABASE_MANAGER } from '@airport/terminal';
export * from './SqlJsDriver';
export * from './SqlJsQueryAdaptor';
export * from './SqlJsTransaction';
injectSequenceGenerator();
export async function startDb(domainName) {
    await DI.db().get(AIRPORT_DATABASE);
    const dbManager = await DI.db().get(DATABASE_MANAGER);
    await dbManager.initWithDb(domainName, {});
}
export async function closeDb() {
}
//# sourceMappingURL=index.js.map