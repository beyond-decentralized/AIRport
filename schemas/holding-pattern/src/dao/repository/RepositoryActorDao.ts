import {
	and,
	Y
}                       from '@airport/air-control'
import {DI}             from '@airport/di'
import {QTerminal}      from '@airport/travel-document-checkpoint'
import {
	ActorId,
	RepositoryId
}                       from '../../ddl/ddl'
import {REPO_ACTOR_DAO} from '../../diTokens'
import {
	BaseRepositoryActorDao,
	IBaseRepositoryActorDao,
	IRepositoryActor,
	Q,
	QActor,
	QRepositoryActor,
}                       from '../../generated/generated'

export interface IRepositoryActorDao
	extends IBaseRepositoryActorDao {

	findAllForLocalActorsWhereRepositoryIdIn(
		repositoryIds: RepositoryId[]
	): Promise<IRepositoryActor[]>;

	findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(
		repositoryIds: RepositoryId[]
	): Promise<Map<RepositoryId, Set<ActorId>>>;

}

export class RepositoryActorDao
	extends BaseRepositoryActorDao
	implements IRepositoryActorDao {

	async findAllForLocalActorsWhereRepositoryIdIn(
		repositoryIds: RepositoryId[]
	): Promise<IRepositoryActor[]> {
		let ra: QRepositoryActor,
		    a: QActor,
		    d: QTerminal
		const id = Y

		return await this.db.find.tree({
			select: {
				repository: {
					id
				},
				actor: {
					id
				}
			},
			from: [
				ra = Q.RepositoryActor,
				a = ra.actor.innerJoin(),
				d = a.terminal.innerJoin()
			],
			where: and(
				ra.repository.id.in(repositoryIds),
				d.isLocal.equals(true)
			)
		})
	}

	async findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(
		repositoryIds: RepositoryId[]
	): Promise<Map<RepositoryId, Set<ActorId>>> {
		const records = await this.findAllForLocalActorsWhereRepositoryIdIn(repositoryIds)

		const actorIdMapByRepositoryId: Map<RepositoryId, Set<ActorId>> = new Map()

		for (const record of records) {
			this.utils.ensureChildJsSet(actorIdMapByRepositoryId, record.repository.id)
				.add(record.actor.id)
		}

		return actorIdMapByRepositoryId
	}

}

DI.set(REPO_ACTOR_DAO, RepositoryActorDao)