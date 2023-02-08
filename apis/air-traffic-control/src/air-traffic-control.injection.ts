import { AIR_ENTITY_UTILS, ContainerAccessor } from '@airport/direction-indicator'
import {
	APPLICATION_UTILS,
	DbApplicationUtils,
	Dictionary,
	ENTITY_STATE_MANAGER,
	SEQUENCE_GENERATOR,
	TRANSACTIONAL_CONNECTOR,
	UPDATE_CACHE_MANAGER
} from '@airport/ground-control'
import {
	ENTITY_UTILS,
	QEntityUtils,
	QUERY_RELATION_MANAGER,
	QUERY_UTILS
} from '@airport/tarmaq-query'
import {
	DATABASE_FACADE,
	Lookup,
	NonEntityFind,
	NonEntityFindOne,
	NonEntitySearch,
	NonEntitySearchOne,
	QUERY_FACADE,
} from '@airport/tarmaq-dao'
import { QMetadataUtils } from './implementation/utils/QMetadataUtils'
import { FieldUtils } from './implementation/utils/FieldUtils'
import { DatabaseStore } from './implementation/DatabaseStore'
import { IAirportDatabase } from './definition/IAirportDatabase'
import { QueryRelationManager } from './implementation/QueryRelationManager'
import { IRepositoryLoader } from './definition/IRepositoryLoader'
import { QApplicationBuilderUtils } from './implementation/utils/QApplicationBuilderUtils'
import { airTrafficControl } from './air-traffic-control.injectionLibrary'
import { Utils } from './implementation/Utils'
import { SystemWideOperationIdUtils } from './implementation/utils/SystemWideOperationIdUtils'
import { IApiRegistry } from './api/ApiRegistry'
import { IApiValidator } from './api/ApiValidator'
import { ApplicationUtils } from './implementation/utils/ApplicationUtils'

airTrafficControl.register(
	DatabaseStore, FieldUtils,
	QApplicationBuilderUtils, QMetadataUtils,
	SystemWideOperationIdUtils
)

export const AIRPORT_DATABASE = airTrafficControl.token<IAirportDatabase>('AirportDatabase')
export const API_REGISTRY = airTrafficControl.token<IApiRegistry>('ApiRegistry')
export const API_VALIDATOR = airTrafficControl.token<IApiValidator>('ApiValidator')
export const REPOSITORY_LOADER = airTrafficControl.token<IRepositoryLoader>('RepositoryLoader')

AIRPORT_DATABASE.setDependencies({
	appliationUtils: APPLICATION_UTILS,
	databaseFacade: DATABASE_FACADE,
	databaseStore: DatabaseStore,
	dictionary: Dictionary,
	dbApplicationUtils: DbApplicationUtils,
	find: NonEntityFind,
	findOne: NonEntityFindOne,
	qApplicationBuilderUtils: QApplicationBuilderUtils,
	queryRelationManager: QUERY_RELATION_MANAGER,
	search: NonEntitySearch,
	searchOne: NonEntitySearchOne
})
API_REGISTRY.setDependencies({
	containerAccessor: ContainerAccessor
})
APPLICATION_UTILS.setClass(ApplicationUtils)
APPLICATION_UTILS.setDependencies({
	airportDatabase: AIRPORT_DATABASE,
	dictionary: Dictionary,
	entityStateManager: ENTITY_STATE_MANAGER,
	qEntityUtils: QEntityUtils,
	utils: Utils
})
DATABASE_FACADE.setDependencies({
	applicationUtils: APPLICATION_UTILS,
	entityStateManager: ENTITY_STATE_MANAGER,
	transactionalConnector: TRANSACTIONAL_CONNECTOR,
	updateCacheManager: UPDATE_CACHE_MANAGER
})
airTrafficControl.setDependencies(FieldUtils, {
	queryRelationManager: QUERY_RELATION_MANAGER
})
airTrafficControl.setDependencies(Lookup, {
	entityUtils: ENTITY_UTILS,
	queryFacade: QUERY_FACADE
})
airTrafficControl.setDependencies(QApplicationBuilderUtils, {
	qEntityUtils: QEntityUtils
})
airTrafficControl.setDependencies(QMetadataUtils, {
	dictionary: Dictionary
})
QUERY_FACADE.setDependencies({
	fieldUtils: FieldUtils,
	queryUtils: QUERY_UTILS,
	queryRelationManager: QUERY_RELATION_MANAGER,
	transactionalConnector: TRANSACTIONAL_CONNECTOR
})
QUERY_UTILS.setDependencies({
	airportDatabase: AIRPORT_DATABASE,
	applicationUtils: APPLICATION_UTILS,
	dictionary: Dictionary,
	entityUtils: ENTITY_UTILS,
	fieldUtils: FieldUtils,
	queryRelationManager: QUERY_RELATION_MANAGER,
	airEntityUtils: AIR_ENTITY_UTILS
})
QUERY_RELATION_MANAGER.setClass(QueryRelationManager)
QUERY_RELATION_MANAGER.setDependencies({
	applicationUtils: APPLICATION_UTILS,
	queryUtils: QUERY_UTILS
})
airTrafficControl.setDependencies(SystemWideOperationIdUtils, {
	dictionary: Dictionary,
	sequenceGenerator: SEQUENCE_GENERATOR,
})
UPDATE_CACHE_MANAGER.setDependencies({
	applicationUtils: APPLICATION_UTILS,
	entityStateManager: ENTITY_STATE_MANAGER,
})
