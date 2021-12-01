import { lib } from '@airport/di';
const airportCode = lib('airport-code');
export const SEQUENCE_DAO = airportCode.token('ISequenceDao');
export const TERMINAL_RUN_DAO = airportCode.token('ITerminalRunDao');
export const APPLICATION_API = airportCode.token('IApplicationApi');
//# sourceMappingURL=tokens.js.map