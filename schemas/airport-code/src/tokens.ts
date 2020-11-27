import {system}                  from '@airport/di'
import {ISequenceDao}              from './dao/SequenceDao'
import {ITerminalRunDao}           from './dao/TerminalRunDao'

const airportCode = system('airport').lib('airport-code')

export const SEQUENCE_DAO       = airportCode.token<ISequenceDao>('ISequenceDao')
export const TERMINAL_RUN_DAO   = airportCode.token<ITerminalRunDao>('ITerminalRunDao')
