import { AIRPORT_DATABASE } from '@airport/air-traffic-control'
import { SEQUENCE_DAO } from '@airport/airport-code/dist/esm/index'
import {
    ApplicationColumnDao,
    ApplicationDao,
    ApplicationEntityDao,
    ApplicationPropertyColumnDao,
    ApplicationPropertyDao,
    ApplicationReferenceDao,
    ApplicationRelationColumnDao,
    ApplicationRelationDao,
    ApplicationVersionDao,
    DomainDao
} from '@airport/airspace/dist/app/bundle'
import { lib } from '@airport/direction-indicator'
import {
    DB_APPLICATION_UTILS,
    SEQUENCE_GENERATOR
} from '@airport/ground-control'
import { QUERY_OBJECT_INITIALIZER } from '@airport/takeoff'
import {
    DOMAIN_RETRIEVER,
    STORE_DRIVER,
    TERMINAL_STORE,
    TRANSACTION_MANAGER
} from '@airport/terminal-map'
import { ApplicationInitializer } from './ApplicationInitializer'
import { ISchemaBuilder } from './builder/ISchemaBuilder'
import { SqlSchemaBuilder } from './builder/SqlSchemaBuilder'
import { ApplicationChecker, IApplicationChecker } from './checker/ApplicationChecker'
import { ApplicationLocator, IApplicationLocator } from './locator/ApplicationLocator'
import { ApplicationComposer, IApplicationComposer } from './recorder/ApplicationComposer'
import { ApplicationRecorder, IApplicationRecorder } from './recorder/ApplicationRecorder'

const landing = lib('landing')

export const ABSTRACT_APPLICATION_INITIALIZER = landing.token<ApplicationInitializer>({
    class: ApplicationInitializer,
    interface: 'class ApplicationInitializer',
    token: 'ABSTRACT_APPLICATION_INITIALIZER'
})
export const APPLICATION_BUILDER = landing.token<ISchemaBuilder>({
    class: null,
    interface: 'ISchemaBuilder',
    token: 'APPLICATION_BUILDER'
})
export const APPLICATION_CHECKER = landing.token<IApplicationChecker>({
    class: ApplicationChecker,
    interface: 'IApplicationChecker',
    token: 'APPLICATION_CHECKER'
})
export const APPLICATION_COMPOSER = landing.token<IApplicationComposer>({
    class: ApplicationComposer,
    interface: 'IApplicationComposer',
    token: 'APPLICATION_COMPOSER'
})
export const APPLICATION_LOCATOR = landing.token<IApplicationLocator>({
    class: ApplicationLocator,
    interface: 'IApplicationLocator',
    token: 'APPLICATION_LOCATOR'
})
export const APPLICATION_RECORDER = landing.token<IApplicationRecorder>({
    class: ApplicationRecorder,
    interface: 'IApplicationRecorder',
    token: 'APPLICATION_RECORDER'
})

export const SQL_SCHEMA_BUILDER = landing.token<ISchemaBuilder>({
    class: SqlSchemaBuilder,
    interface: 'class SqlSchemaBuilder',
    token: 'SQL_SCHEMA_BUILDER'
})

ABSTRACT_APPLICATION_INITIALIZER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationBuilder: APPLICATION_BUILDER,
    applicationChecker: APPLICATION_CHECKER,
    applicationComposer: APPLICATION_COMPOSER,
    applicationDao: ApplicationDao,
    applicationLocator: APPLICATION_LOCATOR,
    applicationRecorder: APPLICATION_RECORDER,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    queryObjectInitializer: QUERY_OBJECT_INITIALIZER,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TERMINAL_STORE,
    transactionManager: TRANSACTION_MANAGER
})

APPLICATION_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})

APPLICATION_CHECKER.setDependencies({
    applicationDao: ApplicationDao,
    dbApplicationUtils: DB_APPLICATION_UTILS
})

APPLICATION_COMPOSER.setDependencies({
    applicationLocator: APPLICATION_LOCATOR,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    domainRetriever: DOMAIN_RETRIEVER,
    terminalStore: TERMINAL_STORE
})

APPLICATION_LOCATOR.setDependencies({
    dbApplicationUtils: DB_APPLICATION_UTILS,
})

APPLICATION_RECORDER.setDependencies({
    applicationColumnDao: ApplicationColumnDao,
    applicationDao: ApplicationDao,
    applicationEntityDao: ApplicationEntityDao,
    applicationPropertyColumnDao: ApplicationPropertyColumnDao,
    applicationPropertyDao: ApplicationPropertyDao,
    applicationRecorder: ApplicationRecorder,
    applicationReferenceDao: ApplicationReferenceDao,
    applicationRelationColumnDao: ApplicationRelationColumnDao,
    applicationRelationDao: ApplicationRelationDao,
    applicationVersionDao: ApplicationVersionDao,
    domainDao: DomainDao,
    transactionManager: TRANSACTION_MANAGER
})

SQL_SCHEMA_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    sequenceDao: SEQUENCE_DAO,
    storeDriver: STORE_DRIVER
})
