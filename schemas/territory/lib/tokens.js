import { system } from '@airport/di';
const territory = system('airport').lib('territory');
export const APPLICATION_DAO = territory.token();
export const APPLICATION_PACKAGE_DAO = territory.token();
export const DOMAIN_DAO = territory.token();
export const PACKAGE_DAO = territory.token();
export const PACKAGE_UNIT_DAO = territory.token();
//# sourceMappingURL=tokens.js.map