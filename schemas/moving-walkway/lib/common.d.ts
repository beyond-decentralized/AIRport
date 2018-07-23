import { IActor, IRepository, IRepositoryTransactionHistory, ITerminal, IUser } from "@airport/holding-pattern";
import { ISchemaVersion } from "@airport/traffic-pattern";
export interface RepositoryTransactionBlockData {
    users: IUser[];
    terminal: ITerminal;
    actors: IActor[];
    referencedRepositories: IRepository[];
    repository: IRepository;
    repoTransHistories: IRepositoryTransactionHistory[];
    schemaVersions: ISchemaVersion[];
}
