import { RepositoryTransactionHistory } from '../history/RepositoryTransactionHistory';
import { Continent, Country, MetroArea, State, User } from "@airport/travel-document-checkpoint";
import { RepositoryType } from "./RepositoryType";
/**
 * Created by Papa on 2/9/2017.
 */
export declare type Repository_AgeSuitability = 0 | 7 | 13 | 18;
export declare type Repository_CreatedAt = Date;
export declare type Repository_Id = number;
export declare type Repository_Immutable = boolean;
export declare type Repository_Source = string;
export declare type Repository_GUID = string;
export declare class Repository {
    id: Repository_Id;
    ageSuitability: Repository_AgeSuitability;
    createdAt: Repository_CreatedAt;
    immutable: Repository_Immutable;
    source: Repository_Source;
    GUID: Repository_GUID;
    owner: User;
    repositoryTransactionHistory: RepositoryTransactionHistory[];
    continent?: Continent;
    country?: Country;
    state?: State;
    metroArea?: MetroArea;
    repositoryTypes: RepositoryType[];
}
//# sourceMappingURL=Repository.d.ts.map