import { system } from '@airport/di';
const takeoff = system('airport').lib('takeoff');
export const AIR_DB_POPULATOR = takeoff.token();
export const DDL_OBJECT_LINKER = takeoff.token();
export const DDL_OBJECT_RETRIEVER = takeoff.token();
export const QUERY_ENTITY_CLASS_CREATOR = takeoff.token();
export const QUERY_OBJECT_INITIALIZER = takeoff.token();
//# sourceMappingURL=tokens.js.map