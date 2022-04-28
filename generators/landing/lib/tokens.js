import { AIRPORT_DATABASE } from '@airport/air-control';
import { SEQUENCE_DAO } from '@airport/airport-code';
import { lib } from '@airport/direction-indicator';
import { DOMAIN_RETRIEVER, STORE_DRIVER, TERMINAL_STORE } from '@airport/terminal-map';
import { ApplicationInitializer } from './ApplicationInitializer';
import { SqlApplicationBuilder } from './builder/SqlApplicationBuilder';
const landing = lib('landing');
export const ABSTRACT_APPLICATION_INITIALIZER = landing.token({
    class: ApplicationInitializer,
    interface: 'class ApplicationInitializer',
    token: 'ABSTRACT_APPLICATION_INITIALIZER'
});
export const APPLICATION_BUILDER = landing.token('APPLICATION_BUILDER');
export const APPLICATION_CHECKER = landing.token('APPLICATION_CHECKER');
export const APPLICATION_COMPOSER = landing.token('APPLICATION_COMPOSER');
export const APPLICATION_LOCATOR = landing.token('APPLICATION_LOCATOR');
export const APPLICATION_RECORDER = landing.token('APPLICATION_RECORDER');
export const SQL_APPLICATION_BUILDER = landing.token({
    class: SqlApplicationBuilder,
    interface: 'class SqlApplicationBuilder',
    token: 'SQL_APPLICATION_BUILDER'
});
ABSTRACT_APPLICATION_INITIALIZER.setDependencies({
    terminalStore: TERMINAL_STORE
});
APPLICATION_COMPOSER.setDependencies({
    domainRetriever: DOMAIN_RETRIEVER
});
SQL_APPLICATION_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    sequenceDao: SEQUENCE_DAO,
    storeDriver: STORE_DRIVER
});
//# sourceMappingURL=tokens.js.map