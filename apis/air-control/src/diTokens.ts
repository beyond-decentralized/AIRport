import {diToken}          from '@airport/di'
import {IAirportDatabase} from './lingo/AirportDatabase'
import {IDatabaseFacade}  from './lingo/core/repository/DatabaseFacade'
import {IEntityUtils}     from './lingo/utils/EntityUtils'
import {IFieldUtils}      from './lingo/utils/FieldUtils'
import {IQMetadataUtils}  from './lingo/utils/QMetadataUtils'
import {IQueryUtils}      from './lingo/utils/QueryUtils'
import {ISchemaUtils}     from './lingo/utils/SchemaUtils'

export const AIR_DB           = diToken<IAirportDatabase>()
export const ENTITY_MANAGER   = diToken<IDatabaseFacade>()
export const ENTITY_UTILS     = diToken<IEntityUtils>()
export const FIELD_UTILS      = diToken<IFieldUtils>()
export const Q_METADATA_UTILS = diToken<IQMetadataUtils>()
export const QUERY_UTILS      = diToken<IQueryUtils>()
export const SCHEMA_UTILS     = diToken<ISchemaUtils>()
