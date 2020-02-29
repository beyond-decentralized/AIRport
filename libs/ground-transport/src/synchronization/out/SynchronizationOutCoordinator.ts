import {container, DI}                         from '@airport/di'
import {
	ISharingNode,
	SharingNodeSyncFrequency
}                                   from '@airport/moving-walkway'
import {
	ITerminalState,
	TERMINAL_STORE,
}                                   from '@airport/terminal-map'
import {ITerminal}                  from '@airport/travel-document-checkpoint'
import {AbstractCompletable}        from '../../AbstractCompletable'
import {
	SYNC_NODE_MANAGER,
	SYNC_OUT_COORDINATOR,
	SYNC_OUT_MANAGER
}                                   from '../../tokens'
import {ISynchronizationOutManager} from './SynchronizationOutManager'

export interface ISynchronizationOutCoordinator {

	initialize(): Promise<void>;

}

export class SynchronizationOutCoordinator
	extends AbstractCompletable
	implements ISynchronizationOutCoordinator {

	private nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>
		        = new Map()

	// private syncOutManager: ISynchronizationOutManager
	// private syncNodeManager: ISyncNodeManager
	// private terminalStore: ITerminalStore

	async initialize(): Promise<void> {
		const [syncNodeManager, syncOutManager,
			      terminalStore] = await container(this).get(SYNC_NODE_MANAGER,
			SYNC_OUT_MANAGER, TERMINAL_STORE)
		await syncNodeManager.initialize()

		/*
				pipe(this.terminalStore.getTerminalState.observable, (
					terminalState: ITerminalState,
					context: any
				) => withLatestFrom([]))
				*/

		this.record(terminalStore.getTerminalState.observable.subscribe((
			terminalState: ITerminalState
		) => {
			if (!terminalState.terminal) {
				return
			}
			this.updateSyncPool(terminalState.nodesBySyncFrequency,
				terminalState.terminal, syncOutManager)
		}))
	}

	private updateSyncPool(
		nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>,
		terminal: ITerminal,
		syncOutManager: ISynchronizationOutManager
	) {
		const lastNodesBySyncFrequency = this.nodesBySyncFrequency
		this.nodesBySyncFrequency      = nodesBySyncFrequency
		for (const [frequency, sharingNodes] of this.nodesBySyncFrequency) {
			// If in the new map there are sync node frequency that weren't in
			// the old map then kick off syncs for those frequencies
			if (!lastNodesBySyncFrequency.get(frequency)) {
				this.scheduleSyncsForFrequency(
					frequency, sharingNodes, terminal, syncOutManager)
			}
		}

	}

	private returnToSyncPool(
		frequency: SharingNodeSyncFrequency,
		terminal: ITerminal,
		syncOutManager: ISynchronizationOutManager
	): void {
		const sharingNodes = this.nodesBySyncFrequency.get(frequency)
		if (!sharingNodes) {
			return
		}
		this.scheduleSyncsForFrequency(
			frequency, sharingNodes, terminal, syncOutManager)
	}

	private scheduleSyncsForFrequency(
		frequency: SharingNodeSyncFrequency,
		sharingNodes: ISharingNode[],
		terminal: ITerminal,
		syncOutManager: ISynchronizationOutManager
	): void {
		setTimeout(async () => {
			await syncOutManager.synchronize(sharingNodes, terminal)
			this.returnToSyncPool(frequency, terminal, syncOutManager)
		}, frequency)
	}

}

DI.set(SYNC_OUT_COORDINATOR, SynchronizationOutCoordinator)
