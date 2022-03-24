import { lib } from '@airport/di'
import { ITransactionManager } from './orchestration/TransactionManager'
import { ITerminalStore } from './store/TerminalStore'
import { ITransactionalServer } from './transaction/ITransactionalServer'
import { ITransactionalReceiver } from './transaction/ITransactionalReceiver'
import { IApplicationInitializer, IDomainRetriever } from '.'

const terminalMap = lib('terminal-map')

export const APPLICATION_INITIALIZER = terminalMap.token<IApplicationInitializer>('APPLICATION_INITIALIZER')
export const DOMAIN_RETRIEVER = terminalMap.token<IDomainRetriever>('DOMAIN_RETRIEVER')
export const TERMINAL_STORE = terminalMap.token<ITerminalStore>('TERMINAL_STORE')
export const TRANSACTION_MANAGER = terminalMap.token<ITransactionManager>('TRANSACTION_MANAGER')
export const TRANSACTIONAL_RECEIVER = terminalMap.token<ITransactionalReceiver>('TRANSACTIONAL_RECEIVER')
export const TRANSACTIONAL_SERVER = terminalMap.token<ITransactionalServer>('TRANSACTIONAL_SERVER')
