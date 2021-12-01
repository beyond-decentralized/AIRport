import { lib } from '@airport/di';
const airControl = lib('air-control');
export const AIRPORT_DATABASE = airControl.token('IAirportDatabase');
export const DATABASE_FACADE = airControl.token('IDatabaseFacade');
export const LOOKUP = airControl.token('ILookup');
export const ENTITY_UTILS = airControl.token('IEntityUtils');
export const FIELD_UTILS = airControl.token('IFieldUtils');
export const Q_METADATA_UTILS = airControl.token('IQMetadataUtils');
export const QUERY_CONTEXT_LOADER = airControl.token('IQueryContextLoader');
export const QUERY_FACADE = airControl.token('IQueryFacade');
export const QUERY_UTILS = airControl.token('IQueryUtils');
export const RELATION_MANAGER = airControl.token('IRelationManager');
export const REPOSITORY_LOADER = airControl.token('IRepositoryLoader');
export const SCHEMA_UTILS = airControl.token('IApplicationUtils');
export const UPDATE_CACHE_MANAGER = airControl.token('IUpdateCacheManager');
//# sourceMappingURL=tokens.js.map