import {
	ALL_FIELDS,
	and,
	Y
} from '@airport/air-control'
import { DI, IContext } from '@airport/di'
import { TransactionType } from '@airport/ground-control'
import {
	Terminal_UuId,
	User_UuId
} from '@airport/travel-document-checkpoint'
import {
	Actor_UuId,
	Repository_Id,
	Repository_Source,
	Repository_UuId,
} from '../../ddl/ddl'
import { REPOSITORY_DAO } from '../../tokens'
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
		repositoryUuId: Repository_UuId,
		context: IContext
	): Promise<IRepository>

	findByIds(
		repositoryIds: Repository_Id[]
	): Promise<IRepository[]>;

	findByUuIds(
		uuIds: Repository_UuId[],
	): Promise<IRepository[]>

	insert(
		repositories: IRepository[]
	): Promise<void>

}

export type RepositoryIdMap = Map<User_UuId,
	Map<Terminal_UuId, Map<User_UuId,
		Map<Actor_UuId, Map<number,
			Map<Repository_UuId, Repository_Id>>>>>>;

export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

	async getRepositoryLoadInfo(
		repositorySource: Repository_Source,
		repositoryUuId: Repository_UuId,
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
				r.uuId.equals(repositoryUuId),
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

	async findByUuIds(
		uuIds: Repository_UuId[],
	): Promise<IRepository[]> {
		let r: QRepository
		return await this.db.find.tree({
			select: {},
			from: [
				r = Q.Repository
			],
			where: r.uuId.in(uuIds)
		})
	}

	async insert(
		repositories: IRepository[]
	): Promise<void> {
		let r: QRepository;
		const values = []
		for (const repository of repositories) {
			values.push([
				repository.createdAt, repository.uuId, repository.ageSuitability,
				repository.source, repository.immutable, repository.owner.id,
			])
		}
		const ids = await this.db.insertValuesGenerateIds({
			insertInto: r = Q.Repository,
			columns: [
				r.createdAt,
				r.uuId,
				r.ageSuitability,
				r.source,
				r.immutable,
				r.owner.id
			],
			values
		})
		for (let i = 0; i < repositories.length; i++) {
			let repository = repositories[i]
			repository.id = ids[i][0]
		}
	}

}

DI.set(REPOSITORY_DAO, RepositoryDao)
