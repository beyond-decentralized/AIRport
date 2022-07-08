import { AIR_ENTITY_UTILS } from '@airport/aviation-communication'
import { DB_APPLICATION_UTILS, ENTITY_STATE_MANAGER, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control'
import { IRepositoryLoader } from './lingo/core/repository/RepositoryLoader'
import { IAirportDatabase } from './lingo/AirportDatabase'
import {
	IDatabaseFacade,
	IQueryFacade
} from './lingo/core/repository/DatabaseFacade'
import { IUpdateCacheManager } from './lingo/core/UpdateCacheManager'
import { ILookup } from './lingo/query/api/Lookup'
import { INonEntityFind } from './lingo/query/api/NonEntityFind'
import { INonEntityFindOne } from './lingo/query/api/NonEntityFindOne'
import { INonEntitySearch } from './lingo/query/api/NonEntitySearch'
import { INonEntitySearchOne } from './lingo/query/api/NonEntitySearchOne'
import { IFieldUtils } from './lingo/utils/FieldUtils'
import { IQMetadataUtils } from './lingo/utils/QMetadataUtils'
import { IApplicationUtils } from './lingo/utils/ApplicationUtils'
import { IDatabaseState } from './lingo/DatabaseState'
import { IRelationManager, RelationManager } from './implementation/core/entity/RelationManager'
import { Lookup } from './implementation/query/api/Lookup'
import { NonEntityFind } from './implementation/query/api/NonEntityFind'
import { NonEntityFindOne } from './implementation/query/api/NonEntityFindOne'
import { NonEntitySearch } from './implementation/query/api/NonEntitySearch'
import { NonEntitySearchOne } from './implementation/query/api/NonEntitySearchOne'
import { QMetadataUtils } from './implementation/utils/QMetadataUtils'
import { ApplicationUtils } from './implementation/utils/ApplicationUtils'
import { FieldUtils } from './implementation/utils/FieldUtils'
import { DatabaseStore } from './implementation/DatabaseStore'
import { ENTITY_UTILS, QUERY_UTILS, UTILS } from './core-tokens'
import { airTrafficControl } from './library'

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
export const DATABASE_STORE = airTrafficControl.token<IDatabaseState>({
	class: DatabaseStore,
	interface: 'IDatabaseState',
	token: 'DATABASE_STORE'
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
export const NON_ENTITY_FIND = airTrafficControl.token<INonEntityFind>({
	class: NonEntityFind,
	interface: 'INonEntityFind',
	token: 'NON_ENTITY_FIND'
})
export const NON_ENTITY_FIND_ONE = airTrafficControl.token<INonEntityFindOne>({
	class: NonEntityFindOne,
	interface: 'INonEntityFindOne',
	token: 'NON_ENTITY_FIND_ONE'
})
export const NON_ENTITY_SEARCH = airTrafficControl.token<INonEntitySearch>({
	class: NonEntitySearch,
	interface: 'INonEntitySearch',
	token: 'NON_ENTITY_SEARCH'
})
export const NON_ENTITY_SEARCH_ONE = airTrafficControl.token<INonEntitySearchOne>({
	class: NonEntitySearchOne,
	interface: 'INonEntitySearchOne',
	token: 'NON_ENTITY_SEARCH_ONE'
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
	appliationUtils: APPLICATION_UTILS,
	databaseFacade: DATABASE_FACADE,
	databaseStore: DATABASE_STORE,
	dbApplicationUtils: DB_APPLICATION_UTILS,
	find: NON_ENTITY_FIND,
	findOne: NON_ENTITY_FIND_ONE,
	relationManager: RELATION_MANAGER,
	search: NON_ENTITY_SEARCH,
	searchOne: NON_ENTITY_SEARCH_ONE
})
APPLICATION_UTILS.setDependencies({
	airportDatabase: AIRPORT_DATABASE,
	entityStateManager: ENTITY_STATE_MANAGER,
	utils: UTILS
})
DATABASE_FACADE.setDependencies({
	applicationUtils: APPLICATION_UTILS,
	entityStateManager: ENTITY_STATE_MANAGER,
	transactionalConnector: TRANSACTIONAL_CONNECTOR,
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
	entityUtils: ENTITY_UTILS,
	fieldUtils: FIELD_UTILS,
	relationManager: RELATION_MANAGER,
	airEntityUtils: AIR_ENTITY_UTILS
})
RELATION_MANAGER.setDependencies({
	applicationUtils: APPLICATION_UTILS
})
UPDATE_CACHE_MANAGER.setDependencies({
	applicationUtils: APPLICATION_UTILS,
	entityStateManager: ENTITY_STATE_MANAGER,
})
