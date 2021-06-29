import {
	AIRPORT_DATABASE,
	and,
	IQNumberField,
	MappedEntityArray,
	RawFieldQuery,
	Y
}                         from '@airport/air-control'
import {
	TerminalName,
	TerminalSecondId
}                         from '@airport/arrivals-n-departures'
import {container, DI}               from '@airport/di'
import {ensureChildJsMap} from '@airport/ground-control'
import {
	QTerminal,
	QUser,
	UserUniqueId
}                         from '@airport/travel-document-checkpoint'
import {
	ActorRandomId,
	RepositoryId,
	RepositoryOrderedId,
	RepositoryRandomId,
	RepositoryTransactionHistoryId,
}                         from '../../ddl/ddl'
import {REPOSITORY_DAO}   from '../../tokens'
import {
	BaseRepositoryDao,
	IBaseRepositoryDao,
	IRepository,
	Q,
	QActor,
	QRepository,
	QRepositoryActor,
}                         from '../../generated/generated'

export interface IRepositoryDao
	extends IBaseRepositoryDao {

	findReposWithDetailsByIds(
		repositoryIdsInClause: RepositoryTransactionHistoryId[]
			| RawFieldQuery<IQNumberField>
			| {
			(...args: any[]): RawFieldQuery<IQNumberField>
		},
		dbName: TerminalName,
		userEmail: UserUniqueId,
	): Promise<MappedEntityArray<IRepository>>;

	findLocalRepoIdsByGlobalIds(
		orderedIds: RepositoryOrderedId[],
		randomIds: RepositoryRandomId[],
		ownerActorRandomIds: ActorRandomId[],
		ownerUserUniqueIds: UserUniqueId[],
		ownerTerminalNames: TerminalName[],
		ownerTerminalSecondIds: TerminalSecondId[],
		ownerTerminalOwnerUserUniqueIds: UserUniqueId[]
	): Promise<RepositoryIdMap>;

	findReposWithGlobalIds(
		repositoryIds: RepositoryId[]
	): Promise<Map<RepositoryId, IRepository>>;

}

export type RepositoryIdMap = Map<UserUniqueId,
	Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId,
		Map<ActorRandomId, Map<RepositoryOrderedId,
			Map<RepositoryRandomId, RepositoryId>>>>>>>;

export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

	async findReposWithTransactionLogDetailsByIds(
		repositoryIds: RepositoryId[]
	): Promise<MappedEntityArray<IRepository>> {
		let r: QRepository
		let ra: QRepositoryActor
		let a: QActor
		let u: QUser
		let d: QTerminal
		let id = Y
		return await this.db.find.map().tree({
			select: {
				orderedId: Y,
				randomId: Y,
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
		repositoryIds: RepositoryId[]
	): Promise<IRepository[]> {
		let r: QRepository
		const id = Y
		return await this.db.find.tree({
			select: {
				id,
				ownerActor: {
					id
				},
				orderedId: Y,
				randomId: Y
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
		userEmail: UserUniqueId,
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
					u.uniqueId.equals(userEmail)
				)
			}
		)
	}

	async findReposWithGlobalIds(
		repositoryIds: RepositoryId[]
	): Promise<Map<RepositoryId, IRepository>> {
		const repositoryMapById: Map<RepositoryId, IRepository>
			      = new Map()

		let r: QRepository
		let a: QActor
		let u: QUser
		const repositories = await this.db.find.tree({
			select: {
				id: Y,
				orderedId: Y,
				randomId: Y,
				ownerActor: {
					id: Y,
					user: {
						uniqueId: Y
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
		orderedIds: RepositoryOrderedId[],
		randomIds: RepositoryRandomId[],
		ownerActorRandomIds: ActorRandomId[],
		ownerUserUniqueIds: UserUniqueId[],
		ownerTerminalNames: TerminalName[],
		ownerTerminalSecondIds: TerminalSecondId[],
		ownerTerminalOwnerUserUniqueIds: UserUniqueId[]
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
				odu.uniqueId,
				od.name,
				od.secondId,
				ou.uniqueId,
				oa.randomId,
				r.orderedId,
				r.randomId,
				r.id,
			],
			where: and(
				r.orderedId.in(orderedIds),
				r.randomId.in(randomIds),
				oa.randomId.in(ownerActorRandomIds),
				ou.uniqueId.in(ownerUserUniqueIds),
				od.name.in(ownerTerminalNames),
				od.secondId.in(ownerTerminalSecondIds),
				odu.uniqueId.in(ownerTerminalOwnerUserUniqueIds)
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
				resultRow[5]).set(resultRow[6], resultRow[7])
		}


		return repositoryIdMap
	}

}

DI.set(REPOSITORY_DAO, RepositoryDao)
