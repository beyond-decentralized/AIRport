import { TerminalMessage } from '@airport/arrivals-n-departures';
/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {
    receiveMessages(messages: TerminalMessage[]): Promise<void>;
}
/**
 * Synchronization in Manager implementation.
 */
export declare class SynchronizationInManager implements ISynchronizationInManager {
    /**
     * @param {MessageToTM[][]} incomingMessages    All of the incoming messages, grouped
     *   into arrays by sharing node
     * @returns {Promise<void>}   Return when all of the messages have been processed
     */
    receiveMessages(messages: TerminalMessage[]): Promise<void>;
    private isValidLastChangeTime;
}
//# sourceMappingURL=SynchronizationInManager.d.ts.map