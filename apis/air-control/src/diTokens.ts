import {diToken}             from '@airport/di'
import {IAirportDatabase}    from './lingo/AirportDatabase'
import {
	IDatabaseFacade,
	IQueryFacade
}                            from './lingo/core/repository/DatabaseFacade'
import {INonEntityFind}      from './lingo/query/api/NonEntityFind'
import {INonEntityFindOne}   from './lingo/query/api/NonEntityFindOne'
import {INonEntitySearch}    from './lingo/query/api/NonEntitySearch'
import {INonEntitySearchOne} from './lingo/query/api/NonEntitySearchOne'
import {IEntityUtils}        from './lingo/utils/EntityUtils'
import {IFieldUtils}         from './lingo/utils/FieldUtils'
import {IQMetadataUtils}     from './lingo/utils/QMetadataUtils'
import {IQueryUtils}         from './lingo/utils/QueryUtils'
import {ISchemaUtils}        from './lingo/utils/SchemaUtils'

export const AIR_DB                = diToken<IAirportDatabase>()
export const ENTITY_MANAGER        = diToken<IDatabaseFacade>()
export const ENTITY_UTILS          = diToken<IEntityUtils>()
export const FIELD_UTILS           = diToken<IFieldUtils>()
export const NON_ENTITY_FIND       = diToken<INonEntityFind>()
export const NON_ENTITY_FIND_ONE   = diToken<INonEntityFindOne>()
export const NON_ENTITY_SEARCH     = diToken<INonEntitySearch>()
export const NON_ENTITY_SEARCH_ONE = diToken<INonEntitySearchOne>()
export const Q_METADATA_UTILS      = diToken<IQMetadataUtils>()
export const QUERY_FACADE          = diToken<IQueryFacade>()
export const QUERY_UTILS           = diToken<IQueryUtils>()
export const SCHEMA_UTILS          = diToken<ISchemaUtils>()
