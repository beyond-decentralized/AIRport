import {system}                  from '@airport/di'
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

const airControl = system('airport').lib('air-control')

export const AIR_DB           = airControl.token<IAirportDatabase>()
export const DB_FACADE        = airControl.token<IDatabaseFacade>()
export const LOOKUP           = airControl.token<ILookup>()
export const ENTITY_UTILS     = airControl.token<IEntityUtils>()
export const FIELD_UTILS      = airControl.token<IFieldUtils>()
export const Q_METADATA_UTILS = airControl.token<IQMetadataUtils>()
export const QUERY_FACADE     = airControl.token<IQueryFacade>()
export const QUERY_UTILS      = airControl.token<IQueryUtils>()
export const SCHEMA_UTILS     = airControl.token<ISchemaUtils>()
export const UPDATE_CACHE     = airControl.token<IUpdateCache>()

