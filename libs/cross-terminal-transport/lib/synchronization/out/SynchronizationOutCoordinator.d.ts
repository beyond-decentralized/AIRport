import { AbstractCompletable } from '../../AbstractCompletable';
export interface ISynchronizationOutCoordinator {
    initialize(): Promise<void>;
}
export declare class SynchronizationOutCoordinator extends AbstractCompletable implements ISynchronizationOutCoordinator {
    private nodesBySyncFrequency;
    initialize(): Promise<void>;
    private updateSyncPool;
    private returnToSyncPool;
    private scheduleSyncsForFrequency;
}
//# sourceMappingURL=SynchronizationOutCoordinator.d.ts.map