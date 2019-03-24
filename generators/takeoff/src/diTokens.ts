import {diToken}                   from '@airport/di'
import {IAirportDatabasePopulator} from './AirportDatabasePopulator'
import {IDdlObjectLinker}          from './DdlObjectLinker'
import {IDdlObjectRetriever}       from './DdlObjectRetriever'
import {IQueryEntityClassCreator}  from './QueryEntityClassCreator'
import {IQueryObjectInitializer}   from './QueryObjectInitializer'

export const AIR_DB_POPULATOR           = diToken<IAirportDatabasePopulator>()
export const DDL_OBJECT_LINKER          = diToken<IDdlObjectLinker>()
export const DDL_OBJECT_RETRIEVER       = diToken<IDdlObjectRetriever>()
export const QUERY_ENTITY_CLASS_CREATOR = diToken<IQueryEntityClassCreator>()
export const QUERY_OBJECT_INITIALIZER   = diToken<IQueryObjectInitializer>()

