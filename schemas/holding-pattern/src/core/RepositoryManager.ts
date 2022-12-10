import {
	IEntityUpdateProperties,
	IQEntityInternal,
	RawDelete,
	RawInsertValues,
	RawUpdate,
} from '@airport/tarmaq-query'
import { UpdateState } from './UpdateState'
import { IRepository } from '@airport/ground-control';
import { Repository } from '../ddl/ddl';
import { IContext } from '@airport/direction-indicator';

export interface IRepositoryManager {

	initialize(): Promise<void>;

	createRepository(
		repositoryName: string,
		parentRepository: Repository,
		nestingType: string,
		context: IContext
	): Promise<Repository>;

	addRepositoryNesting(
		parentRepository: Repository,
		childRepository: Repository,
		nestingType: string,
		context: IContext
	): Promise<void>;

	goOffline(): void;

	getUpdateState(repository: IRepository): UpdateState;

	setUiEntryUri(
		uiEntryUri: string,
		repository: Repository
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
