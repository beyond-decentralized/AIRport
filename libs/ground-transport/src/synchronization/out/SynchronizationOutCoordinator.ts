import {DI}                         from '@airport/di'
import {
	ISharingNode,
	SharingNodeSyncFrequency
}                                   from '@airport/moving-walkway'
import {
	ITerminalState,
	ITerminalStore,
	TERMINAL_STORE,
}                                   from '@airport/terminal-map'
import {ITerminal}                  from '@airport/travel-document-checkpoint'
import {AbstractCompletable}        from '../../AbstractCompletable'
import {
	SYNC_NODE_MANAGER,
	SYNC_OUT_COORDINATOR,
	SYNC_OUT_MANAGER
}                                   from '../../diTokens'
import {ISyncNodeManager}           from '../SyncNodeManager'
import {ISynchronizationOutManager} from './SynchronizationOutManager'

export interface ISynchronizationOutCoordinator {

	initialize(): Promise<void>;

}

export class SynchronizationOutCoordinator
	extends AbstractCompletable
	implements ISynchronizationOutCoordinator {

	private nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>
		        = new Map()

	private syncOutManager: ISynchronizationOutManager
	private syncNodeManager: ISyncNodeManager
	private terminalStore: ITerminalStore

	constructor() {
		super()
		DI.get((
			syncNodeManager,
			synchronizationOutManager,
			terminalStore
			) => {
				this.syncNodeManager = syncNodeManager
				this.syncOutManager  = synchronizationOutManager
				this.terminalStore   = terminalStore
			}, SYNC_NODE_MANAGER, SYNC_OUT_MANAGER,
			TERMINAL_STORE)
	}


	async initialize(): Promise<void> {
		await this.syncNodeManager.initialize()

		/*
				pipe(this.terminalStore.getTerminalState.observable, (
					terminalState: ITerminalState,
					context: any
				) => withLatestFrom([]))
				*/

		this.record(this.terminalStore.getTerminalState.observable.subscribe((
			terminalState: ITerminalState
		) => {
			if (!terminalState.terminal) {
				return
			}
			this.updateSyncPool(terminalState.nodesBySyncFrequency, terminalState.terminal)
		}))
	}

	private updateSyncPool(
		nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>,
		terminal: ITerminal,
	) {
		const lastNodesBySyncFrequency = this.nodesBySyncFrequency
		this.nodesBySyncFrequency      = nodesBySyncFrequency
		for (const [frequency, sharingNodes] of this.nodesBySyncFrequency) {
			// If in the new map there are sync node frequency that weren't in
			// the old map then kick off syncs for those frequencies
			if (!lastNodesBySyncFrequency.get(frequency)) {
				this.scheduleSyncsForFrequency(frequency, sharingNodes, terminal)
			}
		}

	}

	private returnToSyncPool(
		frequency: SharingNodeSyncFrequency,
		terminal: ITerminal,
	): void {
		const sharingNodes = this.nodesBySyncFrequency.get(frequency)
		if (!sharingNodes) {
			return
		}
		this.scheduleSyncsForFrequency(frequency, sharingNodes, terminal)
	}

	private scheduleSyncsForFrequency(
		frequency: SharingNodeSyncFrequency,
		sharingNodes: ISharingNode[],
		terminal: ITerminal,
	): void {
		setTimeout(async () => {
			await this.syncOutManager.synchronize(sharingNodes, terminal).then()
			this.returnToSyncPool(frequency, terminal)
		}, frequency)
	}

}

DI.set(SYNC_OUT_COORDINATOR, SynchronizationOutCoordinator)
