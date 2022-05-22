import { IContext } from '@airport/direction-indicator';
import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { ITerminalDao } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface ISyncInTerminalChecker {
    ensureTerminals(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
}
export declare class SyncInTerminalChecker implements ISyncInTerminalChecker {
    terminalDao: ITerminalDao;
    ensureTerminals(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
    private addMissingTerminals;
}
//# sourceMappingURL=SyncInTerminalChecker.d.ts.map