import { Injected } from '@airport/direction-indicator'
import { IActor } from '@airport/holding-pattern-runtime'
import type {
	IDomain,
	IApplication
} from '@airport/airspace'
import type { ITerminal } from '@airport/travel-document-checkpoint-runtime'
import {
	InternalConnectorStore,
	IReceiverStore,
	ITransactionManagerStore,
	IWebReceiverStore
} from './TerminalStore'
import { LastIds } from '@airport/apron'
import { internalTerminalState } from './theState'
import { Subject } from 'rxjs'

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

export interface ITerminalStateContainer {
	terminalState: Subject<ITerminalState>
}

@Injected()
export class TerminalState
	implements ITerminalStateContainer {
	terminalState = internalTerminalState
}
