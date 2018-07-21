import {MessageFromTM}             from "@airport/arrivals-n-departures";
import {BatchedMessagesToTM}       from "@airport/arrivals-n-departures/lib/lingo/message/MessageToTM";
import {
	ISharingNode,
	ISharingNodeDao,
	ISharingNodeTerminal,
	ISharingNodeTerminalDao,
	SharingNodeDaoToken,
	SharingNodeId,
	SharingNodeTerminalDaoToken
}                                  from "@airport/moving-walkway";
import {
	ITerminalStore,
	TerminalStoreToken
}                                  from "@airport/terminal-map";
import {
	Inject,
	Service
}                                  from "typedi";
import {
	SynchronizationInManagerToken,
	SyncNodeManagerToken,
}                                  from "../InjectionTokens";
import {ISharingNodeEndpoint}      from "./connect/SharingNodeEndpoint";
import {ISynchronizationInManager} from "./in/SynchronizationInManager";

export interface ISyncNodeManager {

	sharingNodeEndPoint: ISharingNodeEndpoint;

	initialize(): Promise<void>;

	sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromTM>
	): Promise<void>;

}

@Service(SyncNodeManagerToken)
export class SyncNodeManager
	implements ISyncNodeManager {

	sharingNodeEndPoint: ISharingNodeEndpoint;

	constructor(
		@Inject(SharingNodeDaoToken)
		private sharingNodeDao: ISharingNodeDao,
		@Inject(SharingNodeTerminalDaoToken)
		private sharingNodeTerminalDao: ISharingNodeTerminalDao,
		@Inject(SynchronizationInManagerToken)
		private synchronizationInManager: ISynchronizationInManager,
		@Inject(TerminalStoreToken)
		private terminalStore: ITerminalStore,
	) {
	}

	async initialize(): Promise<void> {
		const nodesBySyncFrequency = await this.sharingNodeDao.findAllGroupedBySyncFrequency();
		this.terminalStore.nodesBySyncFrequency.next(nodesBySyncFrequency);
	}

	async sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromTM>
	): Promise<void> {
		let terminal;
		this.terminalStore.terminal.subscribe((
			theTerminal
			) => terminal = theTerminal
		).unsubscribe();
		const sharingNodeTerminalMap: Map<SharingNodeId, ISharingNodeTerminal>
			= await this.sharingNodeTerminalDao
			.findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(
				terminal.id, Array.from(sharingNodeMap.keys())
			);

		const messageDepartures = [];
		const sharingNodes: ISharingNode[] = [];
		for (const [sharingNodeId, sharingNode] of sharingNodeMap) {
			const syncMessage = messagesBySharingNode.get(sharingNodeId);
			sharingNodes.push(sharingNode);
			messageDepartures.push(this.sendMessage(sharingNode, syncMessage));
		}

		const incomingMessages = await Promise.all(messageDepartures);


		await this.synchronizationInManager.receiveMessages(
			sharingNodes, incomingMessages, sharingNodeTerminalMap);
	}

	async sendMessage(
		sharingNode: ISharingNode,
		message: MessageFromTM
	): Promise<BatchedMessagesToTM> {
		return await this.sharingNodeEndPoint.communicateWithAGT(sharingNode, message);
	}

	private serializeMessageDates() {
		// FIXME: serialize all dates to numbers (where needed)
	}

	private deserializeMessageDates() {
		// FIXME: deserialize all numbers to Dates (where needed)
	}

}

/**
 * NEED: a state container that can handle effects AND notifies only when
 * a given memorized selector changes value.  Notification should be an observable
 *
 */