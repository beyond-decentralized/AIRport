import { ISharingMessage } from "@airport/moving-walkway";
import { ISyncLogToTM } from "../SynchronizationInManager";
import { IDataToTM } from "../SyncInUtils";
export interface SyncInMessageWithContent {
    sharingMessage: ISharingMessage;
    dataMessages: IDataToTM[];
    syncLogMessages: ISyncLogToTM[];
}
