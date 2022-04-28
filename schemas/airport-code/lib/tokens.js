import { lib } from '@airport/direction-indicator';
import { SequenceDao } from './dao/SequenceDao';
import { TerminalRunDao } from './dao/TerminalRunDao';
const airportCode = lib('airport-code');
export const SEQUENCE_DAO = airportCode.token({
    class: SequenceDao,
    interface: 'ISequenceDao',
    token: 'SEQUENCE_DAO'
});
export const TERMINAL_RUN_DAO = airportCode.token({
    class: TerminalRunDao,
    interface: 'ITerminalRunDao',
    token: 'TERMINAL_RUN_DAO'
});
//# sourceMappingURL=tokens.js.map