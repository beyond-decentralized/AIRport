import { IDatabase } from "@airport/holding-pattern";
import { IRepositoryTransactionHistory } from "@airport/holding-pattern/lib/generated/history/qrepositorytransactionhistory";
import { IActor } from "@airport/holding-pattern/lib/generated/infrastructure/qactor";
import { IUser } from "@airport/holding-pattern/lib/generated/infrastructure/quser";
import { IRepository } from "@airport/holding-pattern/lib/generated/repository/qrepository";
import { ISchema } from "@airport/traffic-pattern";
export interface RepositoryTransactionBlockData {
    users: IUser[];
    database: IDatabase;
    actors: IActor[];
    referencedRepositories: IRepository[];
    repository: IRepository;
    repoTransHistories: IRepositoryTransactionHistory[];
    schemas: ISchema[];
}
