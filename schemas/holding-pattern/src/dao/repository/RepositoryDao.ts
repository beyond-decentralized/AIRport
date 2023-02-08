import {
	AND,
	OR,
	Y
} from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import { IRepository, Repository_GUID, Repository_LocalId, TransactionType } from '@airport/ground-control'
import Q from '../../generated/qApplication'
import { BaseRepositoryDao, IBaseRepositoryDao } from '../../generated/baseDaos'
import { QRepository, QRepositoryReference, QRepositoryTransactionHistory, QTransactionHistory } from '../../generated/qInterfaces'

export interface IRepositoryDao
	extends IBaseRepositoryDao {

	findByGUIDs(
		repositoryGUIDs: Repository_GUID[]
	): Promise<IRepository[]>

	findByGUIDsAndLocalIds(
		repositoryGUIDs: Repository_GUID[],
		repositoryLocalIds: Repository_LocalId[]
	): Promise<IRepository[]>

	findRepositories(): Promise<IRepository[]>

	findRepository(
		repositoryGUID: Repository_GUID
	): Promise<IRepository>

	findRepositoryWithReferences(
		repositoryGUID: Repository_GUID
	): Promise<IRepository>

	findWithOwnerBy_LocalIds(
		repositoryIds: Repository_LocalId[]
	): Promise<IRepository[]>;

	findWithOwnerBy_LocalIdIn(
		repository_localIds: Repository_LocalId[]
	): Promise<IRepository[]>

	getRepositoryLoadInfo(
		repositoryGUID: Repository_GUID,
		context: IContext
	): Promise<IRepository>

	insert(
		repositories: IRepository[],
		context: IContext
	): Promise<void>

	updateUiEntityUri(
		repositoryGuid: string,
		uiEntityUri: string
	): Promise<void>

}

@Injected()
export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

	async findRepositories(): Promise<IRepository[]> {
		let r: QRepository

		const repositories = await this._find({
			SELECT: {
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				owner: {
					username: Y,
				},
				'*': Y,
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			]
		})

		return repositories as IRepository[]
	}

	async findRepository(
		repositoryGUID: Repository_GUID
	): Promise<IRepository> {
		let r: QRepository

		const repository = await this._findOne({
			SELECT: {
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				isPublic: Y,
				owner: {
					username: Y,
				},
				'*': Y,
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			],
			WHERE: r.GUID.equals(repositoryGUID)
		})

		return repository as IRepository
	}

	async findRepositoryWithReferences(
		repositoryGUID: Repository_GUID
	): Promise<IRepository> {
		let r: QRepository,
			rr: QRepositoryReference

		const repository = await this._findOne({
			SELECT: {
				'*': Y,
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				isPublic: Y,
				owner: {
					username: Y,
				},
				referencedRepositories: {
					referencedRepository: {}
				},
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository,
				r.owner.LEFT_JOIN(),
				rr = r.referencedRepositories.LEFT_JOIN(),
				rr.referencedRepository.LEFT_JOIN()
			],
			WHERE: r.GUID.equals(repositoryGUID)
		})

		return repository as IRepository
	}

	async getRepositoryLoadInfo(
		repositoryGUID: Repository_GUID,
		context: IContext
	): Promise<IRepository> {
		let r: QRepository
		let rth: QRepositoryTransactionHistory
		let th: QTransactionHistory

		return await this.db.findOne.tree({
			SELECT: {
				immutable: Y,
				repositoryTransactionHistory: {
					saveTimestamp: Y
				}
			},
			FROM: [
				r = Q.Repository,
				rth = r.repositoryTransactionHistory.INNER_JOIN(),
				th = rth.transactionHistory.INNER_JOIN()
			],
			WHERE: AND(
				r.GUID.equals(repositoryGUID),
				th.transactionType.equals(TransactionType.REMOTE_SYNC)
			)
		}, context)
	}

	async findReposWithDetailsAndSyncNodeIds(
		repositoryIds: Repository_LocalId[]
	): Promise<IRepository[]> {
		let r: QRepository
		const _localId = Y
		const GUID = Y

		return await this.db.find.tree({
			SELECT: {
				_localId,
				ageSuitability: Y,
				createdAt: Y,
				GUID,
				owner: {
					accountPublicSigningKey: Y
				},
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			],
			WHERE: r._localId.IN(repositoryIds)
		})
	}

	async findWithOwnerBy_LocalIds(
		repositoryIds: Repository_LocalId[]
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.tree({
			SELECT: {
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				owner: {
					accountPublicSigningKey: Y,
					username: Y
				},
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			],
			WHERE:
				r._localId.IN(repositoryIds)
		})
	}

	async findWithOwnerBy_LocalIdIn(
		repository_localIds: Repository_LocalId[]
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.graph({
			SELECT: {
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				owner: {
					accountPublicSigningKey: Y,
					username: Y
				},
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			],
			WHERE:
				r._localId.IN(repository_localIds)
		})
	}

	async findByGUIDs(
		repositoryGUIDs: Repository_GUID[]
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.tree({
			SELECT: {
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				'*': Y,
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository
			],
			WHERE: r.GUID.IN(repositoryGUIDs)
		})
	}

	async findByGUIDsAndLocalIds(
		repositoryGUIDs: Repository_GUID[],
		repositoryLocalIds: Repository_LocalId[]
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.tree({
			SELECT: {
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				'*': Y,
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository
			],
			WHERE: OR(
				r.GUID.IN(repositoryGUIDs),
				r._localId.IN(repositoryLocalIds),
			)
		})
	}

	async insert(
		repositories: IRepository[],
		context: IContext
	): Promise<void> {
		let r: QRepository
		const VALUES = []
		for (const repository of repositories) {
			VALUES.push([
				repository.createdAt, repository.GUID, repository.ageSuitability,
				repository.source, repository.immutable, repository.owner._localId,
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			INSERT_INTO: r = Q.Repository,
			columns: [
				r.createdAt,
				r.GUID,
				r.ageSuitability,
				r.source,
				r.immutable,
				r.owner._localId
			],
			VALUES
		}, context)
		for (let i = 0; i < repositories.length; i++) {
			let repository = repositories[i]
			repository._localId = _localIds[i][0]
		}
	}

	async updateUiEntityUri(
		repositoryGuid: string,
		uiEntityUri: string
	): Promise<void> {
		let r: QRepository;

		await this.db.updateColumnsWhere({
			UPDATE: r = Q.Repository,
			SET: {
				UI_ENTRY_URI: uiEntityUri
			},
			WHERE: r.GUID.equals(repositoryGuid)
		})
	}

}
