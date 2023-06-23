import { AIRPORT_DATABASE, QApplicationBuilderUtils } from '@airport/air-traffic-control'
import { SequenceDao } from '@airport/airport-code'
import {
    DbColumnDao,
    DbApplicationDao,
    DbEntityDao,
    DbPropertyColumnDao,
    DbPropertyDao,
    DbApplicationReferenceDao,
    DbRelationColumnDao,
    DbRelationDao,
    DbApplicationVersionDao,
    DbDomainDao,
    ApplicationApiClassDao,
    ApplicationApiOperationDao,
    ApplicationApiParameterDao,
    ApplicationApiReturnTypeDao
} from '@airport/airspace/dist/app/bundle'
import { lib } from '@airport/direction-indicator/dist/esm/direction-indicator.index'
import { ApplicationReferenceUtils, APPLICATION_UTILS, AppTrackerUtils, DatastructureUtils, DbApplicationUtils, SEQUENCE_GENERATOR } from '@airport/ground-control'
import { DOMAIN_RETRIEVER, STORE_DRIVER, TerminalStore, TRANSACTION_MANAGER } from '@airport/terminal-map'
import { AirportDatabasePopulator } from './AirportDatabasePopulator'
import { ApplicationInitializer } from './ApplicationInitializer'
import { SqlSchemaBuilder } from './builder/SqlSchemaBuilder'
import { ApplicationChecker } from './checker/ApplicationChecker'
import { DdlObjectLinker } from './DdlObjectLinker'
import { DdlObjectRetriever } from './DdlObjectRetriever'
import { ApplicationLocator } from './locator/ApplicationLocator'
import { QueryEntityClassCreator } from './QueryEntityClassCreator'
import { QueryObjectInitializer } from './QueryObjectInitializer'
import { ApplicationComposer } from './recorder/ApplicationComposer'
import { ApplicationRecorder } from './recorder/ApplicationRecorder'
import { QUERY_RELATION_MANAGER } from '@airport/tarmaq-query'

const takeoff = lib('takeoff')

const tokens = takeoff.register(
    AirportDatabasePopulator, 'ApplicationBuilder',
    ApplicationInitializer as any, ApplicationChecker,
    ApplicationComposer, ApplicationLocator, ApplicationRecorder,
    DdlObjectLinker, DdlObjectRetriever,
    QueryEntityClassCreator, QueryObjectInitializer,
    SqlSchemaBuilder as any,
)

export const SCHEMA_BUILDER = tokens.ApplicationBuilder
// Needed as a token in @airport/web-tower (platforms/web-tower)
export const APPLICATION_LOCATOR = tokens.ApplicationLocator

takeoff.setDependencies(ApplicationChecker, {
    dbApplicationDao: DbApplicationDao,
    datastructureUtils: DatastructureUtils,
    dbApplicationUtils: DbApplicationUtils,
    transactionManager: TRANSACTION_MANAGER
})

takeoff.setDependencies(ApplicationComposer, {
    applicationLocator: ApplicationLocator,
    datastructureUtils: DatastructureUtils,
    dbApplicationUtils: DbApplicationUtils,
    domainRetriever: DOMAIN_RETRIEVER,
    terminalStore: TerminalStore
})

takeoff.setDependencies(ApplicationInitializer as any, {
    airportDatabase: AIRPORT_DATABASE,
    applicationChecker: ApplicationChecker,
    applicationComposer: ApplicationComposer,
    dbApplicationDao: DbApplicationDao,
    applicationLocator: ApplicationLocator,
    applicationRecorder: ApplicationRecorder,
    appTrackerUtils: AppTrackerUtils,
    dbApplicationUtils: DbApplicationUtils,
    queryObjectInitializer: QueryObjectInitializer,
    schemaBuilder: SCHEMA_BUILDER,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER
})

takeoff.setDependencies(ApplicationLocator, {
    dbApplicationUtils: DbApplicationUtils,
})

takeoff.setDependencies(ApplicationRecorder, {
    applicationApiClassDao: ApplicationApiClassDao,
    applicationApiOperationDao: ApplicationApiOperationDao,
    applicationApiParameterDao: ApplicationApiParameterDao,
    applicationApiReturnTypeDao: ApplicationApiReturnTypeDao,
    dbColumnDao: DbColumnDao,
    dbApplicationDao: DbApplicationDao,
    dbEntityDao: DbEntityDao,
    dbPropertyColumnDao: DbPropertyColumnDao,
    dbPropertyDao: DbPropertyDao,
    applicationRecorder: ApplicationRecorder,
    dbApplicationReferenceDao: DbApplicationReferenceDao,
    dbRelationColumnDao: DbRelationColumnDao,
    dbRelationDao: DbRelationDao,
    dbApplicationVersionDao: DbApplicationVersionDao,
    dbDomainDao: DbDomainDao,
    transactionManager: TRANSACTION_MANAGER
})

takeoff.setDependencies(DdlObjectLinker, {
    terminalStore: TerminalStore
})

takeoff.setDependencies(DdlObjectRetriever, {
    applicationApiClassDao: ApplicationApiClassDao,
    // applicationApiOperationDao: ApplicationApiOperationDao,
    // applicationApiParameterDao: ApplicationApiParameterDao,
    // applicationApiReturnTypeDao: ApplicationApiReturnTypeDao,
    dbColumnDao: DbColumnDao,
    dbApplicationDao: DbApplicationDao,
    dbEntityDao: DbEntityDao,
    dbPropertyColumnDao: DbPropertyColumnDao,
    dbPropertyDao: DbPropertyDao,
    dbApplicationReferenceDao: DbApplicationReferenceDao,
    dbRelationColumnDao: DbRelationColumnDao,
    dbRelationDao: DbRelationDao,
    dbApplicationVersionDao: DbApplicationVersionDao,
    dbDomainDao: DbDomainDao
})

takeoff.setDependencies(QueryEntityClassCreator, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    qApplicationBuilderUtils: QApplicationBuilderUtils,
    queryRelationManager: QUERY_RELATION_MANAGER,
})

takeoff.setDependencies(QueryObjectInitializer, {
    ddlObjectLinker: DdlObjectLinker,
    ddlObjectRetriever: DdlObjectRetriever,
    queryEntityClassCreator: QueryEntityClassCreator,
    terminalStore: TerminalStore
})

SCHEMA_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})

takeoff.setDependencies(SqlSchemaBuilder as any, {
    airportDatabase: AIRPORT_DATABASE,
    applicationReferenceUtils: ApplicationReferenceUtils,
    dbApplicationUtils: DbApplicationUtils,
    sequenceDao: SequenceDao,
    storeDriver: STORE_DRIVER
})
