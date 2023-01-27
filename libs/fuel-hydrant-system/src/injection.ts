import { lib } from '@airport/direction-indicator'
import {
    SubStatementSqlGenerator
} from './sql/core/SubStatementSqlGenerator'
import {
    ObjectResultParserFactory
} from './result/entity/ObjectResultParserFactory'
import { ISQLQueryAdaptor } from './adaptor/SQLQueryAdaptor'
import { IdGenerator } from './store/IdGenerator'
import { QValidator } from './validation/Validator'
import { SqlDriver } from './store/SqlDriver'
import { STORE_DRIVER, TRANSACTION_MANAGER } from '@airport/terminal-map'
import { AppTrackerUtils, DatastructureUtils, DbApplicationUtils, ENTITY_STATE_MANAGER, SEQUENCE_GENERATOR } from '@airport/ground-control'
import {
    AIRPORT_DATABASE, ApplicationUtils, QMetadataUtils, RelationManager, Utils
} from '@airport/air-traffic-control'
import { ActiveQueries, ObservableQueryAdapter } from '@airport/flight-number'
import { QUERY_UTILS } from '@airport/tarmaq-query'

const fuelHydrantSystem = lib('fuel-hydrant-system')

fuelHydrantSystem.register(
    SubStatementSqlGenerator, IdGenerator, ObjectResultParserFactory,
    QValidator, SqlDriver as any
)

export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token<ISQLQueryAdaptor>('SQLQueryAdaptor')

fuelHydrantSystem.setDependencies(IdGenerator, {
    sequenceGenerator: SEQUENCE_GENERATOR
})

fuelHydrantSystem.setDependencies(ObjectResultParserFactory, {
    applicationUtils: ApplicationUtils,
    datastructureUtils: DatastructureUtils,
    entityStateManager: ENTITY_STATE_MANAGER,
    queryUtils: QUERY_UTILS,
    utils: Utils
})

fuelHydrantSystem.setDependencies(SqlDriver as any, {
    activeQueries: ActiveQueries,
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: ApplicationUtils,
    appTrackerUtils: AppTrackerUtils,
    dbApplicationUtils: DbApplicationUtils,
    entityStateManager: ENTITY_STATE_MANAGER,
    objectResultParserFactory: ObjectResultParserFactory,
    observableQueryAdapter: ObservableQueryAdapter,
    qMetadataUtils: QMetadataUtils,
    queryUtils: QUERY_UTILS,
    qValidator: QValidator,
    relationManager: RelationManager,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    subStatementSqlGenerator: SubStatementSqlGenerator,
    transactionManager: TRANSACTION_MANAGER,
    utils: Utils
})

fuelHydrantSystem.setDependencies(SubStatementSqlGenerator, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: ApplicationUtils,
    entityStateManager: ENTITY_STATE_MANAGER,
    qMetadataUtils: QMetadataUtils,
    queryUtils: QUERY_UTILS,
    qValidator: QValidator,
    relationManager: RelationManager,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    storeDriver: STORE_DRIVER,
    utils: Utils
})
