import { lib } from '@airport/direction-indicator'
import { ISubStatementSqlGenerator, SubStatementSqlGenerator } from './sql/core/SubStatementSqlGenerator'
import { IObjectResultParserFactory, ObjectResultParserFactory } from './result/entity/ObjectResultParserFactory'
import { ISQLQueryAdaptor } from './adaptor/SQLQueryAdaptor'
import { IdGenerator, IIdGenerator } from './store/IdGenerator'
import { IValidator, QValidator } from './validation/Validator'
import { SqlDriver } from './store/SqlDriver'
import { IStoreDriver, STORE_DRIVER, TRANSACTION_MANAGER } from '@airport/terminal-map'
import { DB_APPLICATION_UTILS, ENTITY_STATE_MANAGER } from '@airport/ground-control'
import { SEQUENCE_GENERATOR } from '@airport/check-in'
import { AIRPORT_DATABASE, APPLICATION_UTILS, Q_METADATA_UTILS, RELATION_MANAGER, UTILS } from '@airport/air-traffic-control'
import { ACTIVE_QUERIES } from '@airport/flight-number'

const fuelHydrantSystem = lib('fuel-hydrant-system')

export const SUB_STATEMENT_SQL_GENERATOR = fuelHydrantSystem.token<ISubStatementSqlGenerator>({
    class: SubStatementSqlGenerator,
    interface: 'ISubStatementSqlGenerator',
    token: 'SUB_STATEMENT_SQL_GENERATOR'
})
export const ID_GENERATOR = fuelHydrantSystem.token<IIdGenerator>({
    class: IdGenerator,
    interface: 'IIdGenerator',
    token: 'ID_GENERATOR'
})
export const OBJECT_RESULT_PARSER_FACTORY = fuelHydrantSystem.token<IObjectResultParserFactory>({
    class: ObjectResultParserFactory,
    interface: 'IObjectResultParserFactory',
    token: 'OBJECT_RESULT_PARSER_FACTORY'
})
export const Q_VALIDATOR = fuelHydrantSystem.token<IValidator>({
    class: QValidator,
    interface: 'IValidator',
    token: 'Q_VALIDATOR'
})
export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token<ISQLQueryAdaptor>({
    class: null,
    interface: 'ISQLQueryAdaptor',
    token: 'SQL_QUERY_ADAPTOR'
})

export const ABSTRACT_SQL_DRIVER = fuelHydrantSystem.token<IStoreDriver>({
    class: SqlDriver,
    interface: 'class SqlDriver',
    token: 'ABSTRACT_SQL_DRIVER'
})

ID_GENERATOR.setDependencies({
    sequenceGenerator: SEQUENCE_GENERATOR
})

OBJECT_RESULT_PARSER_FACTORY.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
    utils: UTILS
})

ABSTRACT_SQL_DRIVER.setDependencies({
    activeQueries: ACTIVE_QUERIES,
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
    objectResultParserFactory: OBJECT_RESULT_PARSER_FACTORY,
    qMetadataUtils: Q_METADATA_UTILS,
    qValidator: Q_VALIDATOR,
    relationManager: RELATION_MANAGER,
    transactionManager: TRANSACTION_MANAGER,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    subStatementQueryGenerator: SUB_STATEMENT_SQL_GENERATOR,
    utils: UTILS
})

SUB_STATEMENT_SQL_GENERATOR.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
    qMetadataUtils: Q_METADATA_UTILS,
    qValidator: Q_VALIDATOR,
    relationManager: RELATION_MANAGER,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    storeDriver: STORE_DRIVER,
    utils: UTILS
})
