import { lib } from '@airport/di'
import { IApplicationApi } from './api/ApplicationApi'
import { ISequenceDao } from './dao/SequenceDao'
import { ITerminalRunDao } from './dao/TerminalRunDao'

const airportCode = lib('airport-code')

export const SEQUENCE_DAO = airportCode.token<ISequenceDao>('ISequenceDao')
export const TERMINAL_RUN_DAO = airportCode.token<ITerminalRunDao>('ITerminalRunDao')
export const APPLICATION_API = airportCode.token<IApplicationApi>('IApplicationApi')
