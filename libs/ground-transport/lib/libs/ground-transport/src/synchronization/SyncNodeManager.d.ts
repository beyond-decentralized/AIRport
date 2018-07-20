import { MessageFromTM } from "@airport/arrivals-n-departures";
import { BatchedMessagesToTM } from "@airport/arrivals-n-departures/lib/lingo/message/MessageToTM";
import { ISharingNode, ISharingNodeDao, SharingNodeId } from "@airport/moving-walkway";
import { ITerminalStore } from "@airport/terminal-map";
import { ISharingNodeEndpoint } from "./connect/SharingNodeEndpoint";
import { ISynchronizationInManager } from "./in/SynchronizationInManager";
export interface ISyncNodeManager {
    sharingNodeEndPoint: ISharingNodeEndpoint;
    initialize(): Promise<void>;
    sendMessages(sharingNodeMap: Map<SharingNodeId, ISharingNode>, messagesBySharingNode: Map<SharingNodeId, MessageFromTM>): Promise<void>;
}
export declare class SyncNodeManager implements ISyncNodeManager {
    private sharingNodeDao;
    private synchronizationInManager;
    private terminalStore;
    sharingNodeEndPoint: ISharingNodeEndpoint;
    constructor(sharingNodeDao: ISharingNodeDao, synchronizationInManager: ISynchronizationInManager, terminalStore: ITerminalStore);
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
