import { IEntityUpdateProperties, IQEntityInternal, RawDelete, RawInsertValues, RawUpdate } from '@airport/air-control';
import { IActor, IRepository, IRepositoryDao } from '@airport/holding-pattern';
import { IOperationContext, IRepositoryManager, UpdateState } from '@airport/terminal-map';
/**
 * Created by Papa on 2/12/2017.
 */
export interface RepoQueryData {
    [entityName: string]: EntityRepoQueryData;
}
export interface EntityRepoQueryData {
    qEntity: IQEntityInternal;
    idProperty: string;
}
export declare class RepositoryManager implements IRepositoryManager {
    repositoryDao: IRepositoryDao;
    initialize(): Promise<void>;
    createRepository(actor: IActor, context: IOperationContext): Promise<IRepository>;
    goOffline(): void;
    getUpdateState(repository: IRepository): UpdateState;
    setUpdateStateForAll(updateState: UpdateState): void;
    setUpdateState(repository: IRepository, updateState: UpdateState): void;
    private getRepositoryRecord;
    private createRepositoryRecord;
    ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal>(repository: IRepository, rawInsertValues: RawInsertValues<IQE>): RawInsertValues<IQE>;
    ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal>(qEntity: IQEntityInternal, repository: IRepository, rawUpdate: RawUpdate<IEUP, IQE>): RawUpdate<IEUP, IQE>;
    ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal>(qEntity: IQE, repository: IRepository, rawDelete: RawDelete<IQE>): RawDelete<IQE>;
}
//# sourceMappingURL=RepositoryManager.d.ts.map