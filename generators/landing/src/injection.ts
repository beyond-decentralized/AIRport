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
    DbApplicationUtils,
    SEQUENCE_GENERATOR
} from '@airport/ground-control'
import { QueryObjectInitializer } from '@airport/takeoff'
import {
    DOMAIN_RETRIEVER,
    STORE_DRIVER,
    TerminalStore,
    TRANSACTION_MANAGER
} from '@airport/terminal-map'
import { ApplicationInitializer } from './ApplicationInitializer'
import { ISchemaBuilder } from './builder/ISchemaBuilder'
import { SqlSchemaBuilder } from './builder/SqlSchemaBuilder'
import { ApplicationChecker } from './checker/ApplicationChecker'
import { ApplicationLocator } from './locator/ApplicationLocator'
import { ApplicationComposer } from './recorder/ApplicationComposer'
import { ApplicationRecorder } from './recorder/ApplicationRecorder'

const landing = lib('landing')

const tokens = landing.register(
    'ApplicationBuilder',
    ApplicationInitializer as any, ApplicationChecker, ApplicationComposer,
    ApplicationLocator, ApplicationRecorder, SqlSchemaBuilder as any,
)

export const APPLICATION_BUILDER = tokens.ApplicationBuilder
// Needed as a token in @airport/web-tower (platforms/web-tower)
export const APPLICATION_LOCATOR = tokens.ApplicationLocator


landing.setDependencies(ApplicationInitializer as any, {
    airportDatabase: AIRPORT_DATABASE,
    applicationBuilder: APPLICATION_BUILDER,
    applicationChecker: ApplicationChecker,
    applicationComposer: ApplicationComposer,
    applicationDao: ApplicationDao,
    applicationLocator: ApplicationLocator,
    applicationRecorder: ApplicationRecorder,
    dbApplicationUtils: DbApplicationUtils,
    queryObjectInitializer: QueryObjectInitializer,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER
})

APPLICATION_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})

landing.setDependencies(ApplicationChecker, {
    applicationDao: ApplicationDao,
    dbApplicationUtils: DbApplicationUtils
})

landing.setDependencies(ApplicationComposer, {
    applicationLocator: ApplicationLocator,
    dbApplicationUtils: DbApplicationUtils,
    domainRetriever: DOMAIN_RETRIEVER,
    terminalStore: TerminalStore
})

landing.setDependencies(ApplicationLocator, {
    dbApplicationUtils: DbApplicationUtils,
})

landing.setDependencies(ApplicationRecorder, {
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

landing.setDependencies(SqlSchemaBuilder as any, {
    airportDatabase: AIRPORT_DATABASE,
    dbApplicationUtils: DbApplicationUtils,
    sequenceDao: SEQUENCE_DAO,
    storeDriver: STORE_DRIVER
})
