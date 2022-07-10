import { AIR_ENTITY_UTILS } from '@airport/aviation-communication'
import {
	DB_APPLICATION_UTILS,
	ENTITY_STATE_MANAGER,
	TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control'
import { QMetadataUtils } from './implementation/utils/QMetadataUtils'
import { ApplicationUtils } from './implementation/utils/ApplicationUtils'
import { FieldUtils } from './implementation/utils/FieldUtils'
import { DatabaseStore } from './implementation/DatabaseStore'
import { airTrafficControl } from './library'
import { IAirportDatabase } from './definition/AirportDatabase'
import {
	ENTITY_UTILS,
	IApplicationUtils,
	IFieldUtils,
	IRelationManager,
	QUERY_UTILS
} from '@airport/tarmaq-query'
import {
	IDao,
	IDatabaseFacade,
	LOOKUP,
	NON_ENTITY_FIND,
	NON_ENTITY_FIND_ONE,
	NON_ENTITY_SEARCH,
	NON_ENTITY_SEARCH_ONE,
	QUERY_FACADE,
} from '@airport/tarmaq-dao'
import { Dao } from './implementation/Dao'
import { IDatabaseState } from './definition/DatabaseState'
import { IQMetadataUtils } from './definition/utils/IQMetadataUtils'
import { RelationManager } from './implementation/RelationManager'
import { IRepositoryLoader } from './definition/RepositoryLoader'
import { IUpdateCacheManager } from './definition/UpdateCacheManager'
import { UTILS } from './core-tokens'

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
export const DAO = airTrafficControl.token<IDao<any, any, any, any, any, any, any, any>>({
	class: Dao,
	interface: 'class Dao',
	token: 'DAO'
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
export const Q_METADATA_UTILS = airTrafficControl.token<IQMetadataUtils>({
	class: QMetadataUtils,
	interface: 'IQMetadataUtils',
	token: 'Q_METADATA_UTILS'
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
DAO.setDependencies({
	airportDatabase: AIRPORT_DATABASE,
	databaseFacade: DATABASE_FACADE,
	entityStateManager: ENTITY_STATE_MANAGER,
	lookup: LOOKUP,
	updateCacheManager: UPDATE_CACHE_MANAGER
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
