import {
	IEntityUpdateProperties,
	IQEntityInternal,
	RawDelete,
	RawInsertValues,
	RawUpdate,
} from '@airport/tarmaq-query'
import { IRepository, UpdateState } from '@airport/ground-control';
import { IContext } from '@airport/direction-indicator';

export interface IRepositoryManager {

	createRepository(
		repositoryName: string,
		context: IContext
	): Promise<IRepository>

	addRepositoryToKeyRing(
		repository: IRepository,
		context: IContext
	): Promise<void>

	goOffline(): void;

	getUpdateState(repository: IRepository): UpdateState;

	setUiEntryUri(
		uiEntryUri: string,
		repository: IRepository,
		context: IContext
	): Promise<void>

	setUpdateStateForAll(updateState: UpdateState): void;

	setUpdateState(
		repository: IRepository,
		updateState: UpdateState
	): void;

	ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal>(
		repository: IRepository,
		rawInsertValues: RawInsertValues<IQE>
	): RawInsertValues<IQE>;

	ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal>(
		qEntity: IQEntityInternal,
		repository: IRepository,
		rawUpdate: RawUpdate<IEUP, IQE>
	): RawUpdate<IEUP, IQE>;

	ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal>(
		qEntity: IQE,
		repository: IRepository,
		rawDelete: RawDelete<IQE>
	): RawDelete<IQE>;

}
