import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
export interface ISyncInRepositoryChecker {
    ensureRepositories(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInRepositoryChecker implements ISyncInRepositoryChecker {
    ensureRepositories(message: RepositorySynchronizationMessage): Promise<boolean>;
    private checkRepository;
}
//# sourceMappingURL=SyncInRepositoryChecker.d.ts.map