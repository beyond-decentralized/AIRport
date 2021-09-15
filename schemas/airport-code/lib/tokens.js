import { lib } from '@airport/di';
const airportCode = lib('airport-code');
export const SEQUENCE_DAO = airportCode.token('ISequenceDao');
export const TERMINAL_RUN_DAO = airportCode.token('ITerminalRunDao');
export const SCHEMA_API = airportCode.token('ISchemaApi');
//# sourceMappingURL=tokens.js.map