import { IActor, IRepository, IRepositoryTransactionHistory } from "@airport/holding-pattern";
import { IDomain, IApplication, IApplicationVersion } from "@airport/airspace";
import { ITerminal, IUser } from '@airport/travel-document-checkpoint';
export interface RepositoryTransactionBlockData {
    actors: IActor[];
    domains: IDomain[];
    referencedRepositories: IRepository[];
    repository: IRepository;
    repoTransHistories: IRepositoryTransactionHistory[];
    applications: IApplication[];
    applicationVersions: IApplicationVersion[];
    terminal: ITerminal;
    users: IUser[];
}
//# sourceMappingURL=common.d.ts.map