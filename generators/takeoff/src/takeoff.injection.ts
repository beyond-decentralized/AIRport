import { AIRPORT_DATABASE, QApplicationBuilderUtils } from '@airport/air-traffic-control'
import { SequenceDao } from '@airport/airport-code'
import {
    DdlColumnDao,
    DdlApplicationDao,
    DdlEntityDao,
    DdlPropertyColumnDao,
    DdlPropertyDao,
    DdlApplicationReferenceDao,
    DdlRelationColumnDao,
    DdlRelationDao,
    DdlApplicationVersionDao,
    DdlDomainDao,
    ApplicationApiClassDao,
    ApplicationApiOperationDao,
    ApplicationApiParameterDao,
    ApplicationApiReturnTypeDao
} from '@airport/airspace/dist/app/bundle'
import { lib } from '@airport/direction-indicator'
import { ApplicationReferenceUtils, APPLICATION_UTILS, AppTrackerUtils, DatastructureUtils, ApplicationNameUtils, SEQUENCE_GENERATOR } from '@airport/ground-control'
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
    ddlApplicationDao: DdlApplicationDao,
    datastructureUtils: DatastructureUtils,
    applicationNameUtils: ApplicationNameUtils,
    transactionManager: TRANSACTION_MANAGER
})

takeoff.setDependencies(ApplicationComposer, {
    applicationLocator: ApplicationLocator,
    datastructureUtils: DatastructureUtils,
    applicationNameUtils: ApplicationNameUtils,
    domainRetriever: DOMAIN_RETRIEVER,
    terminalStore: TerminalStore
})

takeoff.setDependencies(ApplicationInitializer as any, {
    airportDatabase: AIRPORT_DATABASE,
    applicationChecker: ApplicationChecker,
    applicationComposer: ApplicationComposer,
    ddlApplicationDao: DdlApplicationDao,
    applicationLocator: ApplicationLocator,
    applicationRecorder: ApplicationRecorder,
    appTrackerUtils: AppTrackerUtils,
    applicationNameUtils: ApplicationNameUtils,
    queryObjectInitializer: QueryObjectInitializer,
    schemaBuilder: SCHEMA_BUILDER,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER
})

takeoff.setDependencies(ApplicationLocator, {
    applicationNameUtils: ApplicationNameUtils,
})

takeoff.setDependencies(ApplicationRecorder, {
    applicationApiClassDao: ApplicationApiClassDao,
    applicationApiOperationDao: ApplicationApiOperationDao,
    applicationApiParameterDao: ApplicationApiParameterDao,
    applicationApiReturnTypeDao: ApplicationApiReturnTypeDao,
    dbColumnDao: DdlColumnDao,
    ddlApplicationDao: DdlApplicationDao,
    dbEntityDao: DdlEntityDao,
    dbPropertyColumnDao: DdlPropertyColumnDao,
    dbPropertyDao: DdlPropertyDao,
    applicationRecorder: ApplicationRecorder,
    ddlApplicationReferenceDao: DdlApplicationReferenceDao,
    dbRelationColumnDao: DdlRelationColumnDao,
    dbRelationDao: DdlRelationDao,
    ddlApplicationVersionDao: DdlApplicationVersionDao,
    ddlDomainDao: DdlDomainDao,
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
    dbColumnDao: DdlColumnDao,
    ddlApplicationDao: DdlApplicationDao,
    dbEntityDao: DdlEntityDao,
    dbPropertyColumnDao: DdlPropertyColumnDao,
    dbPropertyDao: DdlPropertyDao,
    ddlApplicationReferenceDao: DdlApplicationReferenceDao,
    dbRelationColumnDao: DdlRelationColumnDao,
    dbRelationDao: DdlRelationDao,
    ddlApplicationVersionDao: DdlApplicationVersionDao,
    ddlDomainDao: DdlDomainDao
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
    applicationNameUtils: ApplicationNameUtils,
    storeDriver: STORE_DRIVER
})
