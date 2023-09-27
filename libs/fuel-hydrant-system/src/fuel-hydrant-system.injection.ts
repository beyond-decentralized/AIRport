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
import { SqlStoreDriver } from './store/SqlStoreDriver'
import { STORE_DRIVER, TRANSACTION_MANAGER } from '@airport/terminal-map'
import { AppTrackerUtils, DatastructureUtils, ApplicationNameUtils, ENTITY_STATE_MANAGER, SEQUENCE_GENERATOR, Dictionary, APPLICATION_UTILS } from '@airport/ground-control'
import {
    AIRPORT_DATABASE, QMetadataUtils, Utils
} from '@airport/air-traffic-control'
import { QUERY_RELATION_MANAGER, QUERY_UTILS } from '@airport/tarmaq-query'
import { Lookup } from '@airport/tarmaq-dao'

const fuelHydrantSystem = lib('fuel-hydrant-system')

fuelHydrantSystem.register(
    SubStatementSqlGenerator, IdGenerator, ObjectResultParserFactory,
    QValidator, SqlStoreDriver as any
)

export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token<ISQLQueryAdaptor>('SQLQueryAdaptor')

fuelHydrantSystem.setDependencies(IdGenerator, {
    sequenceGenerator: SEQUENCE_GENERATOR
})

fuelHydrantSystem.setDependencies(ObjectResultParserFactory, {
    applicationUtils: APPLICATION_UTILS,
    datastructureUtils: DatastructureUtils,
    entityStateManager: ENTITY_STATE_MANAGER,
    queryUtils: QUERY_UTILS,
    utils: Utils
})

// fuelHydrantSystem.setDependencies(SqlStoreDriver as any, {
STORE_DRIVER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    appTrackerUtils: AppTrackerUtils,
    applicationNameUtils: ApplicationNameUtils,
    dictionary: Dictionary,
    entityStateManager: ENTITY_STATE_MANAGER,
    lookup: Lookup,
    objectResultParserFactory: ObjectResultParserFactory,
    qMetadataUtils: QMetadataUtils,
    queryUtils: QUERY_UTILS,
    qValidator: QValidator,
    queryRelationManager: QUERY_RELATION_MANAGER,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    subStatementSqlGenerator: SubStatementSqlGenerator,
    transactionManager: TRANSACTION_MANAGER,
    utils: Utils
})

fuelHydrantSystem.setDependencies(SubStatementSqlGenerator, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    dictionary: Dictionary,
    entityStateManager: ENTITY_STATE_MANAGER,
    qMetadataUtils: QMetadataUtils,
    queryUtils: QUERY_UTILS,
    qValidator: QValidator,
    queryRelationManager: QUERY_RELATION_MANAGER,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    storeDriver: STORE_DRIVER,
    utils: Utils
})
