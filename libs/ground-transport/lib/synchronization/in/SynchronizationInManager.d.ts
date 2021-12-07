import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IContext } from '@airport/di';
/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {
    receiveMessages(messageMapByUuId: Map<string, RepositorySynchronizationMessage>, context: IContext): Promise<void>;
}
/**
 * Synchronization in Manager implementation.
 */
export declare class SynchronizationInManager implements ISynchronizationInManager {
    receiveMessages(messageMapByUuId: Map<string, RepositorySynchronizationMessage>, context: IContext): Promise<void>;
    private timeOrderMessages;
    private isValidLastChangeTime;
}
//# sourceMappingURL=SynchronizationInManager.d.ts.map