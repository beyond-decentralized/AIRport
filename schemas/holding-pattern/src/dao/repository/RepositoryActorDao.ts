import {
	and,
	IUtils,
	UtilsToken,
	Y
}                                from '@airport/air-control'
import {QTerminal}               from '@airport/travel-document-checkpoint'
import {Service}                 from 'typedi'
import {Inject}                  from 'typedi/decorators/Inject'
import {
	ActorId,
	RepositoryId
}                                from '../../ddl/ddl'
import {
	BaseRepositoryActorDao,
	IBaseRepositoryActorDao,
	IRepositoryActor,
	Q,
	QActor,
	QRepositoryActor,
}                                from '../../generated/generated'
import {RepositoryActorDaoToken} from '../../InjectionTokens'

export interface IRepositoryActorDao
	extends IBaseRepositoryActorDao {

	findAllForLocalActorsWhereRepositoryIdIn(
		repositoryIds: RepositoryId[]
	): Promise<IRepositoryActor[]>;

	findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(
		repositoryIds: RepositoryId[]
	): Promise<Map<RepositoryId, Set<ActorId>>>;

}

@Service(RepositoryActorDaoToken)
export class RepositoryActorDao
	extends BaseRepositoryActorDao
	implements IRepositoryActorDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils)
	}

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