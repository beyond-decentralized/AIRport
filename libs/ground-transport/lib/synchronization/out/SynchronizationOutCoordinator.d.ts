import { AbstractCompletable } from '../../AbstractCompletable';
export interface ISynchronizationOutCoordinator {
    initialize(): Promise<void>;
}
export declare class SynchronizationOutCoordinator extends AbstractCompletable implements ISynchronizationOutCoordinator {
    private nodesBySyncFrequency;
    private syncOutManager;
    private syncNodeManager;
    private terminalStore;
    constructor();
    initialize(): Promise<void>;
    private updateSyncPool;
    private returnToSyncPool;
    private scheduleSyncsForFrequency;
}
