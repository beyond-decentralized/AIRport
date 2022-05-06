import { RepositoryTransactionHistory } from '../history/RepositoryTransactionHistory';
import { User } from "@airport/travel-document-checkpoint-runtime";
/**
 * Created by Papa on 2/9/2017.
 */
export declare type Repository_AgeSuitability = 0 | 7 | 13 | 18;
export declare type Repository_CreatedAt = Date;
export declare type Repository_Id = number;
export declare type Repository_Immutable = boolean;
export declare type Repository_Source = string;
export declare type Repository_UuId = string;
export declare class Repository {
    id: Repository_Id;
    ageSuitability: Repository_AgeSuitability;
    createdAt: Repository_CreatedAt;
    immutable: Repository_Immutable;
    source: Repository_Source;
    uuId: Repository_UuId;
    owner: User;
    repositoryTransactionHistory: RepositoryTransactionHistory[];
}
//# sourceMappingURL=Repository.d.ts.map