import { system } from '@airport/di';
const trafficPattern = system('airport').lib('traffic-pattern');
export const NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSCHEMA = 'NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSCHEMA';
export const NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DAOS = trafficPattern.token('NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos');
export const NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DUOS = trafficPattern.token('NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Duos');
export const SCHEMA_COLUMN_DAO = trafficPattern.token('ISchemaColumnDao');
export const SCHEMA_DAO = trafficPattern.token('ISchemaDao');
export const SCHEMA_ENTITY_DAO = trafficPattern.token('ISchemaEntityDao');
export const SCHEMA_PROPERTY_COLUMN_DAO = trafficPattern.token('ISchemaPropertyColumnDao');
export const SCHEMA_PROPERTY_DAO = trafficPattern.token('ISchemaPropertyDao');
export const SCHEMA_REFERENCE_DAO = trafficPattern.token('ISchemaReferenceDao');
export const SCHEMA_RELATION_COLUMN_DAO = trafficPattern.token('ISchemaRelationColumnDao');
export const SCHEMA_RELATION_DAO = trafficPattern.token('ISchemaRelationDao');
export const SCHEMA_VERSION_DAO = trafficPattern.token('ISchemaVersionDao');
export const SCHEMA_VERSION_DUO = trafficPattern.token('ISchemaVersionDuo');
//# sourceMappingURL=tokens.js.map