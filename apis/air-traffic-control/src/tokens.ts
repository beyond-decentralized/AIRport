import { lib } from '@airport/direction-indicator'
import { IRepositoryLoader } from '.'
import { IRelationManager, RelationManager } from './impl/core/entity/RelationManager'
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
import { ENTITY_STATE_MANAGER, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control'
import { Lookup } from './impl/query/api/Lookup'
import { EntityUtils } from './impl/utils/EntityUtils'
import { QMetadataUtils } from './impl/utils/QMetadataUtils'
import { QueryUtils } from './impl/utils/QueryUtils'
import { ApplicationUtils } from './impl/utils/ApplicationUtils'
import { FieldUtils } from './impl/utils/FieldUtils'

const airTrafficControl = lib('air-traffic-control')

export const AIRPORT_DATABASE = airTrafficControl.token<IAirportDatabase>({
	class: null,
	interface: 'IAirportDatabase',
	token: 'AIRPORT_DATABASE'
})
export const APPLICATION_UTILS = airTrafficControl.token<IApplicationUtils>({
	class: ApplicationUtils,
	interface: 'IApplicationUtils',
	token: 'APPLICATION_UTILS'
})
export const DATABASE_FACADE = airTrafficControl.token<IDatabaseFacade>({
	class: null,
	interface: 'IDatabaseFacade',
	token: 'DATABASE_FACADE'
})
export const ENTITY_UTILS = airTrafficControl.token<IEntityUtils>({
	class: EntityUtils,
	interface: 'IEntityUtils',
	token: 'ENTITY_UTILS'
})
export const FIELD_UTILS = airTrafficControl.token<IFieldUtils>({
	class: FieldUtils,
	interface: 'IFieldUtils',
	token: 'FIELD_UTILS'
})
export const LOOKUP = airTrafficControl.token<ILookup>({
	class: Lookup,
	interface: 'ILookup',
	token: 'LOOKUP'
})
export const Q_METADATA_UTILS = airTrafficControl.token<IQMetadataUtils>({
	class: QMetadataUtils,
	interface: 'IQMetadataUtils',
	token: 'Q_METADATA_UTILS'
})

export const QUERY_FACADE = airTrafficControl.token<IQueryFacade>({
	class: null,
	interface: 'IQueryFacade',
	token: 'QUERY_FACADE'
})

export const QUERY_UTILS = airTrafficControl.token<IQueryUtils>({
	class: QueryUtils,
	interface: 'IQueryUtils',
	token: 'QUERY_UTILS'
})

export const RELATION_MANAGER = airTrafficControl.token<IRelationManager>({
	class: RelationManager,
	interface: 'IRelationManager',
	token: 'RELATION_MANAGER'
})
export const REPOSITORY_LOADER = airTrafficControl.token<IRepositoryLoader>({
	class: null,
	interface: 'IRepositoryLoader',
	token: 'REPOSITORY_LOADER'
})
export const UPDATE_CACHE_MANAGER = airTrafficControl.token<IUpdateCacheManager>({
	class: null,
	interface: 'IUpdateCacheManager',
	token: 'UPDATE_CACHE_MANAGER'
})

AIRPORT_DATABASE.setDependencies({
	databaseFacade: DATABASE_FACADE,
	updateCacheManager: UPDATE_CACHE_MANAGER
})
APPLICATION_UTILS.setDependencies({
	airportDatabase: AIRPORT_DATABASE,
	entityStateManager: ENTITY_STATE_MANAGER
})
DATABASE_FACADE.setDependencies({
	applicationUtils: APPLICATION_UTILS,
	entityStateManager: ENTITY_STATE_MANAGER,
	updateCacheManager: UPDATE_CACHE_MANAGER
})
FIELD_UTILS.setDependencies({
	relationManager: RELATION_MANAGER
})
LOOKUP.setDependencies({
	entityUtils: ENTITY_UTILS,
	queryFacade: QUERY_FACADE
})
QUERY_FACADE.setDependencies({
	fieldUtils: FIELD_UTILS,
	queryUtils: QUERY_UTILS,
	relationManager: RELATION_MANAGER,
	transactionalConnector: TRANSACTIONAL_CONNECTOR
})
QUERY_UTILS.setDependencies({
	fieldUtils: FIELD_UTILS,
	relationManager: RELATION_MANAGER
})
RELATION_MANAGER.setDependencies({
	applicationUtils: APPLICATION_UTILS
})
UPDATE_CACHE_MANAGER.setDependencies({
	applicationUtils: APPLICATION_UTILS,
	entityStateManager: ENTITY_STATE_MANAGER,
})
