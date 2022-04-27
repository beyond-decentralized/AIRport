import { AIRPORT_DATABASE } from '@airport/air-control'
import { SEQUENCE_GENERATOR } from '@airport/check-in'
import { lib } from '@airport/direction-indicator'
import { DOMAIN_RETRIEVER, STORE_DRIVER, TERMINAL_STORE } from '@airport/terminal-map'
import { ApplicationInitializer } from './ApplicationInitializer'
import { IApplicationBuilder } from './builder/IApplicationBuilder'
import { SqlApplicationBuilder } from './builder/SqlApplicationBuilder'
import { IApplicationChecker } from './checker/ApplicationChecker'
import { IApplicationLocator } from './locator/ApplicationLocator'
import { IApplicationComposer } from './recorder/ApplicationComposer'
import { IApplicationRecorder } from './recorder/ApplicationRecorder'

const landing = lib('landing')

export const ABSTRACT_APPLICATION_INITIALIZER = landing.token<ApplicationInitializer>({
    class: ApplicationInitializer,
    interface: 'class ApplicationInitializer',
    token: 'ABSTRACT_APPLICATION_INITIALIZER'
})
export const APPLICATION_BUILDER = landing.token<IApplicationBuilder>('APPLICATION_BUILDER')
export const APPLICATION_CHECKER = landing.token<IApplicationChecker>('APPLICATION_CHECKER')
export const APPLICATION_COMPOSER = landing.token<IApplicationComposer>('APPLICATION_COMPOSER')
export const APPLICATION_LOCATOR = landing.token<IApplicationLocator>('APPLICATION_LOCATOR')
export const APPLICATION_RECORDER = landing.token<IApplicationRecorder>('APPLICATION_RECORDER')

export const SQL_APPLICATION_BUILDER = landing.token<IApplicationBuilder>({
    class: SqlApplicationBuilder,
    interface: 'IApplicationBuilder',
    token: 'SQL_APPLICATION_BUILDER'
})

ABSTRACT_APPLICATION_INITIALIZER.setDependencies({
    terminalStore: TERMINAL_STORE
})

APPLICATION_COMPOSER.setDependencies({
    domainRetriever: DOMAIN_RETRIEVER
})

SQL_APPLICATION_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    storeDriver: STORE_DRIVER
})
