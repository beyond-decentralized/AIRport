import { Repository } from '../../ddl/ddl';
export declare class RepositoryApi {
    constructor();
    repositoryApi: RepositoryApi;
    findAll(): Promise<Repository[]>;
    create(repositoryName: string): Promise<Repository>;
}
//# sourceMappingURL=RepositoryApi.d.ts.map