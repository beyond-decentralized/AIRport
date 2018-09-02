import {Token}                     from 'typedi'
import {IAirportDatabasePopulator} from './AirportDatabasePopulator'
import {IDdlObjectLinker}          from './DdlObjectLinker'
import {IDdlObjectRetriever}       from './DdlObjectRetriever'
import {IQueryEntityClassCreator}  from './QueryEntityClassCreator'
import {IQueryObjectInitializer}   from './QueryObjectInitializer'

export const AirportDatabasePopulatorToken = new Token<IAirportDatabasePopulator>()
export const DdlObjectLinkerToken = new Token<IDdlObjectLinker>()
export const DdlObjectRetrieverToken = new Token<IDdlObjectRetriever>()
export const QueryEntityClassCreatorToken = new Token<IQueryEntityClassCreator>()
export const QueryObjectInitializerToken = new Token<IQueryObjectInitializer>()

