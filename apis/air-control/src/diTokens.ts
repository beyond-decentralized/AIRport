import {diToken}          from '@airport/di'
import {IAirportDatabase} from './lingo/AirportDatabase'
import {IUpdateCache}     from './lingo/core/data/UpdateCache'
import {
	IDatabaseFacade,
	IQueryFacade
}                         from './lingo/core/repository/DatabaseFacade'
import {ILookup}          from './lingo/query/api/Lookup'
import {IEntityUtils}     from './lingo/utils/EntityUtils'
import {IFieldUtils}      from './lingo/utils/FieldUtils'
import {IQMetadataUtils}  from './lingo/utils/QMetadataUtils'
import {IQueryUtils}      from './lingo/utils/QueryUtils'
import {ISchemaUtils}     from './lingo/utils/SchemaUtils'

export const AIR_DB           = diToken<IAirportDatabase>()
export const DB_FACADE        = diToken<IDatabaseFacade>()
export const LOOKUP           = diToken<ILookup>()
export const ENTITY_UTILS     = diToken<IEntityUtils>()
export const FIELD_UTILS      = diToken<IFieldUtils>()
export const Q_METADATA_UTILS = diToken<IQMetadataUtils>()
export const QUERY_FACADE     = diToken<IQueryFacade>()
export const QUERY_UTILS      = diToken<IQueryUtils>()
export const SCHEMA_UTILS     = diToken<ISchemaUtils>()
export const UPDATE_CACHE     = diToken<IUpdateCache>()

