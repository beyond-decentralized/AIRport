import { lib } from '@airport/direction-indicator';
import { SubStatementSqlGenerator } from './sql/core/SubStatementSqlGenerator';
import { ObjectResultParserFactory } from './result/entity/ObjectResultParserFactory';
import { ActiveQueries } from './store/ActiveQueries';
import { IdGenerator } from './store/IdGenerator';
import { QValidator } from './validation/Validator';
import { SqlDriver } from './store/SqlDriver';
import { OPERATION_CONTEXT_LOADER } from '@airport/ground-control';
import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { SQLWhereBase } from './sql/core/SQLWhereBase';
const fuelHydrantSystem = lib('fuel-hydrant-system');
export const ACTIVE_QUERIES = fuelHydrantSystem.token({
    class: ActiveQueries,
    interface: 'IActiveQueries',
    token: 'ACTIVE_QUERIES'
});
export const SUB_STATEMENT_SQL_GENERATOR = fuelHydrantSystem.token({
    class: SubStatementSqlGenerator,
    interface: 'ISubStatementSqlGenerator',
    token: 'SUB_STATEMENT_SQL_GENERATOR'
});
export const ID_GENERATOR = fuelHydrantSystem.token({
    class: IdGenerator,
    interface: 'IIdGenerator',
    token: 'ID_GENERATOR'
});
export const OBJECT_RESULT_PARSER_FACTORY = fuelHydrantSystem.token({
    class: ObjectResultParserFactory,
    interface: 'IObjectResultParserFactory',
    token: 'OBJECT_RESULT_PARSER_FACTORY'
});
export const Q_VALIDATOR = fuelHydrantSystem.token({
    class: QValidator,
    interface: 'IValidator',
    token: 'Q_VALIDATOR'
});
export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token({
    class: null,
    interface: 'ISQLQueryAdaptor',
    token: 'SQL_QUERY_ADAPTOR'
});
export const SQL_DRIVER = fuelHydrantSystem.token({
    class: SqlDriver,
    interface: 'IStoreDriver',
    token: 'SQL_DRIVER'
});
export const SQL_WHERE_BASE = fuelHydrantSystem.token({
    class: SQLWhereBase,
    interface: 'class SQLWhereBase',
    token: 'SQL_WHERE_BASE'
});
ID_GENERATOR.setDependencies({
    sequenceGenerator: SEQUENCE_GENERATOR
});
SQL_DRIVER.setDependencies({
    activeQueries: ACTIVE_QUERIES,
    operationContextLoader: OPERATION_CONTEXT_LOADER
});
SQL_WHERE_BASE.setDependencies({
    qValidator: Q_VALIDATOR,
    subStatementSqlGenerator: SUB_STATEMENT_SQL_GENERATOR
});
//# sourceMappingURL=tokens.js.map