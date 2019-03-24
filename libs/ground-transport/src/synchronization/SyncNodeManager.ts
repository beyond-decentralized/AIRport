import {
	BatchedMessagesToTM,
	MessageFromTM
}                                  from '@airport/arrivals-n-departures'
import {DI}                        from '@airport/di'
import {
	ISharingNode,
	ISharingNodeDao,
	ISharingNodeTerminal,
	ISharingNodeTerminalDao,
	SHARING_NODE_TERMINAL_DAO,
	SharingNodeId
}                                  from '@airport/moving-walkway'
import {
	ITerminalStore,
	TERMINAL_STORE
}                                  from '@airport/terminal-map'
import {
	SYNC_IN_MANAGER,
	SYNC_NODE_MANAGER,
}                                  from '../diTokens'
import {ISharingNodeEndpoint}      from './connect/SharingNodeEndpoint'
import {ISynchronizationInManager} from './in/SynchronizationInManager'

export interface ISyncNodeManager {

	sharingNodeEndPoint: ISharingNodeEndpoint;

	initialize(): Promise<void>;

	sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromTM>
	): Promise<void>;

}

export class SyncNodeManager
	implements ISyncNodeManager {

	sharingNodeEndPoint: ISharingNodeEndpoint

	private sharingNodeDao: ISharingNodeDao
	private sharingNodeTerminalDao: ISharingNodeTerminalDao
	private synchronizationInManager: ISynchronizationInManager
	private terminalStore: ITerminalStore

	constructor() {
		DI.get((
			sharingNodeDao,
			sharingNodeTerminalDao,
			synchronizationInManager,
			terminalStore
			) => {
				this.sharingNodeDao           = sharingNodeDao
				this.sharingNodeTerminalDao   = sharingNodeTerminalDao
				this.synchronizationInManager = synchronizationInManager
				this.terminalStore            = terminalStore
			}, SYNC_NODE_MANAGER, SHARING_NODE_TERMINAL_DAO,
			SYNC_IN_MANAGER, TERMINAL_STORE)
	}

	async initialize(): Promise<void> {
		const nodesBySyncFrequency = await this.sharingNodeDao.findAllGroupedBySyncFrequency()
		this.terminalStore.nodesBySyncFrequency.next(nodesBySyncFrequency)
	}

	async sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromTM>
	): Promise<void> {
		let terminal
		this.terminalStore.terminal.subscribe((
			theTerminal
			) => terminal = theTerminal
		).unsubscribe()
		const sharingNodeTerminalMap: Map<SharingNodeId, ISharingNodeTerminal>
			      = await this.sharingNodeTerminalDao
			.findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(
				terminal.id, Array.from(sharingNodeMap.keys())
			)

		const messageDepartures            = []
		const sharingNodes: ISharingNode[] = []
		for (const [sharingNodeId, sharingNode] of sharingNodeMap) {
			const syncMessage = messagesBySharingNode.get(sharingNodeId)
			sharingNodes.push(sharingNode)
			messageDepartures.push(this.sendMessage(sharingNode, syncMessage))
		}

		const incomingMessages = await Promise.all(messageDepartures)


		await this.synchronizationInManager.receiveMessages(
			sharingNodes, incomingMessages, sharingNodeTerminalMap)
	}

	async sendMessage(
		sharingNode: ISharingNode,
		message: MessageFromTM
	): Promise<BatchedMessagesToTM> {
		return await this.sharingNodeEndPoint.communicateWithAGT(sharingNode, message)
	}

	private serializeMessageDates() {
		// FIXME: serialize all dates to numbers (where needed)
	}

	private deserializeMessageDates() {
		// FIXME: deserialize all numbers to Dates (where needed)
	}

}

DI.set(SYNC_NODE_MANAGER, SyncNodeManager)

/**
 * NEED: a state container that can handle effects AND notifies only when
 * a given memorized selector changes value.  Notification should be an observable
 *
 */