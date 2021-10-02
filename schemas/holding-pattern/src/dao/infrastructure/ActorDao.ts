import {
	and,
	Y
}                  from '@airport/air-control'
import {DI}        from '@airport/di'
import {
	ensureChildJsMap,
	JSONBaseOperation
}                  from '@airport/ground-control'
import {
	QUser,
	TmTerminalId,
	UserId
}                  from '@airport/travel-document-checkpoint'
import {
	ActorId,
	ActorUuId,
}                  from '../../ddl/ddl'
import {ACTOR_DAO} from '../../tokens'
import {
	BaseActorDao,
	IActor,
	IBaseActorDao,
	Q,
	QActor,
}                  from '../../generated/generated'

export interface IActorDao
	extends IBaseActorDao {

	findWithDetailsAndGlobalIdsByIds(
		actorIds: ActorId[]
	): Promise<IActor[]>;

	findWithDetailsByGlobalIds(
		uuIds: ActorUuId[],
		userIds: UserId[],
		terminalIds: TmTerminalId[]
	): Promise<IActor[]>;

	findMapsWithDetailsByGlobalIds(
		uuIds: ActorUuId[],
		userIds: UserId[],
		terminalIds: TmTerminalId[],
		actorMap: Map<UserId, Map<TmTerminalId, IActor>>,
		actorMapById: Map<ActorId, IActor>
	): Promise<void>;

}

export class ActorDao
	extends BaseActorDao
	implements IActorDao {

	async findWithDetailsAndGlobalIdsByIds(
		actorIds: ActorId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor,
		) => a.id.in(actorIds))
	}

	async findMapsWithDetailsByGlobalIds(
		uuIds: ActorUuId[],
		userIds: UserId[],
		terminalIds: TmTerminalId[],
		actorMap: Map<UserId, Map<TmTerminalId, IActor>>,
		actorMapById: Map<ActorId, IActor>
	): Promise<void> {
		const actors = await this.findWithDetailsByGlobalIds(
			uuIds,
			userIds,
			terminalIds
		)

		for (const actor of actors) {
			ensureChildJsMap(actorMap, actor.user.id)
				.set(actor.terminal.id, actor)
			actorMapById.set(actor.id, actor)
		}
	}

	async findWithDetailsByGlobalIds(
		uuIds: ActorUuId[],
		userIds: UserId[],
		terminalIds: TmTerminalId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor
		) => and(
			a.uuId.in(uuIds),
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
				uuId: Y,
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

DI.set(ACTOR_DAO, ActorDao)
