import {
	and,
	Y
} from '@airport/air-control'
import { DI } from '@airport/di'
import {
	ApplicationSignature,
	ensureChildJsMap,
	JSONBaseOperation
} from '@airport/ground-control'
import { QApplication } from '@airport/territory'
import {
	QTerminal,
	QUser,
	TmTerminalId,
	UserId
} from '@airport/travel-document-checkpoint'
import {
	ActorId,
	ActorUuId,
} from '../../ddl/ddl'
import { ACTOR_DAO } from '../../tokens'
import {
	BaseActorDao,
	IActor,
	IBaseActorDao,
	Q,
	QActor,
	QRepositoryActor,
} from '../../generated/generated'

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

	findByApplicationSignature(
		applicationSignature: ApplicationSignature
	): Promise<IActor>

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

	async findByApplicationSignature(
		applicationSignature: ApplicationSignature
	): Promise<IActor> {
		let act: QActor
		let app: QApplication
		let repoAct: QRepositoryActor
		let terminal: QTerminal
		let user: QUser
		return await this.db.findOne.graph({
			select: {
				application: {},
				id: Y,
				repositoryActors: {},
				terminal: {},
				user: {},
				uuId: Y
			},
			from: [
				act = Q.Actor,
				app = act.application.innerJoin(),
				repoAct = act.repositoryActors.leftJoin(),
				terminal = act.terminal.leftJoin(),
				user = act.user.leftJoin()
			],
			where: app.signature.equals(applicationSignature)
		})
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
