import { TerminalMessage } from '@airport/arrivals-n-departures';
export interface ISyncInTerminalChecker {
    ensureTerminals(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInTerminalChecker implements ISyncInTerminalChecker {
    ensureTerminals(message: TerminalMessage): Promise<boolean>;
    private addMissingTerminals;
}
//# sourceMappingURL=SyncInTerminalChecker.d.ts.map