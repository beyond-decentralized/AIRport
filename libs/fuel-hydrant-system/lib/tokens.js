import { lib } from '@airport/direction-indicator';
import { SubStatementSqlGenerator } from './sql/core/SubStatementSqlGenerator';
import { ObjectResultParserFactory } from './result/entity/ObjectResultParserFactory';
import { ActiveQueries } from './store/ActiveQueries';
import { IdGenerator } from './store/IdGenerator';
import { QValidator } from './validation/Validator';
import { SqlDriver } from './store/SqlDriver';
import { STORE_DRIVER } from '@airport/terminal-map';
import { ENTITY_STATE_MANAGER, OPERATION_CONTEXT_LOADER } from '@airport/ground-control';
import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { SQLWhereBase } from './sql/core/SQLWhereBase';
import { AIRPORT_DATABASE, APPLICATION_UTILS, Q_METADATA_UTILS, RELATION_MANAGER } from '@airport/air-control';
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
export const ABSTRACT_SQL_DRIVER = fuelHydrantSystem.token({
    class: SqlDriver,
    interface: 'class SqlDriver',
    token: 'ABSTRACT_SQL_DRIVER'
});
export const SQL_WHERE_BASE = fuelHydrantSystem.token({
    class: SQLWhereBase,
    interface: 'class SQLWhereBase',
    token: 'SQL_WHERE_BASE'
});
ID_GENERATOR.setDependencies({
    sequenceGenerator: SEQUENCE_GENERATOR
});
ABSTRACT_SQL_DRIVER.setDependencies({
    activeQueries: ACTIVE_QUERIES,
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
    operationContextLoader: OPERATION_CONTEXT_LOADER,
    qMetadataUtils: Q_METADATA_UTILS,
    qValidator: Q_VALIDATOR,
    relationManager: RELATION_MANAGER,
    sqlQueryAdapter: SQL_QUERY_ADAPTOR,
    subStatementQueryGenerator: SUB_STATEMENT_SQL_GENERATOR,
});
SQL_WHERE_BASE.setDependencies({
    qValidator: Q_VALIDATOR,
    subStatementSqlGenerator: SUB_STATEMENT_SQL_GENERATOR
});
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
});
//# sourceMappingURL=tokens.js.map