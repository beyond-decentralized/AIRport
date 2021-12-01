import { TerminalMessage } from '@airport/arrivals-n-departures';
/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {
    receiveMessages(messageMapByUuId: Map<string, TerminalMessage>): Promise<void>;
}
/**
 * Synchronization in Manager implementation.
 */
export declare class SynchronizationInManager implements ISynchronizationInManager {
    receiveMessages(messageMapByUuId: Map<string, TerminalMessage>): Promise<void>;
    private isValidLastChangeTime;
}
//# sourceMappingURL=SynchronizationInManager.d.ts.map