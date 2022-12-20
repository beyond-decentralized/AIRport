import { AIRPORT_DATABASE, ApplicationUtils, QApplicationBuilderUtils, RelationManager } from '@airport/air-traffic-control'
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
import { TerminalStore } from '@airport/terminal-map'
import { AirportDatabasePopulator } from './AirportDatabasePopulator'
import { DdlObjectLinker } from './DdlObjectLinker'
import { DdlObjectRetriever } from './DdlObjectRetriever'
import { QueryEntityClassCreator } from './QueryEntityClassCreator'
import { QueryObjectInitializer } from './QueryObjectInitializer'

const takeoff = lib('takeoff')

takeoff.register(
    AirportDatabasePopulator, DdlObjectLinker, DdlObjectRetriever,
    QueryEntityClassCreator, QueryObjectInitializer
)

takeoff.setDependencies(DdlObjectLinker, {
    terminalStore: TerminalStore
})

takeoff.setDependencies(DdlObjectRetriever, {
    applicationColumnDao: ApplicationColumnDao,
    applicationDao: ApplicationDao,
    applicationEntityDao: ApplicationEntityDao,
    applicationPropertyColumnDao: ApplicationPropertyColumnDao,
    applicationPropertyDao: ApplicationPropertyDao,
    applicationReferenceDao: ApplicationReferenceDao,
    applicationRelationColumnDao: ApplicationRelationColumnDao,
    applicationRelationDao: ApplicationRelationDao,
    applicationVersionDao: ApplicationVersionDao,
    domainDao: DomainDao
})

takeoff.setDependencies(QueryEntityClassCreator, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: ApplicationUtils,
    qApplicationBuilderUtils: QApplicationBuilderUtils,
    relationManager: RelationManager,
})

takeoff.setDependencies(QueryObjectInitializer, {
    ddlObjectLinker: DdlObjectLinker,
    ddlObjectRetriever: DdlObjectRetriever,
    queryEntityClassCreator: QueryEntityClassCreator,
    terminalStore: TerminalStore
})
