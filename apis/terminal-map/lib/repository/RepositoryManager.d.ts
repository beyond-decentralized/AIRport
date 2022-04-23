import { IEntityUpdateProperties, IQEntityInternal, RawDelete, RawInsertValues, RawUpdate } from '@airport/air-control';
import { IContext } from '@airport/direction-indicator';
import { IActor, IRepository } from '@airport/holding-pattern';
import { UpdateState } from '../core/UpdateState';
export interface IRepositoryManager {
    initialize(): Promise<void>;
    createRepository(actor: IActor, context: IContext): Promise<IRepository>;
    goOffline(): void;
    getUpdateState(repository: IRepository): UpdateState;
    setUpdateStateForAll(updateState: UpdateState): void;
    setUpdateState(repository: IRepository, updateState: UpdateState): void;
    ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal>(repository: IRepository, rawInsertValues: RawInsertValues<IQE>): RawInsertValues<IQE>;
    ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal>(qEntity: IQEntityInternal, repository: IRepository, rawUpdate: RawUpdate<IEUP, IQE>): RawUpdate<IEUP, IQE>;
    ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal>(qEntity: IQE, repository: IRepository, rawDelete: RawDelete<IQE>): RawDelete<IQE>;
}
//# sourceMappingURL=RepositoryManager.d.ts.map