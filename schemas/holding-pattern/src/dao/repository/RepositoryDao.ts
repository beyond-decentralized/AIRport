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
	Repository_Id,
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

	findByIds(
		repositoryIds: Repository_Id[]
	): Promise<IRepository[]>;

	findByGUIDs(
		repositoryGUIDs: Repository_GUID[],
	): Promise<IRepository[]>

	insert(
		repositories: IRepository[],
		context: IContext
	): Promise<void>

}

export type RepositoryIdMap = Map<User_GUID,
	Map<Terminal_GUID, Map<User_GUID,
		Map<Actor_GUID, Map<number,
			Map<Repository_GUID, Repository_Id>>>>>>;

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
		repositoryIds: Repository_Id[]
	): Promise<IRepository[]> {
		let r: QRepository
		const id = Y
		return await this.db.find.tree({
			select: {
				id,
				owner: {
					id
				},
				createdAt: Y,
				uuId: Y
			},
			from: [
				r = Q.Repository
			],
			where: r.id.in(repositoryIds)
		})
	}

	async findByIds(
		repositoryIds: Repository_Id[]
	): Promise<IRepository[]> {
		let r: QRepository
		return await this.db.find.tree({
			select: {
				...ALL_FIELDS,
				owner: {}
			},
			from: [
				r = Q.Repository,
				r.owner.innerJoin()
			],
			where:
				r.id.in(repositoryIds)
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
				repository.source, repository.immutable, repository.owner.id,
			])
		}
		const ids = await this.db.insertValuesGenerateIds({
			insertInto: r = Q.Repository,
			columns: [
				r.createdAt,
				r.GUID,
				r.ageSuitability,
				r.source,
				r.immutable,
				r.owner.id
			],
			values
		}, context)
		for (let i = 0; i < repositories.length; i++) {
			let repository = repositories[i]
			repository.id = ids[i][0]
		}
	}

}
