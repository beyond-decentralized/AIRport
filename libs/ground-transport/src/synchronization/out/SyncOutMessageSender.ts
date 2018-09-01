import {MessageFromTM}               from '@airport/arrivals-n-departures'
import {Service}                     from "typedi";
import {ISharingNode, SharingNodeId} from "@airport/moving-walkway";
import {SyncOutMessageSenderToken}   from '../../InjectionTokens'

export interface ISyncOutMessageSender {

	sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromTM>
	): Promise<void>;

}

@Service(SyncOutMessageSenderToken)
export class SyncOutMessageSender
	implements ISyncOutMessageSender {

	async sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromTM>
	): Promise<void> {
		// FIXME: implement
	}

}