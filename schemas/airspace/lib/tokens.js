import { system } from '@airport/di';
const trafficPattern = system('airport').lib('traffic-pattern');
export const DOMAIN_DAO = trafficPattern.token('DOMAIN_DAO');
export const APPLICATION_COLUMN_DAO = trafficPattern.token('APPLICATION_COLUMN_DAO');
export const APPLICATION_DAO = trafficPattern.token('APPLICATION_DAO');
export const APPLICATION_ENTITY_DAO = trafficPattern.token('APPLICATION_ENTITY_DAO');
export const APPLICATION_PROPERTY_COLUMN_DAO = trafficPattern.token('APPLICATION_PROPERTY_COLUMN_DAO');
export const APPLICATION_PROPERTY_DAO = trafficPattern.token('APPLICATION_PROPERTY_DAO');
export const APPLICATION_REFERENCE_DAO = trafficPattern.token('APPLICATION_REFERENCE_DAO');
export const APPLICATION_RELATION_COLUMN_DAO = trafficPattern.token('APPLICATION_RELATION_COLUMN_DAO');
export const APPLICATION_RELATION_DAO = trafficPattern.token('APPLICATION_RELATION_DAO');
export const APPLICATION_VERSION_DAO = trafficPattern.token('APPLICATION_VERSION_DAO');
export const APPLICATION_VERSION_DUO = trafficPattern.token('APPLICATION_VERSION_DUO');
//# sourceMappingURL=tokens.js.map