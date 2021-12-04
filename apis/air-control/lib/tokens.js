import { lib } from '@airport/di';
const airControl = lib('air-control');
export const AIRPORT_DATABASE = airControl.token('AIRPORT_DATABASE');
export const DATABASE_FACADE = airControl.token('DATABASE_FACADE');
export const LOOKUP = airControl.token('LOOKUP');
export const ENTITY_UTILS = airControl.token('ENTITY_UTILS');
export const FIELD_UTILS = airControl.token('FIELD_UTILS');
export const Q_METADATA_UTILS = airControl.token('Q_METADATA_UTILS');
export const QUERY_CONTEXT_LOADER = airControl.token('QUERY_CONTEXT_LOADER');
export const QUERY_FACADE = airControl.token('QUERY_FACADE');
export const QUERY_UTILS = airControl.token('QUERY_UTILS');
export const RELATION_MANAGER = airControl.token('RELATION_MANAGER');
export const REPOSITORY_LOADER = airControl.token('REPOSITORY_LOADER');
export const APPLICATION_UTILS = airControl.token('APPLICATION_UTILS');
export const UPDATE_CACHE_MANAGER = airControl.token('UPDATE_CACHE_MANAGER');
//# sourceMappingURL=tokens.js.map