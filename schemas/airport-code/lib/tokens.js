import { system } from '@airport/di';
const airportCode = system('airport').lib('airport-code');
export const SEQUENCE_DAO = airportCode.token('ISequenceDao');
export const TERMINAL_RUN_DAO = airportCode.token('ITerminalRunDao');
//# sourceMappingURL=tokens.js.map