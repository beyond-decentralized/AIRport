import { system } from '@airport/di'
import { IAirportDatabasePopulator } from './AirportDatabasePopulator'
import { IDdlObjectLinker } from './DdlObjectLinker'
import { IDdlObjectRetriever } from './DdlObjectRetriever'
import { IQueryEntityClassCreator } from './QueryEntityClassCreator'
import { IQueryObjectInitializer } from './QueryObjectInitializer'

const takeoff = system('airport').lib('takeoff')

export const AIRPORT_DATABASE_POPULATOR = takeoff.token<IAirportDatabasePopulator>('AIRPORT_DATABASE_POPULATOR')
export const DDL_OBJECT_LINKER = takeoff.token<IDdlObjectLinker>('DDL_OBJECT_LINKER')
export const DDL_OBJECT_RETRIEVER = takeoff.token<IDdlObjectRetriever>('DDL_OBJECT_RETRIEVER')
export const QUERY_ENTITY_CLASS_CREATOR = takeoff.token<IQueryEntityClassCreator>('QUERY_ENTITY_CLASS_CREATOR')
export const QUERY_OBJECT_INITIALIZER = takeoff.token<IQueryObjectInitializer>('QUERY_OBJECT_INITIALIZER')

