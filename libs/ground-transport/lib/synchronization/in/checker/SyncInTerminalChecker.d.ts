import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
export interface ISyncInTerminalChecker {
    ensureTerminals(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInTerminalChecker implements ISyncInTerminalChecker {
    ensureTerminals(message: RepositorySynchronizationMessage): Promise<boolean>;
    private addMissingTerminals;
}
//# sourceMappingURL=SyncInTerminalChecker.d.ts.map