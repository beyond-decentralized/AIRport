import { system } from '@airport/di';
const trafficPattern = system('airport').lib('traffic-pattern');
export const DOMAIN_DAO = trafficPattern.token('IDomainDao');
export const APPLICATION_COLUMN_DAO = trafficPattern.token('IApplicationColumnDao');
export const APPLICATION_DAO = trafficPattern.token('IApplicationDao');
export const APPLICATION_ENTITY_DAO = trafficPattern.token('IApplicationEntityDao');
export const APPLICATION_PROPERTY_COLUMN_DAO = trafficPattern.token('IApplicationPropertyColumnDao');
export const APPLICATION_PROPERTY_DAO = trafficPattern.token('IApplicationPropertyDao');
export const APPLICATION_REFERENCE_DAO = trafficPattern.token('IApplicationReferenceDao');
export const APPLICATION_RELATION_COLUMN_DAO = trafficPattern.token('IApplicationRelationColumnDao');
export const APPLICATION_RELATION_DAO = trafficPattern.token('IApplicationRelationDao');
export const APPLICATION_VERSION_DAO = trafficPattern.token('IApplicationVersionDao');
export const APPLICATION_VERSION_DUO = trafficPattern.token('IApplicationVersionDuo');
//# sourceMappingURL=tokens.js.map