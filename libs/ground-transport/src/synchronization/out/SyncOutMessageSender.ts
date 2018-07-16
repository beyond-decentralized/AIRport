import {Service} from "typedi";
import {SyncOutMessageSenderToken} from "../../../../apps/terminal/src/InjectionTokens";
import {ISharingNode, SharingNodeId} from "@airport/moving-walkway";
import {MessageFromClient} from "@airport/ground-control";

export interface ISyncOutMessageSender {

	sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromClient>
	): Promise<void>;

}

@Service(SyncOutMessageSenderToken)
export class SyncOutMessageSender
	implements ISyncOutMessageSender {

	async sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromClient>
	): Promise<void> {
		// FIXME: implement
	}

}