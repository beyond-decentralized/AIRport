import {
	REPOSITORY_PROPERTY_NAME,
} from '@airport/air-traffic-control'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IRepository,
	IRepositoryDao,
	IRepositoryManager,
	Repository,
	UpdateState,
	RepositoryMember,
	RepositoryMemberDao
} from '@airport/holding-pattern/dist/app/bundle' // default
import {
	QAirEntity
} from '@airport/final-approach' // default
import {
	IKeyRingManager
} from '@airbridge/keyring/dist/app/bundle'
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
import { INTERNAL_DOMAIN } from '@airport/ground-control'
import { IUserAccount, UserAccount } from '@airport/travel-document-checkpoint'

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
	keyRingManager: IKeyRingManager

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	repositoryMemberDao: RepositoryMemberDao

	@Inject()
	terminalSessionManager: ITerminalSessionManager

	@Inject()
	terminalStore: ITerminalStore

	async createRepository(
		repositoryName: string,
		context: IApiCallContext & ITransactionContext
	): Promise<Repository> {
		const userSession = await this.terminalSessionManager.getUserSession(context)
		if (!userSession) {
			throw new Error('No User Session present')
		}

		let isInternalDomain = INTERNAL_DOMAIN === context.transaction.credentials.domain
		if (!isInternalDomain && userSession.currentRootTransaction.newRepository) {
			throw new Error(`Cannot create more than one repository per transaction:
Attempting to create a new repository and Operation Context
already contains a new repository.`)
		}

		const userAccount = isInternalDomain
			? userSession.userAccount
			: userSession.currentTransaction.actor.userAccount

		const repositoryGUID = context.newRepositoryGUID
			? context.newRepositoryGUID
			: "DEVSERVR_" + guidv4()

		let repositoryMember: RepositoryMember = null
		if (context.addRepositoryToKeyRing) {
			const newRepositoryKeyResult = await this.keyRingManager.addRepositoryKey(
				repositoryGUID,
				repositoryName,
				context
			)

			repositoryMember = this.getRepositoryMember(
				userAccount,
				newRepositoryKeyResult.memberGUID,
				newRepositoryKeyResult.publicSigningKey
			)
		}

		let repository = await this.createRepositoryRecord(
			repositoryName,
			repositoryGUID,
			repositoryMember,
			userAccount,
			isInternalDomain
				? context.applicationFullName
				: userSession.currentTransaction.actor.application.fullName,
			context)

		if (!isInternalDomain) {
			userSession.currentRootTransaction.newRepository = repository
		}

		return repository
	}

	async addRepositoryToKeyRing(
		repository: Repository,
		context: IContext
	): Promise<void> {
		const userSession = await this.terminalSessionManager.getUserSession(context)
		if (!userSession) {
			throw new Error(`No User Session found`)
		}
		const userAccount = userSession.userAccount
		if (!userAccount) {
			throw new Error(`No User Account found in User Session`)
		}

		const newRepositoryKeyResult = await this.keyRingManager.addRepositoryKey(
			repository.GUID,
			repository.name,
			context
		)

		const repositoryMember = this.getRepositoryMember(
			userAccount,
			newRepositoryKeyResult.memberGUID,
			newRepositoryKeyResult.publicSigningKey
		)

		await this.repositoryMemberDao.save(repositoryMember)
	}

	private getRepositoryMember(
		userAccount: UserAccount,
		GUID: string,
		publicSigningKey: string
	): RepositoryMember {
		const repositoryMember = new RepositoryMember()
		repositoryMember.GUID = GUID
		repositoryMember.isAdministrator = true
		repositoryMember.canWrite = true
		repositoryMember.userAccount = userAccount
		repositoryMember.publicSigningKey = publicSigningKey

		return repositoryMember
	}

	async setUiEntryUri(
		uiEntryUri: string,
		repository: Repository,
		context: IContext
	): Promise<void> {
		const userSession = await this.terminalSessionManager.getUserSession(context)

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


	private async createRepositoryRecord(
		name: string,
		GUID: string,
		repositoryMember: RepositoryMember,
		userAccount: IUserAccount,
		applicationFullName: string,
		context: IApiCallContext & ITransactionContext,
	): Promise<Repository> {
		const repository: Repository = {
			_localId: null,
			ageSuitability: 0,
			createdAt: new Date(),
			fullApplicationName: applicationFullName,
			immutable: false,
			name,
			owner: userAccount as any,
			repositoryMembers: [],
			repositoryTransactionHistory: [],
			// FIXME: propage the 
			source: 'DEVSERVR',
			uiEntryUri: null,
			GUID,
		}
		if (repositoryMember) {
			repositoryMember.repository = repository
			repository.repositoryMembers.push(repositoryMember)
		}
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
