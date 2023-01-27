import { Inject, Injected } from '@airport/direction-indicator'
import {
	IPendingTransaction,
} from './TerminalStore'
import { Subject, Subscription } from 'rxjs'
import { ITransaction } from '../transaction/ITransaction'
import { ITransactionCredentials } from '../Credentials'
import { Application_FullName, DbApplication, DbDomain, DbSequence, IActor, IAppTrackerUtils, ITerminal } from '@airport/ground-control'
import { IMessageInRecord } from './ApplicationState'
import { LastIds } from '@airport/air-traffic-control'

export interface IReceiverState {
	initializingApps: Set<Application_FullName>
	initializedApps: Set<Application_FullName>
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
	sequences: DbSequence[][][]
	sequenceBlocks: number[][][]
	generatingSequenceNumbers: boolean
}

export interface IApplicationInitializerState {
	applicationWindowMap: Map<Application_FullName, Window>
	initializingApplicationMap: Map<Application_FullName, boolean>
}

export interface ITerminalState {
	applicationActors: IActor[]
	applicationInitializer: IApplicationInitializerState
	applicationMapByFullName: Map<Application_FullName, DbApplication>
	applications: DbApplication[]
	domains: DbDomain[]
	frameworkActor: IActor
	internalConnector: InternalConnectorState
	isServer: boolean
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

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	terminalState: Subject<ITerminalState>

	init(): void {
		this.terminalState = globalThis.internalTerminalState
		let subscription = this.terminalState.subscribe((theState) => {
			setTimeout(() => {
				this.terminalState.next({
					...theState,
					internalConnector: {
						...theState.internalConnector,
						internalCredentials: {
							...theState.internalConnector.internalCredentials,
							domain: this.appTrackerUtils.getInternalDomain()
						}
					}
				})
				subscription.unsubscribe()
			}, 10)
		})
	}

}
