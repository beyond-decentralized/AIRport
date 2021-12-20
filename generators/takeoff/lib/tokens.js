import { lib } from '@airport/di';
const takeoff = lib('takeoff');
export const AIRPORT_DATABASE_POPULATOR = takeoff.token('AIRPORT_DATABASE_POPULATOR');
export const DDL_OBJECT_LINKER = takeoff.token('DDL_OBJECT_LINKER');
export const DDL_OBJECT_RETRIEVER = takeoff.token('DDL_OBJECT_RETRIEVER');
export const QUERY_ENTITY_CLASS_CREATOR = takeoff.token('QUERY_ENTITY_CLASS_CREATOR');
export const QUERY_OBJECT_INITIALIZER = takeoff.token('QUERY_OBJECT_INITIALIZER');
//# sourceMappingURL=tokens.js.map