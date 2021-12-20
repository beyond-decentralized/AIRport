import {lib}                     from '@airport/di'
import {ISubStatementSqlGenerator}         from './sql/core/SubStatementSqlGenerator'
import {IObjectResultParserFactory} from './result/entity/ObjectResultParserFactory'
import {ISQLQueryAdaptor}           from './adaptor/SQLQueryAdaptor'
import {IActiveQueries}             from './store/ActiveQueries'
import {IIdGenerator}               from './store/IdGenerator'
import {IValidator}                 from './validation/Validator'

const fuelHydrantSystem = lib('fuel-hydrant-system')

export const ACTIVE_QUERIES              = fuelHydrantSystem.token<IActiveQueries>('ACTIVE_QUERIES')
export const SUB_STATEMENT_SQL_GENERATOR = fuelHydrantSystem.token<ISubStatementSqlGenerator>('SUB_STATEMENT_SQL_GENERATOR')
export const ID_GENERATOR                = fuelHydrantSystem.token<IIdGenerator>('ID_GENERATOR')
export const OBJECT_RESULT_PARSER_FACTORY = fuelHydrantSystem.token<IObjectResultParserFactory>('OBJECT_RESULT_PARSER_FACTORY')
export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token<ISQLQueryAdaptor>('SQL_QUERY_ADAPTOR')
export const Q_VALIDATOR       = fuelHydrantSystem.token<IValidator>('Q_VALIDATOR')
