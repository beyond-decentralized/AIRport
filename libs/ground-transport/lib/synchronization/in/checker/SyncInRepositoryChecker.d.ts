import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IRepositoryDao } from '@airport/holding-pattern-runtime';
export interface ISyncInRepositoryChecker {
    ensureRepositories(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInRepositoryChecker implements ISyncInRepositoryChecker {
    repositoryDao: IRepositoryDao;
    ensureRepositories(message: RepositorySynchronizationMessage): Promise<boolean>;
    private checkRepository;
}
//# sourceMappingURL=SyncInRepositoryChecker.d.ts.map