import {diToken}             from '@airport/di'
import {ITransactionManager} from './orchestration/TransactionManager'
import {ITerminalStore}      from './store/TerminalStore'

export const TERMINAL_STORE      = diToken<ITerminalStore>()
export const TRANSACTION_MANAGER = diToken<ITransactionManager>()