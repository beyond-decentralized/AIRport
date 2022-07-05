import {
	ALL_FIELDS,
	and,
	Y
} from '@airport/air-traffic-control'
import { IContext, Injected } from '@airport/direction-indicator'
import { TransactionType } from '@airport/ground-control'
import {
	Terminal_GUID,
	User_GUID
} from '@airport/travel-document-checkpoint'
import {
	Actor_GUID,
	Repository_LocalId,
	Repository_Source,
	Repository_GUID,
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

	findWithOwnerAndTheirLocationBy_LocalIds(
		repository_localIds: Repository_LocalId[]
	): Promise<IRepository[]>

	insert(
		repositories: IRepository[],
		context: IContext
	): Promise<void>

}

export type RepositoryIdMap = Map<User_GUID,
	Map<Terminal_GUID, Map<User_GUID,
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
			select: {
				immutable: Y,
				repositoryTransactionHistory: {
					saveTimestamp: Y
				}
			},
			from: [
				r = Q.Repository,
				rth = r.repositoryTransactionHistory.innerJoin(),
				th = rth.transactionHistory.innerJoin()
			],
			where: and(
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
			select: {
				_localId,
				owner: {
					_localId
				},
				createdAt: Y,
				GUID: Y
			},
			from: [
				r = Q.Repository
			],
			where: r._localId.in(repositoryIds)
		})
	}

	async findWithOwnerBy_LocalIds(
		repositoryIds: Repository_LocalId[]
	): Promise<IRepository[]> {
		let r: QRepository
		return await this.db.find.tree({
			select: {
				'*': Y,
				owner: {
					_localId: Y,
					GUID: Y,
					username: Y
				}
			},
			from: [
				r = Q.Repository,
				r.owner.innerJoin()
			],
			where:
				r._localId.in(repositoryIds)
		})
	}

	async findWithOwnerAndTheirLocationBy_LocalIds(
		repository_localIds: Repository_LocalId[]
	): Promise<IRepository[]> {
		let r: QRepository
		return await this.db.find.graph({
			select: {
				'*': Y,
				owner: {
					_localId: Y,
					GUID: Y,
					metroArea: {
						country: {
							id: Y,
							name: Y
						},
						id: Y,
						name: Y
					},
					ranking: Y,
					username: Y
				}
			},
			from: [
				r = Q.Repository,
				r.owner.innerJoin()
			],
			where:
				r._localId.in(repository_localIds)
		})
	}

	async findByGUIDs(
		repositoryGUIDs: Repository_GUID[],
	): Promise<IRepository[]> {
		let r: QRepository
		return await this.db.find.tree({
			select: {},
			from: [
				r = Q.Repository
			],
			where: r.GUID.in(repositoryGUIDs)
		})
	}

	async insert(
		repositories: IRepository[],
		context: IContext
	): Promise<void> {
		let r: QRepository;
		const values = []
		for (const repository of repositories) {
			values.push([
				repository.createdAt, repository.GUID, repository.ageSuitability,
				repository.source, repository.immutable, repository.owner._localId,
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			insertInto: r = Q.Repository,
			columns: [
				r.createdAt,
				r.GUID,
				r.ageSuitability,
				r.source,
				r.immutable,
				r.owner._localId
			],
			values
		}, context)
		for (let i = 0; i < repositories.length; i++) {
			let repository = repositories[i]
			repository._localId = _localIds[i][0]
		}
	}

}
