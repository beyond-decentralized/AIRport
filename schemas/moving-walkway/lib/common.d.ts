import { IActor, IRepository, IRepositoryTransactionHistory } from "@airport/holding-pattern";
import { IDomain, ISchema, ISchemaVersion } from "@airport/airspace";
import { ITerminal, IUser } from '@airport/travel-document-checkpoint';
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
//# sourceMappingURL=common.d.ts.map