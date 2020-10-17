import { BatchedMessagesToTM, MessageFromTM } from '@airport/arrivals-n-departures';
import { ISharingNode, SharingNodeId } from '@airport/moving-walkway';
import { ISharingNodeEndpoint } from './connect/SharingNodeEndpoint';
export interface ISyncNodeManager {
    sharingNodeEndPoint: ISharingNodeEndpoint;
    initialize(): Promise<void>;
    sendMessages(sharingNodeMap: Map<SharingNodeId, ISharingNode>, messagesBySharingNode: Map<SharingNodeId, MessageFromTM>): Promise<void>;
}
export declare class SyncNodeManager implements ISyncNodeManager {
    sharingNodeEndPoint: ISharingNodeEndpoint;
    initialize(): Promise<void>;
    sendMessages(sharingNodeMap: Map<SharingNodeId, ISharingNode>, messagesBySharingNode: Map<SharingNodeId, MessageFromTM>): Promise<void>;
    sendMessage(sharingNode: ISharingNode, message: MessageFromTM): Promise<BatchedMessagesToTM>;
    private serializeMessageDates;
    private deserializeMessageDates;
}
/**
 * NEED: a state container that can handle effects AND notifies only when
 * a given memorized selector changes value.  Notification should be an observable
 *
 */
//# sourceMappingURL=SyncNodeManager.d.ts.map