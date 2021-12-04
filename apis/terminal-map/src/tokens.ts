import {system}                  from '@airport/di'
import {ITransactionManager} from './orchestration/TransactionManager'
import {ITerminalStore}      from './store/TerminalStore'
import { ITransactionalServer } from './transaction/ITransactionalServer'
import { ITransactionalReceiver } from './transaction/ITransactionalReceiver'

const terminalMap = system('airport').lib('terminal-map')

export const TERMINAL_STORE      = terminalMap.token<ITerminalStore>('TERMINAL_STORE')
export const TRANSACTION_MANAGER = terminalMap.token<ITransactionManager>('TRANSACTION_MANAGER')
export const TRANSACTIONAL_RECEIVER = terminalMap.token<ITransactionalReceiver>('TRANSACTIONAL_RECEIVER')
export const TRANSACTIONAL_SERVER = terminalMap.token<ITransactionalServer>('TRANSACTIONAL_SERVER')
