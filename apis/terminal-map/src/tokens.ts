import {system}                  from '@airport/di'
import {ITransactionManager} from './transaction/TransactionManager'
import {ITerminalStore}      from './store/TerminalStore'
import { ITransactionalServer } from './transaction/ITransactionalServer'

const terminalMap = system('airport').lib('terminal-map')

export const TERMINAL_STORE      = terminalMap.token<ITerminalStore>('ITerminalStore')
export const TRANSACTION_MANAGER = terminalMap.token<ITransactionManager>('ITransactionManager')
export const TRANSACTIONAL_SERVER = terminalMap.token<ITransactionalServer>('ITransactionalServer')
