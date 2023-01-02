import {
	AND,
	Y
} from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import { TransactionType } from '@airport/ground-control'
import {
	QUserAccount,
	Terminal_GUID,
	UserAccount_GUID
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import {
	Actor_GUID, Repository,
} from '../../ddl/ddl'
import {
	BaseRepositoryDao,
	IBaseRepositoryDao,
	IRepository,
	QRepository,
	QRepositoryNesting,
	QRepositoryTransactionHistory,
	QTransactionHistory,
} from '../../generated/generated'
import Q from '../../generated/qApplication'
import { Repository_GUID, Repository_LocalId, Repository_Source } from '../../types'

export interface IRepositoryDao
	extends IBaseRepositoryDao {

	findByGUIDs(
		repositoryGUIDs: Repository_GUID[],
	): Promise<IRepository[]>

	findRootRepositories(): Promise<Repository[]>

	findRepository(
		repositoryGUID: Repository_GUID
	): Promise<Repository>

	findWithOwnerBy_LocalIds(
		repositoryIds: Repository_LocalId[]
	): Promise<IRepository[]>;

	findWithOwnerBy_LocalIdIn(
		repository_localIds: Repository_LocalId[]
	): Promise<IRepository[]>

	getRepositoryLoadInfo(
		repositorySource: Repository_Source,
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

export type RepositoryIdMap = Map<UserAccount_GUID,
	Map<Terminal_GUID, Map<UserAccount_GUID,
		Map<Actor_GUID, Map<number,
			Map<Repository_GUID, Repository_LocalId>>>>>>;

@Injected()
export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

	async findRootRepositories(): Promise<Repository[]> {
		let r: QRepository,
			rn: QRepositoryNesting

		return await this._find({
			SELECT: {
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				owner: {
					username: Y,
				},
				'*': Y,
				repositoryNestings: {},
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN(),
				rn = r.repositoryNestings.LEFT_JOIN()
			],
			WHERE: r.parentRepository.IS_NULL()
		})
	}

	async findRepository(
		repositoryGUID: Repository_GUID
	): Promise<Repository> {
		let r: QRepository,
			rn: QRepositoryNesting

		return await this._findOne({
			SELECT: {
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				owner: {
					username: Y,
				},
				'*': Y,
				repositoryNestings: {},
				uiEntryUri: Y
			},
			FROM: [
				r = Q.Repository,
				r.owner.INNER_JOIN(),
				rn = r.repositoryNestings.LEFT_JOIN()
			],
			WHERE: r.GUID.equals(repositoryGUID)
		})
	}

	async getRepositoryLoadInfo(
		repositorySource: Repository_Source,
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
				r.source.equals(repositorySource),
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
					GUID
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
					GUID: Y,
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
		let r: QRepository,
			o: QUserAccount
		return await this.db.find.graph({
			SELECT: {
				_localId: Y,
				ageSuitability: Y,
				createdAt: Y,
				GUID: Y,
				owner: {
					GUID: Y,
					ranking: Y,
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
		repositoryGUIDs: Repository_GUID[],
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

	async insert(
		repositories: IRepository[],
		context: IContext
	): Promise<void> {
		let r: QRepository;
		const VALUES = []
		for (const repository of repositories) {
			VALUES.push([
				repository.createdAt, repository.GUID, repository.ageSuitability,
				repository.source, repository.immutable, repository.owner.GUID,
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
				r.owner.GUID
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
