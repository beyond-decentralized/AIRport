import { system } from '@airport/di';
const fuelHydrantSystem = system('airport').lib('fuel-hydrant-system');
export const ACTIVE_QUERIES = fuelHydrantSystem.token('IActiveQueries');
export const SUB_STATEMENT_SQL_GENERATOR = fuelHydrantSystem.token('ISubStatementSqlGenerator');
export const ID_GENERATOR = fuelHydrantSystem.token('IIdGenerator');
export const OBJECT_RESULT_PARSER_FACTORY = fuelHydrantSystem.token('IObjectResultParserFactory');
export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token('ISQLQueryAdaptor');
export const Q_VALIDATOR = fuelHydrantSystem.token('IValidator');
//# sourceMappingURL=tokens.js.map