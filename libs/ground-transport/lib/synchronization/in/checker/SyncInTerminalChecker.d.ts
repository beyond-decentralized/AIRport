import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { ITerminalDao } from '@airport/travel-document-checkpoint-internal';
export interface ISyncInTerminalChecker {
    ensureTerminals(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInTerminalChecker implements ISyncInTerminalChecker {
    terminalDao: ITerminalDao;
    ensureTerminals(message: RepositorySynchronizationMessage): Promise<boolean>;
    private addMissingTerminals;
}
//# sourceMappingURL=SyncInTerminalChecker.d.ts.map