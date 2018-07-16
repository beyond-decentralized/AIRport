import {
	DataOrigin,
	ISharingMessage,
	ISharingNode,
	SharingMessageSyncTimestamp
}                  from "@airport/moving-walkway";
import {Service}   from "typedi";
import {IDataToTM} from "../SyncInUtils";

export interface ISyncInSharingMessageCreator {

}

@Service(SyncInSharingMessageCreator)
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
		const sharingMessages: ISharingMessage[] = [];

		for (const dataMessage of dataMessages) {
			sharingMessages.push({});
		}
	}
}