import { AIRPORT_DATABASE } from '@airport/air-control'
import { APPLICATION_COLUMN_DAO, APPLICATION_DAO, APPLICATION_ENTITY_DAO, APPLICATION_PROPERTY_COLUMN_DAO, APPLICATION_PROPERTY_DAO, APPLICATION_REFERENCE_DAO, APPLICATION_RELATION_COLUMN_DAO, APPLICATION_RELATION_DAO, APPLICATION_VERSION_DAO, DOMAIN_DAO } from '@airport/airspace'
import { lib } from '@airport/direction-indicator'
import { IQueryEntityClassCreator, IQueryObjectInitializer, TERMINAL_STORE } from '@airport/terminal-map'
import { IAirportDatabasePopulator } from './AirportDatabasePopulator'
import { IDdlObjectLinker } from './DdlObjectLinker'
import { IDdlObjectRetriever } from './DdlObjectRetriever'

const takeoff = lib('takeoff')

export const AIRPORT_DATABASE_POPULATOR = takeoff.token<IAirportDatabasePopulator>('AIRPORT_DATABASE_POPULATOR')
export const DDL_OBJECT_LINKER = takeoff.token<IDdlObjectLinker>('DDL_OBJECT_LINKER')
export const DDL_OBJECT_RETRIEVER = takeoff.token<IDdlObjectRetriever>('DDL_OBJECT_RETRIEVER')
export const QUERY_ENTITY_CLASS_CREATOR = takeoff.token<IQueryEntityClassCreator>('QUERY_ENTITY_CLASS_CREATOR')
export const QUERY_OBJECT_INITIALIZER = takeoff.token<IQueryObjectInitializer>('QUERY_OBJECT_INITIALIZER')

DDL_OBJECT_LINKER.setDependencies({
    terminalStore: TERMINAL_STORE
})

DDL_OBJECT_RETRIEVER.setDependencies({
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

QUERY_ENTITY_CLASS_CREATOR.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})

QUERY_OBJECT_INITIALIZER.setDependencies({
    terminalStore: TERMINAL_STORE
})


