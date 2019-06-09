import {diToken}                   from '@airport/di'
import {IAbstractSequenceBlockDao} from './dao/SequenceBlockDao'
import {ISequenceDao}              from './dao/SequenceDao'
import {ITerminalRunDao}           from './dao/TerminalRunDao'

export const SEQUENCE_BLOCK_DAO = diToken<IAbstractSequenceBlockDao>()
export const SEQUENCE_DAO       = diToken<ISequenceDao>()
export const TERMINAL_RUN_DAO   = diToken<ITerminalRunDao>()
