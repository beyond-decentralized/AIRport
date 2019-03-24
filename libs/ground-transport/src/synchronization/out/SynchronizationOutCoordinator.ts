import {DI}                         from '@airport/di'
import {
	ISharingNode,
	SharingNodeSyncFrequency
}                                   from '@airport/moving-walkway'
import {
	ITerminalStore,
	TERMINAL_STORE,
}                                   from '@airport/terminal-map'
import {ITerminal}                  from '@airport/travel-document-checkpoint'
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

	private synchronizationOutManager: ISynchronizationOutManager
	private syncNodeManager: ISyncNodeManager
	private terminalStore: ITerminalStore

	constructor() {
		super()
		DI.get(() => {

			}, SYNC_OUT_MANAGER, SYNC_NODE_MANAGER,
			TERMINAL_STORE)
	}


	async initialize(): Promise<void> {
		await this.syncNodeManager.initialize()

		this.record(this.terminalStore.nodesBySyncFrequency.pipe(
			withLatestFrom(this.terminalStore.terminal),
		).subscribe((
			[nodesBySyncFrequency, terminal]
		) => {
			if (!terminal) {
				return
			}
			this.updateSyncPool(nodesBySyncFrequency, terminal)
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
			await this.synchronizationOutManager.synchronize(sharingNodes, terminal).then()
			this.returnToSyncPool(frequency, terminal)
		}, frequency)
	}

}

DI.set(SYNC_OUT_COORDINATOR, SynchronizationOutCoordinator)
