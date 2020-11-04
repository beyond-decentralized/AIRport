import { system } from '@airport/di';
const fuelHydrantSystem = system('airport')
    .lib('fuel-hydrant-system');
export const ACTIVE_QUERIES = fuelHydrantSystem.token();
export const ID_GENERATOR = fuelHydrantSystem.token();
export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token();
export const Q_VALIDATOR = fuelHydrantSystem.token();
//# sourceMappingURL=tokens.js.map