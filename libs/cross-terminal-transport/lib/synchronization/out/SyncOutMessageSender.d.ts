import { MessageFromTM } from '@airport/arrivals-n-departures';
import { ISharingNode, SharingNode_Id } from '@airport/moving-walkway';
export interface ISyncOutMessageSender {
    sendMessages(sharingNodeMap: Map<SharingNode_Id, ISharingNode>, messagesBySharingNode: Map<SharingNode_Id, MessageFromTM>): Promise<void>;
}
export declare class SyncOutMessageSender implements ISyncOutMessageSender {
    sendMessages(sharingNodeMap: Map<SharingNode_Id, ISharingNode>, messagesBySharingNode: Map<SharingNode_Id, MessageFromTM>): Promise<void>;
}
//# sourceMappingURL=SyncOutMessageSender.d.ts.map