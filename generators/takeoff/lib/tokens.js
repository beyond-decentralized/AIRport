import { system } from '@airport/di';
const takeoff = system('airport').lib('takeoff');
export const AIR_DB_POPULATOR = takeoff.token('IAirportDatabasePopulator');
export const DDL_OBJECT_LINKER = takeoff.token('IDdlObjectLinker');
export const DDL_OBJECT_RETRIEVER = takeoff.token('IDdlObjectRetriever');
export const QUERY_ENTITY_CLASS_CREATOR = takeoff.token('IQueryEntityClassCreator');
export const QUERY_OBJECT_INITIALIZER = takeoff.token('IQueryObjectInitializer');
//# sourceMappingURL=tokens.js.map