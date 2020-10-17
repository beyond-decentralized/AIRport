import { Actor } from '../infrastructure/Actor';
import { Repository } from '../repository/Repository';
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory';
import { RepoTransHistoryChangedReferenceType } from './RepoTransHistoryChangedReferenceType';
export declare type RepoTransHistoryChangedRepositoryActorId = number;
export declare class RepoTransHistoryChangedRepositoryActor {
    id: RepoTransHistoryChangedRepositoryActorId;
    repositoryTransactionHistory: RepositoryTransactionHistory;
    repository: Repository;
    actor: Actor;
    referenceType: RepoTransHistoryChangedReferenceType;
}
//# sourceMappingURL=RepoTransHistoryChangedRepositoryActor.d.ts.map