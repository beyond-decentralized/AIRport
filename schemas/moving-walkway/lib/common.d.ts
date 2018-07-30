import { IActor, IRepository, IRepositoryTransactionHistory, ITerminal, IUser } from "@airport/holding-pattern";
import { IDomain } from "@airport/territory";
import { ISchema, ISchemaVersion } from "@airport/traffic-pattern";
export interface RepositoryTransactionBlockData {
    actors: IActor[];
    domains: IDomain[];
    referencedRepositories: IRepository[];
    repository: IRepository;
    repoTransHistories: IRepositoryTransactionHistory[];
    schemas: ISchema[];
    schemaVersions: ISchemaVersion[];
    terminal: ITerminal;
    users: IUser[];
}
