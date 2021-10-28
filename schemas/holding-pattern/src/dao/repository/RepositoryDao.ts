import {
	AIRPORT_DATABASE,
	and,
	IQNumberField,
	MappedEntityArray,
	RawFieldQuery,
	Y
} from '@airport/air-control'
import {
	TerminalName,
	TerminalSecondId
} from '@airport/arrivals-n-departures'
import { container, DI } from '@airport/di'
import { ApplicationSignature, ensureChildJsMap } from '@airport/ground-control'
import {
	QTerminal,
	QUser,
	User_Email,
	User_PrivateId,
	User_PublicId
} from '@airport/travel-document-checkpoint'
import {
	ActorUuId,
	Repository_Id,
	Repository_CreatedAt,
	Repository_UuId,
	RepositoryTransactionHistoryId,
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
} from '../../generated/generated'
import { QApplication } from '@airport/territory'

export interface IRepositoryDao
	extends IBaseRepositoryDao {

	findReposWithDetailsByIds(
		repositoryIdsInClause: RepositoryTransactionHistoryId[]
			| RawFieldQuery<IQNumberField>
			| {
				(...args: any[]): RawFieldQuery<IQNumberField>
			},
		dbName: TerminalName,
		userEmail: User_Email,
	): Promise<MappedEntityArray<IRepository>>;

	findLocalRepoIdsByGlobalIds(
		createdAts: Repository_CreatedAt[],
		uuIds: Repository_UuId[],
		ownerActorRandomIds: ActorUuId[],
		ownerUserPrivateIds: User_PrivateId[],
		ownerTerminalNames: TerminalName[],
		ownerTerminalSecondIds: TerminalSecondId[],
		ownerTerminalOwnerUserUniqueIds: User_PrivateId[]
	): Promise<RepositoryIdMap>;

	findReposWithGlobalIds(
		repositoryIds: Repository_Id[]
	): Promise<Map<Repository_Id, IRepository>>;

	findReposForAppSignature(
		applicationSignature: ApplicationSignature
	): Promise<IRepository[]>

}

export type RepositoryIdMap = Map<User_PrivateId,
	Map<TerminalName, Map<TerminalSecondId, Map<User_PrivateId,
		Map<ActorUuId, Map<Repository_CreatedAt,
			Map<Repository_UuId, Repository_Id>>>>>>>;

export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

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
		repositoryIdsInClause: RepositoryTransactionHistoryId[]
			| RawFieldQuery<IQNumberField>
			| {
				(...args: any[]): RawFieldQuery<IQNumberField>
			},
		dbName: TerminalName,
		userEmail: User_Email,
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
				d.name.equals(dbName),
				u.email.equals(userEmail)
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
						privateId: Y
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
		ownerUserUniqueIds: User_PrivateId[],
		ownerTerminalNames: TerminalName[],
		ownerTerminalSecondIds: TerminalSecondId[],
		ownerTerminalOwnerUserUniqueIds: User_PrivateId[]
	): Promise<RepositoryIdMap> {
		const repositoryIdMap: RepositoryIdMap = new Map()

		let r: QRepository
		let oa: QActor
		let od: QTerminal
		let odu: QUser
		let ou: QUser

		const airDb = await container(this).get(AIRPORT_DATABASE)

		const resultRows = await airDb.find.sheet({
			from: [
				r = Q.Repository,
				oa = r.ownerActor.innerJoin(),
				ou = oa.user.innerJoin(),
				od = oa.terminal.innerJoin(),
				odu = od.owner.innerJoin(),
			],
			select: [
				odu.privateId,
				od.name,
				od.secondId,
				ou.privateId,
				oa.uuId,
				r.createdAt,
				r.uuId,
				r.id,
			],
			where: and(
				r.createdAt.in(createdAts),
				r.uuId.in(uuIds),
				oa.uuId.in(ownerActorRandomIds),
				ou.privateId.in(ownerUserUniqueIds),
				od.name.in(ownerTerminalNames),
				od.secondId.in(ownerTerminalSecondIds),
				odu.privateId.in(ownerTerminalOwnerUserUniqueIds)
			)
		})

		for (const resultRow of resultRows) {
			ensureChildJsMap(
				ensureChildJsMap(
					ensureChildJsMap(
						ensureChildJsMap(
							ensureChildJsMap(
								ensureChildJsMap(repositoryIdMap, resultRow[0]),
								resultRow[1]),
							resultRow[2]),
						resultRow[3]),
					resultRow[4]),
				resultRow[5].getTime()).set(resultRow[6], resultRow[7])
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
