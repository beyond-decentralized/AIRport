import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { ITransactionContext } from '@airport/terminal-map';
/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {
    receiveMessages(messageMapByUuId: Map<string, RepositorySynchronizationMessage>, context: ITransactionContext): Promise<void>;
}
/**
 * Synchronization in Manager implementation.
 */
export declare class SynchronizationInManager implements ISynchronizationInManager {
    receiveMessages(messageMapByUuId: Map<string, RepositorySynchronizationMessage>, context: ITransactionContext): Promise<void>;
    private timeOrderMessages;
    private isValidLastChangeTime;
}
//# sourceMappingURL=SynchronizationInManager.d.ts.map