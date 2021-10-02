import { Actor } from '../infrastructure/Actor';
import { RepositoryActor } from '../repository/RepositoryActor';
import { RepositoryApplication } from '../repository/RepositoryApplication';
import { RepositoryTransactionHistory } from '../history/RepositoryTransactionHistory';
import { SyncPriority } from "./SyncPrority";
/**
 * Created by Papa on 2/9/2017.
 */
export declare type RepositoryId = number;
export declare type RepositoryCreatedAt = Date;
export declare type RepositoryUuId = string;
export declare type RepositoryName = string;
export declare type RepositoryUrl = string;
export declare class Repository {
    id: RepositoryId;
    ownerActor: Actor;
    createdAt: RepositoryCreatedAt;
    uuId: RepositoryUuId;
    name: RepositoryName;
    url: RepositoryUrl;
    platformConfig: string;
    repositoryActors: RepositoryActor[];
    repositoryApplications: RepositoryApplication[];
    repositoryTransactionHistory: RepositoryTransactionHistory[];
    syncPriority: SyncPriority;
}
//# sourceMappingURL=Repository.d.ts.map