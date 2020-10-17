import { system } from '@airport/di';
const airportCode = system('airport').lib('airport-code');
export const SEQUENCE_DAO = airportCode.token();
export const TERMINAL_RUN_DAO = airportCode.token();
//# sourceMappingURL=tokens.js.map