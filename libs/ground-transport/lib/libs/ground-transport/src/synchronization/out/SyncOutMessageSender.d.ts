import { ISharingNode, SharingNodeId } from "@airport/moving-walkway";
import { MessageFromClient } from "@airport/ground-control";
export interface ISyncOutMessageSender {
    sendMessages(sharingNodeMap: Map<SharingNodeId, ISharingNode>, messagesBySharingNode: Map<SharingNodeId, MessageFromClient>): Promise<void>;
}
export declare class SyncOutMessageSender implements ISyncOutMessageSender {
    sendMessages(sharingNodeMap: Map<SharingNodeId, ISharingNode>, messagesBySharingNode: Map<SharingNodeId, MessageFromClient>): Promise<void>;
}
