import { lib } from '@airport/direction-indicator'
import { ISubStatementSqlGenerator, SubStatementSqlGenerator } from './sql/core/SubStatementSqlGenerator'
import { IObjectResultParserFactory, ObjectResultParserFactory } from './result/entity/ObjectResultParserFactory'
import { ISQLQueryAdaptor } from './adaptor/SQLQueryAdaptor'
import { ActiveQueries, IActiveQueries } from './store/ActiveQueries'
import { IdGenerator, IIdGenerator } from './store/IdGenerator'
import { IValidator, QValidator } from './validation/Validator'
import { SqlDriver } from './store/SqlDriver'
import { IStoreDriver, STORE_DRIVER, TRANSACTION_MANAGER } from '@airport/terminal-map'
import { ENTITY_STATE_MANAGER, OPERATION_CONTEXT_LOADER } from '@airport/ground-control'
import { SEQUENCE_GENERATOR } from '@airport/check-in'
import { SQLWhereBase } from './sql/core/SQLWhereBase'
import { AIRPORT_DATABASE, APPLICATION_UTILS, Q_METADATA_UTILS, RELATION_MANAGER } from '@airport/air-traffic-control'

const fuelHydrantSystem = lib('fuel-hydrant-system')

export const ACTIVE_QUERIES = fuelHydrantSystem.token<IActiveQueries>({
    class: ActiveQueries,
    interface: 'IActiveQueries',
    token: 'ACTIVE_QUERIES'
})
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

export const SQL_WHERE_BASE = fuelHydrantSystem.token<SQLWhereBase>({
    class: SQLWhereBase,
    interface: 'class SQLWhereBase',
    token: 'SQL_WHERE_BASE'
})

ID_GENERATOR.setDependencies({
    sequenceGenerator: SEQUENCE_GENERATOR
})

OBJECT_RESULT_PARSER_FACTORY.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
})

ABSTRACT_SQL_DRIVER.setDependencies({
    activeQueries: ACTIVE_QUERIES,
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
    objectResultParserFactory: OBJECT_RESULT_PARSER_FACTORY,
    operationContextLoader: OPERATION_CONTEXT_LOADER,
    qMetadataUtils: Q_METADATA_UTILS,
    qValidator: Q_VALIDATOR,
    relationManager: RELATION_MANAGER,
    transactionManager: TRANSACTION_MANAGER,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    subStatementQueryGenerator: SUB_STATEMENT_SQL_GENERATOR,
})

SQL_WHERE_BASE.setDependencies({
    qValidator: Q_VALIDATOR,
    subStatementSqlGenerator: SUB_STATEMENT_SQL_GENERATOR
})

SUB_STATEMENT_SQL_GENERATOR.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
    operationContextLoader: OPERATION_CONTEXT_LOADER,
    qMetadataUtils: Q_METADATA_UTILS,
    qValidator: Q_VALIDATOR,
    relationManager: RELATION_MANAGER,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    storeDriver: STORE_DRIVER,
    subStatementQueryGenerator: SUB_STATEMENT_SQL_GENERATOR,
})
