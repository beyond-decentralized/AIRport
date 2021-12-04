import { system } from '@airport/di';
const fuelHydrantSystem = system('airport').lib('fuel-hydrant-system');
export const ACTIVE_QUERIES = fuelHydrantSystem.token('ACTIVE_QUERIES');
export const SUB_STATEMENT_SQL_GENERATOR = fuelHydrantSystem.token('SUB_STATEMENT_SQL_GENERATOR');
export const ID_GENERATOR = fuelHydrantSystem.token('ID_GENERATOR');
export const OBJECT_RESULT_PARSER_FACTORY = fuelHydrantSystem.token('OBJECT_RESULT_PARSER_FACTORY');
export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token('SQL_QUERY_ADAPTOR');
export const Q_VALIDATOR = fuelHydrantSystem.token('Q_VALIDATOR');
//# sourceMappingURL=tokens.js.map