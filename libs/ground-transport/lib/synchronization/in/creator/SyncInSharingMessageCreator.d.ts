import { ISharingMessage, ISharingNode, SharingMessageSyncTimestamp } from "@airport/moving-walkway";
import { IDataToTM } from "../SyncInUtils";
export interface ISyncInSharingMessageCreator {
}
export declare class SyncInSharingMessageCreator implements ISyncInSharingMessageCreator {
    createRecord(sharingNode: ISharingNode, syncTimestamp: SharingMessageSyncTimestamp): ISharingMessage;
    saveIncoming(dataMessages: IDataToTM[]): Promise<void>;
}
