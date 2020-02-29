import {DI}                              from '@airport/di/lib/src'
import {
	DataOrigin,
	ISharingMessage,
	ISharingNode,
	SharingMessageSyncTimestamp
}                                        from '@airport/moving-walkway'
import {SYNC_IN_SHARING_MESSAGE_CREATOR} from '../../../tokens'
import {IDataToTM}                       from '../SyncInUtils'

export interface ISyncInSharingMessageCreator {

}

export class SyncInSharingMessageCreator
	implements ISyncInSharingMessageCreator {

	createRecord(
		sharingNode: ISharingNode,
		syncTimestamp: SharingMessageSyncTimestamp
	): ISharingMessage {
		return {
			sharingNode,
			origin: DataOrigin.REMOTE,
			syncTimestamp
		}
	}

	async saveIncoming(
		dataMessages: IDataToTM[]
	): Promise<void> {
		const sharingMessages: ISharingMessage[] = []

		for (const dataMessage of dataMessages) {
			sharingMessages.push({})
		}
	}
}

DI.set(SYNC_IN_SHARING_MESSAGE_CREATOR, SyncInSharingMessageCreator)
