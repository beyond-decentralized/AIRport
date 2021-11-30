import { TerminalMessage } from '@airport/arrivals-n-departures';
export interface ISyncInRepositoryChecker {
    ensureRepositories(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInRepositoryChecker implements ISyncInRepositoryChecker {
    ensureRepositories(message: TerminalMessage): Promise<boolean>;
    private checkRepository;
}
//# sourceMappingURL=SyncInRepositoryChecker.d.ts.map