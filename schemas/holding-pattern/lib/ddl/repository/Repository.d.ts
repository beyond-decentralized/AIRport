import { RepositoryTransactionHistory } from '../history/RepositoryTransactionHistory';
import { Continent, Country, MetroArea, State, UserAccount } from "@airport/travel-document-checkpoint";
import { RepositoryType } from "./RepositoryType";
import { RepositoryDatabase } from "./RepositoryDatabase";
import { RepositoryClient } from "./RepositoryClient";
import { RepositoryTerminal } from "./RepositoryTerminal";
import { RepositoryApplication } from "./RepositoryApplication";
import { IRepositoryIdentifier, Repository_AgeSuitability, Repository_CreatedAt, Repository_GUID, Repository_Immutable, Repository_LocalId, Repository_Name, Repository_Source } from "../../types";
/**
 * Created by Papa on 2/9/2017.
 */
export declare class Repository implements IRepositoryIdentifier {
    _localId: Repository_LocalId;
    GUID: Repository_GUID;
    name: Repository_Name;
    ageSuitability: Repository_AgeSuitability;
    createdAt: Repository_CreatedAt;
    immutable: Repository_Immutable;
    source: Repository_Source;
    owner: UserAccount;
    repositoryTransactionHistory: RepositoryTransactionHistory[];
    continent?: Continent;
    country?: Country;
    state?: State;
    metroArea?: MetroArea;
    repositoryApplications?: RepositoryApplication[];
    repositoryClients?: RepositoryClient[];
    repositoryDatabases?: RepositoryDatabase[];
    repositoryTerminals?: RepositoryTerminal[];
    repositoryTypes?: RepositoryType[];
}
//# sourceMappingURL=Repository.d.ts.map