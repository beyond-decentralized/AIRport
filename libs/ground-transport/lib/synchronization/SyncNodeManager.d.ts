import { MessageFromClient } from "@airport/ground-control";
import { MessageToClient } from "@airport/ground-control/lib/lingo/sync/MessageToClient";
import { ISharingNode, ISharingNodeDao, SharingNodeId } from "@airport/moving-walkway";
import { ITerminalStore } from "../../../apps/terminal/src/+state/TerminalStore";
import { ISharingNodeEndpoint } from "./connect/SharingNodeEndpoint";
import { ISynchronizationInManager } from "./in/SynchronizationInManager";
export interface ISyncNodeManager {
    sharingNodeEndPoint: ISharingNodeEndpoint;
    initialize(): Promise<void>;
    sendMessages(sharingNodeMap: Map<SharingNodeId, ISharingNode>, messagesBySharingNode: Map<SharingNodeId, MessageFromClient>): Promise<void>;
}
export declare class SyncNodeManager implements ISyncNodeManager {
    private sharingNodeDao;
    private synchronizationInManager;
    private terminalStore;
    sharingNodeEndPoint: ISharingNodeEndpoint;
    constructor(sharingNodeDao: ISharingNodeDao, synchronizationInManager: ISynchronizationInManager, terminalStore: ITerminalStore);
    initialize(): Promise<void>;
    sendMessages(sharingNodeMap: Map<SharingNodeId, ISharingNode>, messagesBySharingNode: Map<SharingNodeId, MessageFromClient>): Promise<void>;
    sendMessage(sharingNode: ISharingNode, message: MessageFromClient): Promise<MessageToClient[]>;
    private serializeMessageDates;
    private deserializeMessageDates;
}
/**
 * NEED: a state container that can handle effects AND notifies only when
 * a given memorized selector changes value.  Notification should be an observable
 *
 */ 
