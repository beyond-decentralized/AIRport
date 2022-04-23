import { lib } from '@airport/direction-indicator'
import { ISequenceDao } from './dao/SequenceDao'
import { ITerminalRunDao } from './dao/TerminalRunDao'

const airportCode = lib('airport-code')

export const SEQUENCE_DAO = airportCode.token<ISequenceDao>('SEQUENCE_DAO')
export const TERMINAL_RUN_DAO = airportCode.token<ITerminalRunDao>('TERMINAL_RUN_DAO')
