import { AIR_ENTITY_UTILS, lib } from '@airport/direction-indicator'
import {
	DbApplicationUtils,
	ENTITY_STATE_MANAGER,
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
import { IAirportDatabase } from './definition/AirportDatabase'
import { RelationManager } from './implementation/RelationManager'
import { IRepositoryLoader } from './definition/RepositoryLoader'
import { QApplicationBuilderUtils } from './implementation/utils/QApplicationBuilderUtils'
import { airTrafficControl } from './injectionLibrary'
import { Utils } from './implementation/Utils'

airTrafficControl.register(
	ApplicationUtils, DatabaseStore, FieldUtils,
	QApplicationBuilderUtils, QMetadataUtils, RelationManager,
)

export const AIRPORT_DATABASE = airTrafficControl.token<IAirportDatabase>('AirportDatabase')
export const REPOSITORY_LOADER = airTrafficControl.token<IRepositoryLoader>('RepositoryLoader')

AIRPORT_DATABASE.setDependencies({
	appliationUtils: ApplicationUtils,
	databaseFacade: DATABASE_FACADE,
	databaseStore: DatabaseStore,
	dbApplicationUtils: DbApplicationUtils,
	find: NonEntityFind,
	findOne: NonEntityFindOne,
	qApplicationBuilderUtils: QApplicationBuilderUtils,
	relationManager: RelationManager,
	search: NonEntitySearch,
	searchOne: NonEntitySearchOne
})
airTrafficControl.setDependencies(ApplicationUtils, {
	airportDatabase: AIRPORT_DATABASE,
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
	relationManager: RelationManager
})
airTrafficControl.setDependencies(Lookup, {
	entityUtils: ENTITY_UTILS,
	queryFacade: QUERY_FACADE
})
airTrafficControl.setDependencies(QApplicationBuilderUtils, {
	qEntityUtils: QEntityUtils
})
QUERY_FACADE.setDependencies({
	fieldUtils: FieldUtils,
	queryUtils: QUERY_UTILS,
	relationManager: RelationManager,
	transactionalConnector: TRANSACTIONAL_CONNECTOR
})
QUERY_UTILS.setDependencies({
	entityUtils: ENTITY_UTILS,
	fieldUtils: FieldUtils,
	relationManager: RelationManager,
	airEntityUtils: AIR_ENTITY_UTILS
})
airTrafficControl.setDependencies(RelationManager, {
	applicationUtils: ApplicationUtils
})
UPDATE_CACHE_MANAGER.setDependencies({
	applicationUtils: ApplicationUtils,
	entityStateManager: ENTITY_STATE_MANAGER,
})
