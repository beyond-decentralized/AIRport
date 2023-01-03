import {
	REPOSITORY_PROPERTY_NAME,
} from '@airport/air-traffic-control'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IActor,
	IRepository,
	IRepositoryDao,
	RepositoryNestingDao,
	IRepositoryManager,
	Repository,
	RepositoryNesting,
	UpdateState
} from '@airport/holding-pattern/dist/app/bundle' // default
import {
	QAirEntity
} from '@airport/final-approach' // default
// import is reserved for Application use
import {
	AND,
	IEntityUpdateProperties,
	IQEntityInternal,
	IQOperableFieldInternal,
	RawDelete,
	RawInsertValues,
	RawUpdate,
} from '@airport/tarmaq-query'
import {
	IApiCallContext,
	ITerminalSessionManager, ITerminalStore, ITransactionContext,
} from '@airport/terminal-map'
import { v4 as guidv4 } from "uuid";

/**
 * Created by Papa on 2/12/2017.
 */

export interface RepoQueryData {
	[entityName: string]: EntityRepoQueryData;
}

export interface EntityRepoQueryData {
	qEntity: IQEntityInternal,
	idProperty: string;
}

@Injected()
export class RepositoryManager
	implements IRepositoryManager {

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	repositoryNestingDao: RepositoryNestingDao

	@Inject()
	terminalSessionManager: ITerminalSessionManager

	@Inject()
	terminalStore: ITerminalStore

	async initialize(): Promise<void> {
	}

	async createRepository(
		repositoryName: string,
		parentRepository: Repository,
		nestingType: string,
		context: IApiCallContext & ITransactionContext
	): Promise<Repository> {
		const userSession = await this.terminalSessionManager.getUserSession()
		if (userSession.currentRootTransaction.newRepository) {
			throw new Error(`Cannot create more than one repository per transaction:
Attempting to create a new repository and Operation Context
already contains a new repository.`)
		}

		let repository = await this.createRepositoryRecord(
			repositoryName, parentRepository, userSession.currentTransaction.actor, context)

		if (parentRepository) {
			await this.doAddRepositoryNesting(
				parentRepository,
				repository,
				nestingType,
				false,
				context)
		}

		userSession.currentRootTransaction.newRepository = repository

		return repository
	}

	async addRepositoryNesting(
		parentRepository: Repository,
		childRepository: Repository,
		nestingType: string,
		context: IContext
	): Promise<void> {
		await this.doAddRepositoryNesting(
			parentRepository,
			childRepository,
			nestingType,
			true,
			context)
	}

	async doAddRepositoryNesting(
		parentRepository: Repository,
		childRepository: Repository,
		nestingType: string,
		saveChildRepository: boolean,
		context: IContext
	): Promise<void> {
		childRepository.parentRepository = parentRepository

		const repositoryNesting = new RepositoryNesting()
		repositoryNesting.parentRepository = parentRepository
		repositoryNesting.childRepository = childRepository
		repositoryNesting.nestingType = nestingType
		repositoryNesting.childRepositoryName = childRepository.name
		parentRepository.repositoryNestings.push(repositoryNesting)

		if (saveChildRepository) {
			await this.repositoryDao.save(childRepository, context)
		}

		await this.repositoryNestingDao.save(repositoryNesting, context)
	}

	async setUiEntryUri(
		uiEntryUri: string,
		repository: Repository
	): Promise<void> {
		const userSession = await this.terminalSessionManager.getUserSession()

		if (userSession.currentTransaction.actor.application.fullName !== repository.fullApplicationName) {
			throw new Error(`Only the Application that created a repository may change the uiEntityUri.`);
		}

		repository.uiEntryUri = uiEntryUri
		await this.repositoryDao.updateUiEntityUri(repository.GUID, uiEntryUri)
	}

	goOffline(): void {
		throw new Error(`not implemented`)
	}

	getUpdateState(repository: IRepository): UpdateState {
		throw new Error(`not implemented`)
	}

	setUpdateStateForAll(updateState: UpdateState): void {
		throw new Error(`not implemented`)
	}

	setUpdateState(
		repository: IRepository,
		updateState: UpdateState
	): void {
		throw new Error(`not implemented`)
	}


	private getRepositoryRecord(
		name: string,
		actor: IActor
	): Repository {
		const repository: Repository = {
			_localId: null,
			ageSuitability: 0,
			createdAt: new Date(),
			fullApplicationName: actor.application.fullName,
			immutable: false,
			name,
			owner: actor.userAccount as any,
			parentRepository: null,
			repositoryMembers: [],
			repositoryNestings: [],
			repositoryTransactionHistory: [],
			// FIXME: propage the 
			source: 'localhost:9000',
			uiEntryUri: null,
			GUID: guidv4(),
		}

		return repository
	}

	private async createRepositoryRecord(
		name: string,
		parentRepository: Repository,
		actor: IActor,
		context: IApiCallContext & ITransactionContext,
	): Promise<Repository> {
		const repository = this.getRepositoryRecord(name, actor)
		repository.parentRepository = parentRepository

		await this.repositoryDao.save(repository, context)

		return repository
	}

	ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal>(
		repository: IRepository,
		rawInsertValues: RawInsertValues<IQE>
	): RawInsertValues<IQE> {
		let qEntity = rawInsertValues.INSERT_INTO
		if (!qEntity.__driver__.dbEntity.isAirEntity) {
			return rawInsertValues
		}

		let columns = rawInsertValues.columns.slice()
		if (columns.some((
			column: IQOperableFieldInternal<any, any, any, any>,
			index
		) => {
			// return column.fieldName === REPOSITORY_PROPERTY_NAME
			return column.dbProperty.name === REPOSITORY_PROPERTY_NAME
		})) {
			return rawInsertValues
		}
		columns.push(qEntity[REPOSITORY_PROPERTY_NAME])

		let VALUES = rawInsertValues.VALUES.slice()
		for (let i = 0; i < VALUES.length; i++) {
			let row = VALUES[i].slice()
			VALUES[i] = row
			row.push(repository._localId)
		}

		return {
			INSERT_INTO: qEntity, columns, VALUES
		}
	}

	ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal>(
		qEntity: IQEntityInternal,
		repository: IRepository,
		rawUpdate: RawUpdate<IEUP, IQE>
	): RawUpdate<IEUP, IQE> {
		if (!qEntity.__driver__.dbEntity.isAirEntity) {
			return
		}
		return {
			UPDATE: rawUpdate.UPDATE,
			SET: rawUpdate.SET,
			WHERE: AND(rawUpdate.WHERE, (<QAirEntity><any>qEntity).repository._localId.equals(repository._localId))
		}
	}

	ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal>(
		qEntity: IQE,
		repository: IRepository,
		rawDelete: RawDelete<IQE>
	): RawDelete<IQE> {
		if (!qEntity.__driver__.dbEntity.isAirEntity) {
			return
		}
		return {
			DELETE_FROM: rawDelete.DELETE_FROM,
			WHERE: AND(rawDelete.WHERE, (<QAirEntity><any>qEntity).repository._localId.equals(repository._localId))
		}
	}

}
