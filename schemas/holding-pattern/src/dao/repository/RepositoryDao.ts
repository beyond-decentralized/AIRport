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
import { Observable } from 'rxjs'

export interface IRepositoryDao
	extends IBaseRepositoryDao {

	findByLocalId(
		repositoryLid: Repository_LocalId,
		context: IContext
	): Promise<IRepository>

	findByGUIDs(
		repositoryGUIDs: Repository_GUID[],
		context: IContext
	): Promise<IRepository[]>

	findByGUIDsAndLocalIds(
		repositoryGUIDs: Repository_GUID[],
		repositoryLocalIds: Repository_LocalId[],
		context: IContext
	): Promise<IRepository[]>

	searchRepositories(
		context: IContext
	): Observable<IRepository[]>

	searchRepositoryWithReferences(
		repositoryGUID: Repository_GUID,
		context: IContext
	): Observable<IRepository>

	findRepository(
		repositoryGUID: Repository_GUID,
		context: IContext
	): Promise<IRepository>

	findWithOwnerBy_LocalIds(
		repositoryLids: Repository_LocalId[],
		context: IContext
	): Promise<IRepository[]>;

	findWithOwnerBy_LocalIdIn(
		repository_localIds: Repository_LocalId[],
		context: IContext
	): Promise<IRepository[]>

	findAllWithLoadInfo(
		context: IContext
	): Promise<IRepository[]>

	getWithLoadInfo(
		repositoryGUID: Repository_GUID,
		context: IContext
	): Promise<IRepository>

	insert(
		repositories: IRepository[],
		context: IContext
	): Promise<void>

	updateUiEntityUri(
		repositoryGuid: string,
		uiEntityUri: string,
		context: IContext
	): Promise<void>

}

@Injected()
export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

	searchRepositories(
		context: IContext
	): Observable<IRepository[]> {
		let r: QRepository

		const repositories = this._search({
			SELECT: {
				'*': Y,
				owner: {}
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			],
			WHERE: r.internal.equals(false)
		}, context)

		return repositories as any as Observable<IRepository[]>
	}

	async findByLocalId(
		repositoryLid: Repository_LocalId,
		context: IContext
	): Promise<IRepository> {
		let r: QRepository

		const repository = await this._findOne({
			SELECT: {},
			FROM: [
				r = Q.Repository
			],
			WHERE: r._localId.equals(repositoryLid)
		}, context)

		return repository as IRepository
	}

	async findRepository(
		repositoryGUID: Repository_GUID,
		context: IContext
	): Promise<IRepository> {
		let r: QRepository

		const repository = await this._findOne({
			SELECT: {
				'*': Y,
				owner: {}
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			],
			WHERE: r.GUID.equals(repositoryGUID)
		}, context)

		return repository as IRepository
	}

	searchRepositoryWithReferences(
		repositoryGUID: Repository_GUID,
		context: IContext
	): Observable<IRepository> {
		let r: QRepository,
			rr: QRepositoryReference,
			rir: QRepositoryReference

		return this._searchOne({
			SELECT: {
				'*': Y,
				owner: {},
				referencedInRepositories: {
					referencingRepository: {}
				},
				referencedRepositories: {
					referencedRepository: {}
				}
			},
			FROM: [
				r = Q.Repository,
				r.owner.LEFT_JOIN(),
				rir = r.referencedInRepositories.LEFT_JOIN(),
				rir.referencingRepository.LEFT_JOIN(),
				rr = r.referencedRepositories.LEFT_JOIN(),
				rr.referencedRepository.LEFT_JOIN()
			],
			WHERE: r.GUID.equals(repositoryGUID)
		}, context)
	}

	async findAllWithLoadInfo(
		context: IContext
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.tree({
			SELECT: {
				'*': Y,
				repositoryTransactionHistory: {
					saveTimestamp: Y
				}
			},
			FROM: [
				r = Q.Repository,
				r.repositoryTransactionHistory.INNER_JOIN()
			]
		}, context)
	}

	async getWithLoadInfo(
		repositoryGUID: Repository_GUID,
		context: IContext
	): Promise<IRepository> {
		let r: QRepository
		let rth: QRepositoryTransactionHistory
		let th: QTransactionHistory

		return await this.db.findOne.tree({
			SELECT: {
				'*': Y,
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
		repositoryLids: Repository_LocalId[],
		context: IContext
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.tree({
			SELECT: {
				'*': Y,
				owner: {}
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			],
			WHERE: r._localId.IN(repositoryLids)
		}, context)
	}

	async findWithOwnerBy_LocalIds(
		repositoryLids: Repository_LocalId[],
		context: IContext
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.tree({
			SELECT: {
				'*': Y,
				owner: {}
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			],
			WHERE:
				r._localId.IN(repositoryLids)
		}, context)
	}

	async findWithOwnerBy_LocalIdIn(
		repository_localIds: Repository_LocalId[],
		context: IContext
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.graph({
			SELECT: {
				'*': Y,
				owner: {}
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN()
			],
			WHERE:
				r._localId.IN(repository_localIds)
		}, context)
	}

	async findByGUIDs(
		repositoryGUIDs: Repository_GUID[],
		context: IContext
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				r = Q.Repository
			],
			WHERE: r.GUID.IN(repositoryGUIDs)
		}, context)
	}

	async findByGUIDsAndLocalIds(
		repositoryGUIDs: Repository_GUID[],
		repositoryLocalIds: Repository_LocalId[],
		context: IContext
	): Promise<IRepository[]> {
		let r: QRepository

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				r = Q.Repository
			],
			WHERE: OR(
				r.GUID.IN(repositoryGUIDs),
				r._localId.IN(repositoryLocalIds),
			)
		}, context)
	}

	async insert(
		repositories: IRepository[],
		context: IContext
	): Promise<void> {
		let r: QRepository
		const VALUES = []
		for (const repository of repositories) {
			VALUES.push([
				repository.ageSuitability, repository.createdAt,
				repository.fullApplicationName, repository.GUID,
				repository.immutable, repository.internal,
				repository.isPublic, repository.name,
				repository.source, repository.uiEntryUri,
				repository.isLoaded, repository.owner._localId
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			INSERT_INTO: r = Q.Repository,
			columns: [
				r.ageSuitability,
				r.createdAt,
				r.fullApplicationName,
				r.GUID,
				r.immutable,
				r.internal,
				r.isPublic,
				r.name,
				r.source,
				r.uiEntryUri,
				r.isLoaded,
				r.owner._localId
			],
			VALUES
		}, {
			...context,
			generateOnSync: true
		})
		for (let i = 0; i < repositories.length; i++) {
			let repository = repositories[i]
			repository._localId = _localIds[i][0]
		}
	}

	async updateUiEntityUri(
		repositoryGuid: string,
		uiEntityUri: string,
		context: IContext
	): Promise<void> {
		let r: QRepository;

		await this.db.updateColumnsWhere({
			UPDATE: r = Q.Repository,
			SET: {
				UI_ENTRY_URI: uiEntityUri
			},
			WHERE: r.GUID.equals(repositoryGuid)
		}, context)
	}

}
