import { IActor } from '@airport/holding-pattern'
import type {
	IDomain,
	IApplication
} from '@airport/airspace'
import type { ITerminal } from '@airport/travel-document-checkpoint-internal'
import {
	InternalConnectorStore,
	IReceiverStore,
	ITransactionManagerStore,
	IWebReceiverStore
} from './TerminalStore'
import { LastIds } from '@airport/security-check'

export interface ITerminalState {

	applicationActors: IActor[]
	applications: IApplication[]
	domains: IDomain[]
	frameworkActor: IActor
	internalConnector: InternalConnectorStore
	lastIds: LastIds
	receiver: IReceiverStore
	terminal: ITerminal
	transactionManager: ITransactionManagerStore
	webReceiver: IWebReceiverStore

}
