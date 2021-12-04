import { lib } from '@airport/di'
import { IRepositoryLoader } from '.'
import { IRelationManager } from './impl/core/entity/RelationManager'
import { IQueryContextLoader } from './impl/query/QueryContext'
import { IAirportDatabase } from './lingo/AirportDatabase'
import {
	IDatabaseFacade,
	IQueryFacade
} from './lingo/core/repository/DatabaseFacade'
import { IUpdateCacheManager } from './lingo/core/UpdateCacheManager'
import { ILookup } from './lingo/query/api/Lookup'
import { IEntityUtils } from './lingo/utils/EntityUtils'
import { IFieldUtils } from './lingo/utils/FieldUtils'
import { IQMetadataUtils } from './lingo/utils/QMetadataUtils'
import { IQueryUtils } from './lingo/utils/QueryUtils'
import { IApplicationUtils } from './lingo/utils/ApplicationUtils'

const airControl = lib('air-control')

export const AIRPORT_DATABASE = airControl.token<IAirportDatabase>('AIRPORT_DATABASE')
export const DATABASE_FACADE = airControl.token<IDatabaseFacade>('DATABASE_FACADE')
export const LOOKUP = airControl.token<ILookup>('LOOKUP')
export const ENTITY_UTILS = airControl.token<IEntityUtils>('ENTITY_UTILS')
export const FIELD_UTILS = airControl.token<IFieldUtils>('FIELD_UTILS')
export const Q_METADATA_UTILS = airControl.token<IQMetadataUtils>('Q_METADATA_UTILS')
export const QUERY_CONTEXT_LOADER = airControl.token<IQueryContextLoader>('QUERY_CONTEXT_LOADER')
export const QUERY_FACADE = airControl.token<IQueryFacade>('QUERY_FACADE')
export const QUERY_UTILS = airControl.token<IQueryUtils>('QUERY_UTILS')
export const RELATION_MANAGER = airControl.token<IRelationManager>('RELATION_MANAGER')
export const REPOSITORY_LOADER = airControl.token<IRepositoryLoader>('REPOSITORY_LOADER')
export const APPLICATION_UTILS = airControl.token<IApplicationUtils>('APPLICATION_UTILS')
export const UPDATE_CACHE_MANAGER = airControl.token<IUpdateCacheManager>('UPDATE_CACHE_MANAGER')

