import { system } from '@airport/di';
const trafficPattern = system('airport').lib('traffic-pattern');
export const DOMAIN_DAO = trafficPattern.token('IDomainDao');
export const SCHEMA_COLUMN_DAO = trafficPattern.token('IApplicationColumnDao');
export const SCHEMA_DAO = trafficPattern.token('IApplicationDao');
export const SCHEMA_ENTITY_DAO = trafficPattern.token('IApplicationEntityDao');
export const SCHEMA_PROPERTY_COLUMN_DAO = trafficPattern.token('IApplicationPropertyColumnDao');
export const SCHEMA_PROPERTY_DAO = trafficPattern.token('IApplicationPropertyDao');
export const SCHEMA_REFERENCE_DAO = trafficPattern.token('IApplicationReferenceDao');
export const SCHEMA_RELATION_COLUMN_DAO = trafficPattern.token('IApplicationRelationColumnDao');
export const SCHEMA_RELATION_DAO = trafficPattern.token('IApplicationRelationDao');
export const SCHEMA_VERSION_DAO = trafficPattern.token('IApplicationVersionDao');
export const SCHEMA_VERSION_DUO = trafficPattern.token('IApplicationVersionDuo');
//# sourceMappingURL=tokens.js.map