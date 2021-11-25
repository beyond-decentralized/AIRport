import { Actor } from '../infrastructure/Actor';
import { RepositoryActor } from '../repository/RepositoryActor';
import { RepositoryTransactionHistory } from '../history/RepositoryTransactionHistory';
import { SyncPriority } from "./SyncPrority";
/**
 * Created by Papa on 2/9/2017.
 */
export declare type Repository_AgeSuitability = 0 | 7 | 13 | 18;
export declare type Repository_CreatedAt = Date;
export declare type Repository_Id = number;
export declare type Repository_Immutable = boolean;
export declare type Repository_Name = string;
export declare type Repository_Source = string;
export declare type Repository_Url = string;
export declare type Repository_UuId = string;
export declare class Repository {
    id: Repository_Id;
    ownerActor: Actor;
    createdAt: Repository_CreatedAt;
    uuId: Repository_UuId;
    ageSuitability: Repository_AgeSuitability;
    source: Repository_Source;
    immutable: Repository_Immutable;
    repositoryActors: RepositoryActor[];
    repositoryTransactionHistory: RepositoryTransactionHistory[];
    syncPriority: SyncPriority;
}
//# sourceMappingURL=Repository.d.ts.map