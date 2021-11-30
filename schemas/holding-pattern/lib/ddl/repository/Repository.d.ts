import { Actor } from '../infrastructure/Actor';
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
    ageSuitability: Repository_AgeSuitability;
    createdAt: Repository_CreatedAt;
    immutable: Repository_Immutable;
    source: Repository_Source;
    uuId: Repository_UuId;
    ownerActor: Actor;
    repositoryTransactionHistory: RepositoryTransactionHistory[];
}
//# sourceMappingURL=Repository.d.ts.map