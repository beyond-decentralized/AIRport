import { Inject, Injected } from '@airport/direction-indicator'
import {
	IPendingTransaction,
} from './TerminalStore'
import { Subject, Subscription } from 'rxjs'
import { ITransaction } from '../transaction/ITransaction'
import { IApiCredentials } from '../ICredentials'
import { DbApplication_FullName, DbApplication, DbDomain, DbSequence, IActor, IAppTrackerUtils, ITerminal, Repository_LocalId, Repository_GUID } from '@airport/ground-control'
import { IMessageInRecord } from './IApplicationState'
import { ILastIds } from '@airport/air-traffic-control'
import { CachedSQLQuery, IFieldMapped, SerializedJSONQuery } from '../terminal-map.index'
import { Message_Id, SubscriptionId, TimeStamp } from '@airport/aviation-communication'

export interface IReceiverState {
	initializingApps: Set<DbApplication_FullName>
	initializedApps: Set<DbApplication_FullName>
}

export interface IWebReceiverState {
	domainPrefix: string
	localDomain: string
	mainDomainFragments: string[]
	onClientMessageCallback: (
		message: any
	) => void
	pendingInterAppApiCallMessageMap: Map<Message_Id, IMessageInRecord>
	subscriptionMap: Map<DbApplication_FullName, Map<SubscriptionId, {
		lastActive: TimeStamp
		subscription: Subscription
	}>>
}

export interface InternalConnectorState {
	dbName: string
	internalCredentials: IApiCredentials
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
	applicationWindowMap: Map<DbApplication_FullName, Window>
	initializingApplicationMap: Map<DbApplication_FullName, boolean>
}

export interface ITerminalState<FM extends IFieldMapped = IFieldMapped> {
	apiSubscriptionMap: Map<string, Subscription>
	applicationActors: IActor[]
	applicationInitializer: IApplicationInitializerState
	applicationMapByFullName: Map<DbApplication_FullName, DbApplication>
	applications: DbApplication[]
	domains: DbDomain[]
	frameworkActor: IActor
	internalConnector: InternalConnectorState
	isServer: boolean
	lastIds: ILastIds
	queries: Map<SerializedJSONQuery, CachedSQLQuery<FM>>
	receiver: IReceiverState
	repositoryGUIDMapByLocalIds: Map<Repository_LocalId, Repository_GUID>
	repositoryLocalIdMapByGUIDs: Map<Repository_GUID, Repository_LocalId>
	sequenceGenerator: ISequenceGeneratorState
	terminal: ITerminal
	transactionManager: ITransactionManagerState
	webReceiver: IWebReceiverState

}

export interface ITerminalStateContainer<FM extends IFieldMapped = IFieldMapped> {
	terminalState: Subject<ITerminalState<FM>>
}

@Injected()
export class TerminalState
	implements ITerminalStateContainer {

	static sharedAcrossInjectionScopes = true

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	terminalState: Subject<ITerminalState>

	init(): void {
		this.terminalState = globalThis.internalTerminalState
		let theState
		this.terminalState.subscribe((state) => {
			theState = state
		}).unsubscribe()
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
	}

}
