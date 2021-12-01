import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {
    receiveMessages(messageMapByUuId: Map<string, RepositorySynchronizationMessage>): Promise<void>;
}
/**
 * Synchronization in Manager implementation.
 */
export declare class SynchronizationInManager implements ISynchronizationInManager {
    receiveMessages(messageMapByUuId: Map<string, RepositorySynchronizationMessage>): Promise<void>;
    private timeOrderMessages;
    private isValidLastChangeTime;
}
//# sourceMappingURL=SynchronizationInManager.d.ts.map