import {MessageFromTM}       from '@airport/arrivals-n-departures'
import {DI}                  from '@airport/di'
import {
	ISharingNode,
	SharingNodeId
}                            from '@airport/moving-walkway'
import {SYNC_OUT_MSG_SENDER} from '../../diTokens'

export interface ISyncOutMessageSender {

	sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromTM>
	): Promise<void>;

}

export class SyncOutMessageSender
	implements ISyncOutMessageSender {

	async sendMessages(
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		messagesBySharingNode: Map<SharingNodeId, MessageFromTM>
	): Promise<void> {
		// FIXME: implement
	}

}

DI.set(SYNC_OUT_MSG_SENDER, SyncOutMessageSender)
