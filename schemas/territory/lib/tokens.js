import { system } from '@airport/di';
const territory = system('airport').lib('territory');
export const APPLICATION_DAO = territory.token('IApplicationDao');
export const APPLICATION_PACKAGE_DAO = territory.token('IApplicationPackageDao');
export const DOMAIN_DAO = territory.token('IDomainDao');
export const PACKAGE_DAO = territory.token('IPackageDao');
export const PACKAGE_UNIT_DAO = territory.token('IPackagedUnitDao');
//# sourceMappingURL=tokens.js.map