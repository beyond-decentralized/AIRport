import { AIRPORT_DATABASE } from '@airport/air-control'
import { lib } from '@airport/direction-indicator'
import { IQueryEntityClassCreator, IQueryObjectInitializer } from '@airport/terminal-map'
import { IAirportDatabasePopulator } from './AirportDatabasePopulator'
import { IDdlObjectLinker } from './DdlObjectLinker'
import { IDdlObjectRetriever } from './DdlObjectRetriever'

const takeoff = lib('takeoff')

export const AIRPORT_DATABASE_POPULATOR = takeoff.token<IAirportDatabasePopulator>('AIRPORT_DATABASE_POPULATOR')
export const DDL_OBJECT_LINKER = takeoff.token<IDdlObjectLinker>('DDL_OBJECT_LINKER')
export const DDL_OBJECT_RETRIEVER = takeoff.token<IDdlObjectRetriever>('DDL_OBJECT_RETRIEVER')
export const QUERY_ENTITY_CLASS_CREATOR = takeoff.token<IQueryEntityClassCreator>('QUERY_ENTITY_CLASS_CREATOR')
export const QUERY_OBJECT_INITIALIZER = takeoff.token<IQueryObjectInitializer>('QUERY_OBJECT_INITIALIZER')

QUERY_ENTITY_CLASS_CREATOR.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})
