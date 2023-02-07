import { AIR_ENTITY_UTILS, ContainerAccessor } from '@airport/direction-indicator'
import {
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
import { ApplicationUtils } from './implementation/utils/ApplicationUtils'
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

airTrafficControl.register(
	ApplicationUtils, DatabaseStore, FieldUtils,
	QApplicationBuilderUtils, QMetadataUtils, QueryRelationManager,
	SystemWideOperationIdUtils
)

export const AIRPORT_DATABASE = airTrafficControl.token<IAirportDatabase>('AirportDatabase')
export const API_REGISTRY = airTrafficControl.token<IApiRegistry>('ApiRegistry')
export const API_VALIDATOR = airTrafficControl.token<IApiValidator>('ApiValidator')
export const REPOSITORY_LOADER = airTrafficControl.token<IRepositoryLoader>('RepositoryLoader')

AIRPORT_DATABASE.setDependencies({
	appliationUtils: ApplicationUtils,
	databaseFacade: DATABASE_FACADE,
	databaseStore: DatabaseStore,
	dictionary: Dictionary,
	dbApplicationUtils: DbApplicationUtils,
	find: NonEntityFind,
	findOne: NonEntityFindOne,
	qApplicationBuilderUtils: QApplicationBuilderUtils,
	queryRelationManager: QueryRelationManager,
	search: NonEntitySearch,
	searchOne: NonEntitySearchOne
})
API_REGISTRY.setDependencies({
	containerAccessor: ContainerAccessor
})
airTrafficControl.setDependencies(ApplicationUtils, {
	airportDatabase: AIRPORT_DATABASE,
	dictionary: Dictionary,
	entityStateManager: ENTITY_STATE_MANAGER,
	qEntityUtils: QEntityUtils,
	utils: Utils
})
DATABASE_FACADE.setDependencies({
	applicationUtils: ApplicationUtils,
	entityStateManager: ENTITY_STATE_MANAGER,
	transactionalConnector: TRANSACTIONAL_CONNECTOR,
	updateCacheManager: UPDATE_CACHE_MANAGER
})
airTrafficControl.setDependencies(FieldUtils, {
	queryRelationManager: QueryRelationManager
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
	queryRelationManager: QueryRelationManager,
	transactionalConnector: TRANSACTIONAL_CONNECTOR
})
QUERY_UTILS.setDependencies({
	airportDatabase: AIRPORT_DATABASE,
	applicationUtils: ApplicationUtils,
	dictionary: Dictionary,
	entityUtils: ENTITY_UTILS,
	fieldUtils: FieldUtils,
	queryRelationManager: QueryRelationManager,
	airEntityUtils: AIR_ENTITY_UTILS
})
airTrafficControl.setDependencies(QueryRelationManager, {
	applicationUtils: ApplicationUtils,
	queryUtils: QUERY_UTILS
})
airTrafficControl.setDependencies(SystemWideOperationIdUtils, {
	dictionary: Dictionary,
	sequenceGenerator: SEQUENCE_GENERATOR,
})
UPDATE_CACHE_MANAGER.setDependencies({
	applicationUtils: ApplicationUtils,
	entityStateManager: ENTITY_STATE_MANAGER,
})
