import { lib } from '@airport/direction-indicator'
import { ISubStatementSqlGenerator } from './sql/core/SubStatementSqlGenerator'
import { IObjectResultParserFactory } from './result/entity/ObjectResultParserFactory'
import { ISQLQueryAdaptor } from './adaptor/SQLQueryAdaptor'
import { IActiveQueries } from './store/ActiveQueries'
import { IIdGenerator } from './store/IdGenerator'
import { IValidator } from './validation/Validator'
import { SqlDriver } from './store/SqlDriver'
import { IStoreDriver } from '@airport/terminal-map'
import { OPERATION_CONTEXT_LOADER } from '@airport/ground-control'

const fuelHydrantSystem = lib('fuel-hydrant-system')

export const ACTIVE_QUERIES = fuelHydrantSystem.token<IActiveQueries>('ACTIVE_QUERIES')
export const SUB_STATEMENT_SQL_GENERATOR = fuelHydrantSystem.token<ISubStatementSqlGenerator>('SUB_STATEMENT_SQL_GENERATOR')
export const ID_GENERATOR = fuelHydrantSystem.token<IIdGenerator>('ID_GENERATOR')
export const OBJECT_RESULT_PARSER_FACTORY = fuelHydrantSystem.token<IObjectResultParserFactory>('OBJECT_RESULT_PARSER_FACTORY')
export const Q_VALIDATOR = fuelHydrantSystem.token<IValidator>('Q_VALIDATOR')
export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token<ISQLQueryAdaptor>('SQL_QUERY_ADAPTOR')

export const SQL_DRIVER = fuelHydrantSystem.token<IStoreDriver>({
    class: SqlDriver,
    interface: 'IStoreDriver',
    token: 'SQL_DRIVER'
})

SQL_DRIVER.setDependencies({
    operationContextLoader: OPERATION_CONTEXT_LOADER
})
