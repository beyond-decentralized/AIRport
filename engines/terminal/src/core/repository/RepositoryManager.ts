import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IRepositoryDao
} from '@airport/holding-pattern/dist/app/bundle' // default
import {
	QInternalAirEntity
} from '@airport/final-approach/dist/app/bundle' // default
import {
	IRepositoryMaintenanceManager
} from '@airbridge/sso'
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
	IRepositoryManager,
	ITerminalSessionManager,
	ITerminalStore,
	ITransactionContext,
} from '@airport/terminal-map'
import { v4 as guidv4 } from "uuid";
import { Dictionary, IAppTrackerUtils, IRepository, IUserAccount, Repository_Internal, Repository_IsPublic, UpdateState } from '@airport/ground-control'

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
	appTrackerUtils: IAppTrackerUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	repositoryMaintenanceManager: IRepositoryMaintenanceManager

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	terminalSessionManager: ITerminalSessionManager

	@Inject()
	terminalStore: ITerminalStore

	async createRepository(
		repositoryName: string,
		internal: Repository_Internal,
		isPublic: Repository_IsPublic,
		context: IApiCallContext & ITransactionContext
	): Promise<IRepository> {
		const userSession = await this.terminalSessionManager.getUserSession()

		let haveUserSession = userSession.currentRootTransaction
			&& userSession.currentTransaction
		if (haveUserSession && userSession.currentRootTransaction.newRepository) {
			throw new Error(`Cannot create more than one repository per transaction:
Attempting to create a new repository and Operation Context
already contains a new repository.`)
		}

		const userAccount = haveUserSession
			? userSession.currentTransaction.actor.userAccount
			: userSession.userAccount

		const repositoryGUID = context.newRepositoryGUID
			? context.newRepositoryGUID
			: 'DEVSERVR_' + guidv4()

		let applicationFullName
		if (haveUserSession) {
			applicationFullName = userSession.currentTransaction
				.parentTransaction.actor.application.fullName
		} else {
			applicationFullName = context.applicationFullName
		}

		let repository = await this.createRepositoryRecord(
			repositoryName,
			repositoryGUID,
			userAccount,
			applicationFullName,
			internal,
			isPublic,
			context)

		if (haveUserSession) {
			userSession.currentRootTransaction.newRepository = repository
		}

		await this.repositoryMaintenanceManager.createRepositoryMember(
			repository,
			userAccount,
			true,
			true,
			true,
			!context.forKeyRingRepository,
			context
		)

		return repository
	}

	async addRepositoryToKeyRing(
		repository: IRepository,
		context: IContext
	): Promise<void> {
		const userAccount = await this.terminalSessionManager.getUserAccountFromSession()

		throw new Error(`Implement`)

	}

	async setUiEntryUri(
		uiEntryUri: string,
		repository: IRepository,
		context: IContext
	): Promise<void> {
		const userSession = await this.terminalSessionManager.getUserSession()

		if (userSession.currentTransaction.parentTransaction.actor
			.application.fullName !== repository.fullApplicationName) {
			throw new Error(`Only the Application that created a repository may change the uiEntityUri.`);
		}

		repository.uiEntryUri = uiEntryUri
		await this.repositoryDao.updateUiEntityUri(
			repository.GUID, uiEntryUri, context)
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

	private async createRepositoryRecord(
		name: string,
		GUID: string,
		userAccount: IUserAccount,
		applicationFullName: string,
		internal: Repository_Internal,
		isPublic: Repository_IsPublic,
		context: IApiCallContext & ITransactionContext,
	): Promise<IRepository> {
		const repository: IRepository = {
			_localId: null,
			ageSuitability: 0,
			createdAt: new Date(),
			fullApplicationName: applicationFullName,
			immutable: false,
			internal,
			isLoaded: true,
			isPublic,
			name,
			owner: userAccount as any,
			repositoryTransactionHistory: [],
			// FIXME: propage the 
			source: 'DEVSERVR',
			uiEntryUri: null,
			GUID,
		} as any

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

		const repositoryPropertyName = this.dictionary.AirEntityId.properties.repository
		let columns = rawInsertValues.columns.slice()
		if (columns.some((
			column: IQOperableFieldInternal<any, any, any, any>,
			_index
		) => {
			// return column.fieldName === repositoryPropertyName
			return column.dbProperty.name === repositoryPropertyName
		})) {
			return rawInsertValues
		}
		columns.push(qEntity[repositoryPropertyName])

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
			WHERE: AND(rawUpdate.WHERE, (<QInternalAirEntity><any>qEntity).repository._localId.equals(repository._localId))
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
			WHERE: AND(rawDelete.WHERE, (<QInternalAirEntity><any>qEntity).repository._localId.equals(repository._localId))
		}
	}

}
