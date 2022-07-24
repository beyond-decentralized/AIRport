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
} from '@airport/travel-document-checkpoint'
import {
	Actor_GUID,
} from '../../ddl/ddl'
import {
	BaseRepositoryDao,
	IBaseRepositoryDao,
	IRepository,
	Q,
	QRepository,
	QRepositoryTransactionHistory,
	QTransactionHistory,
} from '../../generated/generated'
import { Repository_GUID, Repository_LocalId, Repository_Source } from '../../types'

export interface IRepositoryDao
	extends IBaseRepositoryDao {

	getRepositoryLoadInfo(
		repositorySource: Repository_Source,
		repositoryGUID: Repository_GUID,
		context: IContext
	): Promise<IRepository>

	findWithOwnerBy_LocalIds(
		repositoryIds: Repository_LocalId[]
	): Promise<IRepository[]>;

	findByGUIDs(
		repositoryGUIDs: Repository_GUID[],
	): Promise<IRepository[]>

	findWithOwnerBy_LocalIdIn(
		repository_localIds: Repository_LocalId[]
	): Promise<IRepository[]>

	insert(
		repositories: IRepository[],
		context: IContext
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
		return await this.db.find.tree({
			SELECT: {
				_localId,
				owner: {
					_localId
				},
				createdAt: Y,
				GUID: Y
			},
			FROM: [
				r = Q.Repository
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
				'*': Y,
				owner: {
					_localId: Y,
					GUID: Y,
					username: Y
				}
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
				'*': Y,
				owner: {
					_localId: Y,
					GUID: Y,
					ranking: Y,
					username: Y
				}
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
			SELECT: {},
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

}
