import { AIRPORT_DATABASE } from '@airport/air-control';
import { lib } from '@airport/direction-indicator';
import { DOMAIN_RETRIEVER, STORE_DRIVER } from '@airport/terminal-map';
import { SqlApplicationBuilder } from './builder/SqlApplicationBuilder';
const landing = lib('landing');
export const APPLICATION_BUILDER = landing.token('APPLICATION_BUILDER');
export const APPLICATION_CHECKER = landing.token('APPLICATION_CHECKER');
export const APPLICATION_COMPOSER = landing.token('APPLICATION_COMPOSER');
export const APPLICATION_LOCATOR = landing.token('APPLICATION_LOCATOR');
export const APPLICATION_RECORDER = landing.token('APPLICATION_RECORDER');
export const SQL_APPLICATION_BUILDER = landing.token({
    class: SqlApplicationBuilder,
    interface: 'IApplicationBuilder',
    token: 'SQL_APPLICATION_BUILDER'
});
APPLICATION_COMPOSER.setDependencies({
    domainRetriever: DOMAIN_RETRIEVER
});
SQL_APPLICATION_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    storeDriver: STORE_DRIVER
});
//# sourceMappingURL=tokens.js.map