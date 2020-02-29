import { system } from '@airport/di';
const airControl = system('airport').lib('air-control');
export const AIR_DB = airControl.token();
export const DB_FACADE = airControl.token();
export const LOOKUP = airControl.token();
export const ENTITY_UTILS = airControl.token();
export const FIELD_UTILS = airControl.token();
export const Q_METADATA_UTILS = airControl.token();
export const QUERY_FACADE = airControl.token();
export const QUERY_UTILS = airControl.token();
export const SCHEMA_UTILS = airControl.token();
export const UPDATE_CACHE = airControl.token();
//# sourceMappingURL=tokens.js.map