import {
	AIRPORT_DATABASE,
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
	ActorUuId,
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
	QRepositoryActor,
	QRepositoryTransactionHistory,
	QTransactionHistory,
} from '../../generated/generated'
import { QApplication } from '@airport/territory'

export interface IRepositoryDao
	extends IBaseRepositoryDao {

	getRepositoryLoadInfo(
		repositorySource: Repository_Source,
		repositoryUuId: Repository_UuId
	): Promise<IRepository>

	findReposWithDetailsByIds(
		repositoryIdsInClause: RepositoryTransactionHistory_Id[]
			| RawFieldQuery<IQNumberField>
			| {
				(...args: any[]): RawFieldQuery<IQNumberField>
			},
		uuId: Terminal_UuId,
		userUuId: User_UuId,
	): Promise<MappedEntityArray<IRepository>>;

	findLocalRepoIdsByGlobalIds(
		createdAts: Repository_CreatedAt[],
		uuIds: Repository_UuId[],
		ownerActorRandomIds: ActorUuId[],
		ownerUserUniqueIds: User_UuId[],
		ownerTerminalUuids: Terminal_UuId[],
		ownerTerminalOwnerUserUniqueIds: User_UuId[]
	): Promise<RepositoryIdMap>;

	findReposWithGlobalIds(
		repositoryIds: Repository_Id[]
	): Promise<Map<Repository_Id, IRepository>>;

	findReposForAppSignature(
		applicationSignature: ApplicationSignature
	): Promise<IRepository[]>

}

export type RepositoryIdMap = Map<User_UuId,
	Map<Terminal_UuId, Map<User_UuId,
		Map<ActorUuId, Map<number,
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

	async findReposWithTransactionLogDetailsByIds(
		repositoryIds: Repository_Id[]
	): Promise<MappedEntityArray<IRepository>> {
		let r: QRepository
		let ra: QRepositoryActor
		let a: QActor
		let u: QUser
		let d: QTerminal
		let id = Y
		return await this.db.find.map().tree({
			select: {
				createdAt: Y,
				uuId: Y,
				ownerActor: {
					user: {
						id
					},
					terminal: {
						id
					}
				},
			},
			from: [
				r = Q.Repository,
				ra = r.repositoryActors.innerJoin(),
				a = ra.actor.innerJoin(),
				u = a.user.innerJoin(),
				d = a.terminal.innerJoin()
			],
			where:
				// and(
				r.id.in(repositoryIds),
			// d.name.equals(dbName),
			// u.uniqueId.equals(userEmail)
			// )
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

	async findReposWithDetailsByIds(
		repositoryIdsInClause: RepositoryTransactionHistory_Id[]
			| RawFieldQuery<IQNumberField>
			| {
				(...args: any[]): RawFieldQuery<IQNumberField>
			},
		uuId: Terminal_UuId,
		userUuId: User_UuId,
	): Promise<MappedEntityArray<IRepository>> {
		let r: QRepository
		let ra: QRepositoryActor
		let a: QActor
		let u: QUser
		let d: QTerminal
		let id = Y
		return await this.db.find.map().tree({
			select: {
				...this.db.duo.select.fields,
				repositoryActors: {
					actor: {
						user: {
							id
						},
						terminal: {
							id
						}
					}
				},
			},
			from: [
				r = Q.Repository,
				ra = r.repositoryActors.innerJoin(),
				a = ra.actor.innerJoin(),
				u = a.user.innerJoin(),
				d = a.terminal.innerJoin()
			],
			where: and(
				r.id.in(repositoryIdsInClause),
				d.uuId.equals(uuId),
				u.uuId.equals(userUuId)
			)
		}
		)
	}

	async findReposWithGlobalIds(
		repositoryIds: Repository_Id[]
	): Promise<Map<Repository_Id, IRepository>> {
		const repositoryMapById: Map<Repository_Id, IRepository>
			= new Map()

		let r: QRepository
		let a: QActor
		let u: QUser
		const repositories = await this.db.find.tree({
			select: {
				id: Y,
				createdAt: Y,
				uuId: Y,
				ownerActor: {
					id: Y,
					user: {
						uuId: Y
					},
				}
			},
			from: [
				r = Q.Repository,
				a = r.ownerActor.innerJoin(),
				u = a.user.innerJoin()
			],
			where:
				r.id.in(repositoryIds)
		})

		for (const repository of repositories) {
			repositoryMapById.set(repository.id, repository)
		}

		return repositoryMapById
	}

	async findLocalRepoIdsByGlobalIds(
		createdAts: Repository_CreatedAt[],
		uuIds: Repository_UuId[],
		ownerActorRandomIds: ActorUuId[],
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

	async findReposForAppSignature(
		applicationSignature: ApplicationSignature
	): Promise<IRepository[]> {
		let repo: QRepository
		let act: QActor
		let app: QApplication
		return await this.db.find.tree({
			select: {},
			from: [
				repo = Q.Repository,
				act = repo.ownerActor.innerJoin(),
				app = act.application.innerJoin()
			],
			where: app.signature.equals(applicationSignature)
		})
	}

}

DI.set(REPOSITORY_DAO, RepositoryDao)
