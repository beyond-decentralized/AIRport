import { IEntityUpdateProperties, IQEntityInternal, MappedEntityArray, RawDelete, RawInsertValues, RawUpdate } from '@airport/air-control';
import { IActor, IRepository, IRepositoryTransactionHistory } from '@airport/holding-pattern';
import { IDeltaStore, IRepositoryManager, UpdateState } from '@airport/terminal-map';
import { ITerminal } from '@airport/travel-document-checkpoint';
/**
 * Created by Papa on 2/12/2017.
 */
export interface RepoQueryData {
    [entityName: string]: EntityRepoQueryData;
}
export interface EntityRepoQueryData {
    qEntity: IQEntityInternal<any>;
    idProperty: string;
}
export declare class RepositoryManager implements IRepositoryManager {
    deltaStore: {};
    repositories: IRepository[];
    repositoriesById: {
        [repositoryId: string]: IRepository;
    };
    terminal: ITerminal;
    userEmail: string;
    initialize(): Promise<void>;
    findReposWithDetailsByIds(...repositoryIds: number[]): Promise<MappedEntityArray<IRepository>>;
    createRepository(actor: IActor): Promise<IRepository>;
    getRepository(repositoryId: number): Promise<IRepository>;
    getActor(actorId: number): Promise<IActor>;
    goOffline(): void;
    getUpdateState(repository: IRepository): UpdateState;
    setUpdateStateForAll(updateState: UpdateState): void;
    setUpdateState(repository: IRepository, updateState: UpdateState): void;
    getDeltaStore(repository: IRepository): IDeltaStore;
    private ensureRepositoryRecords;
    private addDeltaStore;
    private getRepositoryRecord;
    private createRepositoryRecord;
    private ensureAndCacheRepositories;
    startEnsureGraphInSingleRepository(transaction: IRepositoryTransactionHistory): void;
    getOnlyRepositoryInDatabase(): IRepository;
    ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal<any>>(repository: IRepository, rawInsertValues: RawInsertValues<IQE>): RawInsertValues<IQE>;
    ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal<any>>(qEntity: IQEntityInternal<any>, repository: IRepository, rawUpdate: RawUpdate<IEUP, IQE>): RawUpdate<IEUP, IQE>;
    ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal<any>>(qEntity: IQE, repository: IRepository, rawDelete: RawDelete<IQE>): RawDelete<IQE>;
}
//# sourceMappingURL=RepositoryManager.d.ts.map