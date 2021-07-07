import {system}                  from '@airport/di'
import {ITransactionManager} from './transaction/TransactionManager'
import {ITerminalStore}      from './store/TerminalStore'
import { ITransactionalConnector } from './transaction/ITransactionalConnector'

const terminalMap = system('airport').lib('terminal-map')

export const TERMINAL_STORE      = terminalMap.token<ITerminalStore>('ITerminalStore')
export const TRANSACTIONAL_CONNECTOR = terminalMap.token<ITransactionalConnector>('ITransactionalConnector');
export const TRANSACTION_MANAGER = terminalMap.token<ITransactionManager>('ITransactionManager')
