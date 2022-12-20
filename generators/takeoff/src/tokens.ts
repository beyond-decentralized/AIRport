import { AIRPORT_DATABASE, APPLICATION_UTILS, Q_APPLICATION_BUILDER_UTILS, RELATION_MANAGER } from '@airport/air-traffic-control'
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
import { IDdlObjectLinker, IQueryEntityClassCreator, IQueryObjectInitializer, TERMINAL_STORE } from '@airport/terminal-map'
import { AirportDatabasePopulator, IAirportDatabasePopulator } from './AirportDatabasePopulator'
import { DdlObjectLinker } from './DdlObjectLinker'
import { DdlObjectRetriever, IDdlObjectRetriever } from './DdlObjectRetriever'
import { QueryEntityClassCreator } from './QueryEntityClassCreator'
import { QueryObjectInitializer } from './QueryObjectInitializer'

const takeoff = lib('takeoff')

export const AIRPORT_DATABASE_POPULATOR = takeoff.token<IAirportDatabasePopulator>({
    class: AirportDatabasePopulator,
    interface: 'IAirportDatabasePopulator',
    token: 'AIRPORT_DATABASE_POPULATOR'
})
export const DDL_OBJECT_LINKER = takeoff.token<IDdlObjectLinker>({
    class: DdlObjectLinker,
    interface: 'IDdlObjectLinker',
    token: 'DDL_OBJECT_LINKER'
})
export const DDL_OBJECT_RETRIEVER = takeoff.token<IDdlObjectRetriever>({
    class: DdlObjectRetriever,
    interface: 'IDdlObjectRetriever',
    token: 'DDL_OBJECT_RETRIEVER'
})
export const QUERY_ENTITY_CLASS_CREATOR = takeoff.token<IQueryEntityClassCreator>({
    class: QueryEntityClassCreator,
    interface: 'IQueryEntityClassCreator',
    token: 'QUERY_ENTITY_CLASS_CREATOR'
})
export const QUERY_OBJECT_INITIALIZER = takeoff.token<IQueryObjectInitializer>({
    class: QueryObjectInitializer,
    interface: 'IQueryObjectInitializer',
    token: 'QUERY_OBJECT_INITIALIZER'
})

DDL_OBJECT_LINKER.setDependencies({
    terminalStore: TERMINAL_STORE
})

DDL_OBJECT_RETRIEVER.setDependencies({
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

QUERY_ENTITY_CLASS_CREATOR.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    qApplicationBuilderUtils: Q_APPLICATION_BUILDER_UTILS,
    relationManager: RELATION_MANAGER,
})

QUERY_OBJECT_INITIALIZER.setDependencies({
    ddlObjectLinker: DDL_OBJECT_LINKER,
    ddlObjectRetriever: DDL_OBJECT_RETRIEVER,
    queryEntityClassCreator: QUERY_ENTITY_CLASS_CREATOR,
    terminalStore: TERMINAL_STORE
})
