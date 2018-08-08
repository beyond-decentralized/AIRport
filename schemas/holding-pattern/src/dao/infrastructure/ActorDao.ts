import {
	and,
	IUtils,
	UtilsToken,
	Y
}                          from '@airport/air-control'
import {JSONBaseOperation} from '@airport/ground-control'
import {
	QUser,
	TmTerminalId,
	UserId
} from '@airport/travel-document-checkpoint'
import {
	Inject,
	Service
}                          from 'typedi'
import {
	ActorId,
	ActorRandomId,
}                          from '../../ddl/ddl'
import {
	BaseActorDao,
	IActor,
	IBaseActorDao,
	Q,
	QActor,
}                          from '../../generated/generated'
import {ActorDaoToken}     from '../../InjectionTokens'

export interface IActorDao extends IBaseActorDao {

	findWithDetailsAndGlobalIdsByIds(
		actorIds: ActorId[]
	): Promise<IActor[]>;

	findWithDetailsByGlobalIds(
		randomIds: ActorRandomId[],
		userIds: UserId[],
		terminalIds: TmTerminalId[]
	): Promise<IActor[]>;

	findMapsWithDetailsByGlobalIds(
		randomIds: ActorRandomId[],
		userIds: UserId[],
		terminalIds: TmTerminalId[],
		actorMap: Map<UserId, Map<TmTerminalId, IActor>>,
		actorMapById: Map<ActorId, IActor>
	): Promise<void>;

}

@Service(ActorDaoToken)
export class ActorDao
	extends BaseActorDao
	implements IActorDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils)
	}

	async findWithDetailsAndGlobalIdsByIds(
		actorIds: ActorId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor,
		) => a.id.in(actorIds))
	}

	async findMapsWithDetailsByGlobalIds(
		randomIds: ActorRandomId[],
		userIds: UserId[],
		terminalIds: TmTerminalId[],
		actorMap: Map<UserId, Map<TmTerminalId, IActor>>,
		actorMapById: Map<ActorId, IActor>
	): Promise<void> {
		const actors = await this.findWithDetailsByGlobalIds(
			randomIds,
			userIds,
			terminalIds
		)

		for (const actor of actors) {
			this.utils.ensureChildJsMap(actorMap, actor.user.id)
				.set(actor.terminal.id, actor)
			actorMapById.set(actor.id, actor)
		}
	}

	async findWithDetailsByGlobalIds(
		randomIds: ActorRandomId[],
		userIds: UserId[],
		terminalIds: TmTerminalId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor
		) => and(
			a.randomId.in(randomIds),
			a.terminal.id.in(terminalIds),
			a.user.id.in(userIds)
		))
	}

	private async findWithDetailsAndGlobalIdsByWhereClause(
		getWhereClause: (
			a: QActor
		) => JSONBaseOperation
	): Promise<IActor[]> {
		let a: QActor
		let u: QUser
		const id = Y
		return await this.db.find.tree({
			select: {
				id,
				randomId: Y,
				user: {
					id,
				},
				terminal: {
					id
				}
			},
			from: [
				a = Q.Actor
			],
			where: getWhereClause(a)
		})
	}
}