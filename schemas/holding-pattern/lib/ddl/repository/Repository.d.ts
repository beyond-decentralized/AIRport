import { Actor } from '../infrastructure/Actor';
import { RepositoryActor } from '../repository/RepositoryActor';
import { RepositoryTransactionHistory } from '../history/RepositoryTransactionHistory';
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
    createdAt: Repository_CreatedAt;
    uuId: Repository_UuId;
    ageSuitability: Repository_AgeSuitability;
    source: Repository_Source;
    immutable: Repository_Immutable;
    ownerActor: Actor;
    repositoryActors: RepositoryActor[];
    repositoryTransactionHistory: RepositoryTransactionHistory[];
}
//# sourceMappingURL=Repository.d.ts.map