import { Actor } from '../infrastructure/Actor';
import { RepositoryActor } from '../repository/RepositoryActor';
import { RepositoryApplication } from '../repository/RepositoryApplication';
import { RepositoryTransactionHistory } from '../history/RepositoryTransactionHistory';
import { SyncPriority } from "./SyncPrority";
/**
 * Created by Papa on 2/9/2017.
 */
export declare type RepositoryId = number;
export declare type RepositoryOrderedId = number;
export declare type RepositoryRandomId = number;
export declare type RepositoryName = string;
export declare type RepositoryUrl = string;
export declare class Repository {
    id: RepositoryId;
    ownerActor: Actor;
    orderedId: RepositoryOrderedId;
    randomId: RepositoryRandomId;
    name: RepositoryName;
    url: RepositoryUrl;
    platformConfig: string;
    repositoryActors: RepositoryActor[];
    repositoryApplications: RepositoryApplication[];
    repositoryTransactionHistory: RepositoryTransactionHistory[];
    syncPriority: SyncPriority;
}
//# sourceMappingURL=Repository.d.ts.map