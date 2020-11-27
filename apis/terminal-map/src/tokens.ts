import {system}                  from '@airport/di'
import {ITransactionManager} from './orchestration/TransactionManager'
import {ITerminalStore}      from './store/TerminalStore'

const terminalMap = system('airport').lib('terminal-map')

export const TERMINAL_STORE      = terminalMap.token<ITerminalStore>('ITerminalStore')
export const TRANSACTION_MANAGER = terminalMap.token<ITransactionManager>('ITransactionManager')
