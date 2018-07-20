import { ISyncNodeManager } from "../SyncNodeManager";
import { ITerminalStore } from "../../../../apps/terminal/src/+state/TerminalStore";
import { AbstractCompletable } from "../../../../apps/terminal/src/core/AbstractCompletable";
import { ISynchronizationOutManager } from "./SynchronizationOutManager";
export interface ISynchronizationOutCoordinator {
    initialize(): Promise<void>;
}
export declare class SynchronizationOutCoordinator extends AbstractCompletable implements ISynchronizationOutCoordinator {
    private synchronizationOutManager;
    private syncNodeManager;
    private terminalStore;
    private nodesBySyncFrequency;
    constructor(synchronizationOutManager: ISynchronizationOutManager, syncNodeManager: ISyncNodeManager, terminalStore: ITerminalStore);
    initialize(): Promise<void>;
    private updateSyncPool;
    private returnToSyncPool;
    private scheduleSyncsForFrequency;
}
