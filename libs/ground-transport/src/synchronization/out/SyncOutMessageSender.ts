import {MessageFromTM}       from '@airport/arrivals-n-departures'
import {DI}                  from '@airport/di'
import {
	ISharingNode,
	SharingNode_Id
}                            from '@airport/moving-walkway'
import {SYNC_OUT_MSG_SENDER} from '../../tokens'

export interface ISyncOutMessageSender {

	sendMessages(
		sharingNodeMap: Map<SharingNode_Id, ISharingNode>,
		messagesBySharingNode: Map<SharingNode_Id, MessageFromTM>
	): Promise<void>;

}

export class SyncOutMessageSender
	implements ISyncOutMessageSender {

	async sendMessages(
		sharingNodeMap: Map<SharingNode_Id, ISharingNode>,
		messagesBySharingNode: Map<SharingNode_Id, MessageFromTM>
	): Promise<void> {
		// FIXME: implement
	}

}

DI.set(SYNC_OUT_MSG_SENDER, SyncOutMessageSender)
