import { ISequence } from '@airport/airport-code'
import { IMessageInRecord, LastIds } from '@airport/apron'
import { Injected } from '@airport/direction-indicator'
import { IActor } from '@airport/holding-pattern-runtime'
import type {
	IDomain,
	IApplication
} from '@airport/airspace'
import type { ITerminal } from '@airport/travel-document-checkpoint-runtime'
import {
	IPendingTransaction,
} from './TerminalStore'
import { internalTerminalState } from './theState'
import { Subject, Subscription } from 'rxjs'
import { ITransaction } from '../transaction/ITransaction'
import { ITransactionCredentials } from '../Credentials'
import { FullApplicationName } from '@airport/ground-control'

export interface IReceiverState {
	initializingApps: Set<FullApplicationName>
	initializedApps: Set<FullApplicationName>
}

export interface IWebReceiverState {
	domainPrefix: string
	localDomain: string
	mainDomainFragments: string[]
	onClientMessageCallback: (
		message: any
	) => void
	pendingApplicationCounts: Map<string, number>
	pendingHostCounts: Map<string, number>
	pendingInterAppApiCallMessageMap: Map<string, IMessageInRecord>
	subsriptionMap: Map<string, Map<string, Subscription>>
}

export interface InternalConnectorState {
	dbName: string
	internalCredentials: ITransactionCredentials
	serverUrl: string
}
export interface ITransactionManagerState {
	pendingTransactionQueue: IPendingTransaction[]
	transactionInProgressMap: Map<string, ITransaction>
	rootTransactionInProgressMap: Map<string, ITransaction>
}

export interface ISequenceGeneratorState {
	sequences: ISequence[][][]
	sequenceBlocks: number[][][]
	generatingSequenceNumbers: boolean
}

export interface IApplicationInitializerState {
	applicationWindowMap: Map<FullApplicationName, Window>
	initializingApplicationMap: Map<FullApplicationName, boolean>
}

export interface ITerminalState {
	applicationActors: IActor[]
	applicationInitializer: IApplicationInitializerState
	applications: IApplication[]
	domains: IDomain[]
	frameworkActor: IActor
	internalConnector: InternalConnectorState
	lastIds: LastIds
	receiver: IReceiverState
	sequenceGenerator: ISequenceGeneratorState
	terminal: ITerminal
	transactionManager: ITransactionManagerState
	webReceiver: IWebReceiverState

}

export interface ITerminalStateContainer {
	terminalState: Subject<ITerminalState>
}

@Injected()
export class TerminalState
	implements ITerminalStateContainer {
	terminalState = internalTerminalState
}
