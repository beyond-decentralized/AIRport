import { MessageFromTM } from '@airport/arrivals-n-departures';
import { ISharingNode, SharingNodeId } from '@airport/moving-walkway';
export interface ISyncOutMessageSender {
    sendMessages(sharingNodeMap: Map<SharingNodeId, ISharingNode>, messagesBySharingNode: Map<SharingNodeId, MessageFromTM>): Promise<void>;
}
export declare class SyncOutMessageSender implements ISyncOutMessageSender {
    sendMessages(sharingNodeMap: Map<SharingNodeId, ISharingNode>, messagesBySharingNode: Map<SharingNodeId, MessageFromTM>): Promise<void>;
}
//# sourceMappingURL=SyncOutMessageSender.d.ts.map