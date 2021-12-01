import { TerminalMessage } from '@airport/arrivals-n-departures';
export interface ISyncInUserChecker {
    ensureUsers(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInUserChecker implements ISyncInUserChecker {
    ensureUsers(message: TerminalMessage): Promise<boolean>;
    private addMissingUsers;
}
//# sourceMappingURL=SyncInUserChecker.d.ts.map