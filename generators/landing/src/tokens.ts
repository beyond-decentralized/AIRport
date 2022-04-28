import { AIRPORT_DATABASE } from '@airport/air-control'
import { SEQUENCE_DAO } from '@airport/airport-code'
import { APPLICATION_COLUMN_DAO, APPLICATION_DAO, APPLICATION_ENTITY_DAO, APPLICATION_PROPERTY_COLUMN_DAO, APPLICATION_PROPERTY_DAO, APPLICATION_REFERENCE_DAO, APPLICATION_RELATION_COLUMN_DAO, APPLICATION_RELATION_DAO, APPLICATION_VERSION_DAO, DOMAIN_DAO } from '@airport/airspace'
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
    interface: 'class SqlApplicationBuilder',
    token: 'SQL_APPLICATION_BUILDER'
})

ABSTRACT_APPLICATION_INITIALIZER.setDependencies({
    applicationDao: APPLICATION_DAO,
    terminalStore: TERMINAL_STORE
})

APPLICATION_CHECKER.setDependencies({
    applicationDao: APPLICATION_DAO
})

APPLICATION_COMPOSER.setDependencies({
    domainRetriever: DOMAIN_RETRIEVER
})

APPLICATION_RECORDER.setDependencies({
    applicationColumnDao: APPLICATION_COLUMN_DAO,
    applicationDao: APPLICATION_DAO,
    applicationEntityDao: APPLICATION_ENTITY_DAO,
    applicationPropertyColumnDao: APPLICATION_PROPERTY_COLUMN_DAO,
    applicationPropertyDao: APPLICATION_PROPERTY_DAO,
    applicationReferenceDao: APPLICATION_REFERENCE_DAO,
    applicationRelationColumnDao: APPLICATION_RELATION_COLUMN_DAO,
    applicationRelationDao: APPLICATION_RELATION_DAO,
    applicationVersionDao: APPLICATION_VERSION_DAO,
    domainDao: DOMAIN_DAO
})

SQL_APPLICATION_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    sequenceDao: SEQUENCE_DAO,
    storeDriver: STORE_DRIVER
})
