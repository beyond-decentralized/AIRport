import { IRepositoryManager } from '../../core/RepositoryManager';
import { RepositoryDao } from "../../dao/dao";
import { Repository } from "../../ddl/ddl";
export declare class RepositoryApi {
    repositoryDao: RepositoryDao;
    repositoryManager: IRepositoryManager;
    findAll(): Promise<Repository[]>;
    create(repositoryName: string): Promise<Repository>;
}
//# sourceMappingURL=RepositoryApi.d.ts.map