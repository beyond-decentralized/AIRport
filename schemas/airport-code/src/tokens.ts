import { lib } from '@airport/direction-indicator'
import { ISequenceDao, SequenceDao } from './dao/SequenceDao'
import { ITerminalRunDao, TerminalRunDao } from './dao/TerminalRunDao'

const airportCode = lib('@airport/airport-code')

export const SEQUENCE_DAO = airportCode.token<ISequenceDao>({
    class: SequenceDao,
    interface: 'ISequenceDao',
    token: 'SEQUENCE_DAO'
})
export const TERMINAL_RUN_DAO = airportCode.token<ITerminalRunDao>({
    class: TerminalRunDao,
    interface: 'ITerminalRunDao',
    token: 'TERMINAL_RUN_DAO'
})
