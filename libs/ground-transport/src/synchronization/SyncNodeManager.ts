import {
	BatchedMessagesToTM,
	MessageFromTM
}                             from '@airport/arrivals-n-departures'
import {container, DI}                   from '@airport/di'
import {
	ISharingNode,
	ISharingNodeTerminal,
	SHARING_NODE_DAO,
	SHARING_NODE_TERMINAL_DAO,
	SharingNode_Id
}                             from '@airport/moving-walkway'
import {TERMINAL_STORE}       from '@airport/terminal-map'
import {
	SYNCHRONIZATION_IN_MANAGER,
	SYNC_NODE_MANAGER,
}                             from '../tokens'

export interface ISyncNodeManager {

	sharingNodeEndPoint: ISharingNodeEndpoint;

	initialize(): Promise<void>;

	sendMessages(
		sharingNodeMap: Map<SharingNode_Id, ISharingNode>,
		messagesBySharingNode: Map<SharingNode_Id, MessageFromTM>
	): Promise<void>;

}

export class SyncNodeManager
	implements ISyncNodeManager {

	sharingNodeEndPoint: ISharingNodeEndpoint

	async initialize(): Promise<void> {
		const [sharingNodeDao, terminalStore] = await container(this).get(
			SHARING_NODE_DAO, TERMINAL_STORE)

		const nodesBySyncFrequency = await sharingNodeDao.findAllGroupedBySyncFrequency()
		terminalStore.nodesBySyncFrequency.next(nodesBySyncFrequency)
	}

	async sendMessages(
		sharingNodeMap: Map<SharingNode_Id, ISharingNode>,
		messagesBySharingNode: Map<SharingNode_Id, MessageFromTM>
	): Promise<void> {
		const [sharingNodeDao,
			      sharingNodeTerminalDao,
			      synchronizationInManager,
			      terminalStore] = await container(this).get(
			SYNC_NODE_MANAGER, SHARING_NODE_TERMINAL_DAO,
			SYNCHRONIZATION_IN_MANAGER, TERMINAL_STORE)
		let terminal
		terminalStore.terminal.subscribe((
			theTerminal
			) => terminal = theTerminal
		).unsubscribe()
		const sharingNodeTerminalMap: Map<SharingNode_Id, ISharingNodeTerminal>
			      = await sharingNodeTerminalDao
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


		await synchronizationInManager.receiveMessages(
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
