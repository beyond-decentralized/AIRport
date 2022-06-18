import { IOC } from '@airport/direction-indicator';
import { injectSequenceGenerator } from '@airport/sequence';
import { DATABASE_MANAGER } from '@airport/terminal';
export * from './SqlJsDriver';
export * from './SqlJsQueryAdaptor';
export * from './SqlJsTransaction';
export * from './tokens';
injectSequenceGenerator();
export async function startDb(domainName) {
    const dbManager = await IOC.get(DATABASE_MANAGER);
    await dbManager.initWithDb(domainName, {});
}
export async function closeDb() {
}
//# sourceMappingURL=index.js.map