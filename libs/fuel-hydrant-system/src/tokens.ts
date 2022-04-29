import { lib } from '@airport/direction-indicator'
import { ISubStatementSqlGenerator, SubStatementSqlGenerator } from './sql/core/SubStatementSqlGenerator'
import { IObjectResultParserFactory, ObjectResultParserFactory } from './result/entity/ObjectResultParserFactory'
import { ISQLQueryAdaptor } from './adaptor/SQLQueryAdaptor'
import { ActiveQueries, IActiveQueries } from './store/ActiveQueries'
import { IdGenerator, IIdGenerator } from './store/IdGenerator'
import { IValidator, QValidator } from './validation/Validator'
import { SqlDriver } from './store/SqlDriver'
import { IStoreDriver } from '@airport/terminal-map'
import { OPERATION_CONTEXT_LOADER } from '@airport/ground-control'
import { SEQUENCE_GENERATOR } from '@airport/check-in'
import { SQLWhereBase } from './sql/core/SQLWhereBase'

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
    token: 'SQL_QUERY_ADAPTOR'})

export const SQL_DRIVER = fuelHydrantSystem.token<IStoreDriver>({
    class: SqlDriver,
    interface: 'IStoreDriver',
    token: 'SQL_DRIVER'
})

export const SQL_WHERE_BASE = fuelHydrantSystem.token<SQLWhereBase>({
    class: SQLWhereBase,
    interface: 'class SQLWhereBase',
    token: 'SQL_WHERE_BASE'
})

ID_GENERATOR.setDependencies({
    sequenceGenerator: SEQUENCE_GENERATOR
})

SQL_DRIVER.setDependencies({
    activeQueries: ACTIVE_QUERIES,
    operationContextLoader: OPERATION_CONTEXT_LOADER
})

SQL_WHERE_BASE.setDependencies({
    qValidator: Q_VALIDATOR,
    subStatementSqlGenerator: SUB_STATEMENT_SQL_GENERATOR
})
