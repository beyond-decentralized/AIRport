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
import { DbApplicationUtils, ENTITY_STATE_MANAGER, SEQUENCE_GENERATOR } from '@airport/ground-control'
import {
    AIRPORT_DATABASE, ApplicationUtils, QMetadataUtils, RelationManager, Utils
} from '@airport/air-traffic-control'
import { ActiveQueries } from '@airport/flight-number'

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
    entityStateManager: ENTITY_STATE_MANAGER,
    utils: Utils
})

fuelHydrantSystem.setDependencies(SqlDriver as any, {
    activeQueries: ActiveQueries,
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: ApplicationUtils,
    dbApplicationUtils: DbApplicationUtils,
    entityStateManager: ENTITY_STATE_MANAGER,
    objectResultParserFactory: ObjectResultParserFactory,
    qMetadataUtils: QMetadataUtils,
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
    qValidator: QValidator,
    relationManager: RelationManager,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    storeDriver: STORE_DRIVER,
    utils: Utils
})