import {
	AIRPORT_DATABASE,
	ALL_FIELDS,
	and,
	IQNumberField,
	MappedEntityArray,
	RawFieldQuery,
	Y
} from '@airport/air-control'
import { container, DI } from '@airport/di'
import { ApplicationSignature, ensureChildJsMap } from '@airport/ground-control'
import {
	QTerminal,
	QUser,
	Terminal_UuId,
	User_UuId
} from '@airport/travel-document-checkpoint'
import {
	Actor_UuId,
	Repository_Id,
	Repository_CreatedAt,
	Repository_Source,
	Repository_UuId,
	RepositoryTransactionHistory_Id,
} from '../../ddl/ddl'
import { REPOSITORY_DAO } from '../../tokens'
import {
	BaseRepositoryDao,
	IBaseRepositoryDao,
	IRepository,
	Q,
	QActor,
	QRepository,
	QRepositoryTransactionHistory,
	QTransactionHistory,
} from '../../generated/generated'

export interface IRepositoryDao
	extends IBaseRepositoryDao {

	getRepositoryLoadInfo(
		repositorySource: Repository_Source,
		repositoryUuId: Repository_UuId
	): Promise<IRepository>

	findLocalRepoIdsByGlobalIds(
		createdAts: Repository_CreatedAt[],
		uuIds: Repository_UuId[],
		ownerActorRandomIds: Actor_UuId[],
		ownerUserUniqueIds: User_UuId[],
		ownerTerminalUuids: Terminal_UuId[],
		ownerTerminalOwnerUserUniqueIds: User_UuId[]
	): Promise<RepositoryIdMap>;

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
		repositoryUuId: Repository_UuId
	): Promise<IRepository> {

		let r: QRepository
		let rth: QRepositoryTransactionHistory
		let th: QTransactionHistory
		let t: QTerminal

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
				th = rth.transactionHistory.innerJoin(),
				t = th.terminal.innerJoin()
			],
			where: and(
				r.source.equals(repositorySource),
				r.uuId.equals(repositoryUuId),
				t.isLocal.equals(false)
			)
		})
	}

	async findReposWithDetailsAndSyncNodeIds(
		repositoryIds: Repository_Id[]
	): Promise<IRepository[]> {
		let r: QRepository
		const id = Y
		return await this.db.find.tree({
			select: {
				id,
				ownerActor: {
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
		let a: QActor
		return await this.db.find.tree({
			select: {
				...ALL_FIELDS,
				ownerActor: {
					id: Y
				}
			},
			from: [
				r = Q.Repository,
				a = r.ownerActor.innerJoin()
			],
			where:
				r.id.in(repositoryIds)
		})
	}

	async findLocalRepoIdsByGlobalIds(
		createdAts: Repository_CreatedAt[],
		uuIds: Repository_UuId[],
		ownerActorRandomIds: Actor_UuId[],
		ownerUserUniqueIds: User_UuId[],
		ownerTerminalUuids: Terminal_UuId[],
		ownerTerminalOwnerUserUniqueIds: User_UuId[]
	): Promise<RepositoryIdMap> {
		const repositoryIdMap: RepositoryIdMap = new Map()

		let repo: QRepository
		let ownerActor: QActor
		let terminal: QTerminal
		let terminalUser: QUser
		let repoOwnerUser: QUser

		const airDb = await container(this).get(AIRPORT_DATABASE)

		const resultRows = await airDb.find.sheet({
			from: [
				repo = Q.Repository,
				ownerActor = repo.ownerActor.innerJoin(),
				repoOwnerUser = ownerActor.user.innerJoin(),
				terminal = ownerActor.terminal.innerJoin(),
				terminalUser = terminal.owner.innerJoin(),
			],
			select: [
				terminalUser.uuId,
				terminal.uuId,
				repoOwnerUser.uuId,
				ownerActor.uuId,
				repo.createdAt,
				repo.uuId,
				repo.id,
			],
			where: and(
				repo.createdAt.in(createdAts),
				repo.uuId.in(uuIds),
				ownerActor.uuId.in(ownerActorRandomIds),
				repoOwnerUser.uuId.in(ownerUserUniqueIds),
				terminal.uuId.in(ownerTerminalUuids),
				terminalUser.uuId.in(ownerTerminalOwnerUserUniqueIds)
			)
		})

		for (const resultRow of resultRows) {
			ensureChildJsMap(
				ensureChildJsMap(
					ensureChildJsMap(
						ensureChildJsMap(
							ensureChildJsMap(repositoryIdMap, resultRow[0]),
							resultRow[1]),
						resultRow[2]),
					resultRow[3]),
				resultRow[4].getTime()).set(resultRow[5], resultRow[6])
		}


		return repositoryIdMap
	}

	async findByUuIds(
		uuIds: Repository_UuId[],
	): Promise<IRepository[]> {
		let r: QRepository
		return await this.db.find.tree({
			select: {},
			from: [
				r = Q.QRepository
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
				repository.source, repository.immutable, repository.ownerActor.id,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: r = Q.Repository,
			columns: [
				r.createdAt,
				r.uuId,
				r.ageSuitability,
				r.source,
				r.immutable,
				r.ownerActor.id
			],
			values
		})
	}

}

DI.set(REPOSITORY_DAO, RepositoryDao)
