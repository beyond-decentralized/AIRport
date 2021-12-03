import {
	ALL_FIELDS,
	and,
	Y
} from '@airport/air-control'
import { DI } from '@airport/di'
import {
	ApplicationSignature,
	ensureChildJsMap,
	JSONBaseOperation
} from '@airport/ground-control'
import {
	QApplication
} from '@airport/airspace'
import {
	QTerminal,
	QUser,
	TmTerminal_Id,
	User_Id
} from '@airport/travel-document-checkpoint'
import {
	Actor_Id,
	Actor_UuId,
} from '../../ddl/ddl'
import { ACTOR_DAO } from '../../tokens'
import {
	BaseActorDao,
	IActor,
	IBaseActorDao,
	Q,
	QActor
} from '../../generated/generated'

export interface IActorDao
	extends IBaseActorDao {

	findWithDetailsAndGlobalIdsByIds(
		actorIds: Actor_Id[]
	): Promise<IActor[]>;

	findWithDetailsByGlobalIds(
		uuIds: Actor_UuId[],
		userIds: User_Id[],
		terminalIds: TmTerminal_Id[]
	): Promise<IActor[]>;

	findMapsWithDetailsByGlobalIds(
		uuIds: Actor_UuId[],
		userIds: User_Id[],
		terminalIds: TmTerminal_Id[],
		actorMap: Map<User_Id, Map<TmTerminal_Id, IActor>>,
		actorMapById: Map<Actor_Id, IActor>
	): Promise<void>;

	findByApplicationSignature(
		applicationSignature: ApplicationSignature
	): Promise<IActor>

	findByUuIds(
		uuIds: Actor_UuId[],
	): Promise<IActor[]>

	insert(
		actors: IActor[]
	): Promise<void>

}

export class ActorDao
	extends BaseActorDao
	implements IActorDao {

	async findWithDetailsAndGlobalIdsByIds(
		actorIds: Actor_Id[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor,
		) => a.id.in(actorIds))
	}

	async findMapsWithDetailsByGlobalIds(
		uuIds: Actor_UuId[],
		userIds: User_Id[],
		terminalIds: TmTerminal_Id[],
		actorMap: Map<User_Id, Map<TmTerminal_Id, IActor>>,
		actorMapById: Map<Actor_Id, IActor>
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
		uuIds: Actor_UuId[],
		userIds: User_Id[],
		terminalIds: TmTerminal_Id[]
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
		let application: QApplication
		let terminal: QTerminal
		let user: QUser
		return await this.db.findOne.graph({
			select: {
				id: Y,
				application: {},
				terminal: {},
				user: {},
				uuId: Y
			},
			from: [
				act = Q.Actor,
				application = act.application.innerJoin(),
				terminal = act.terminal.leftJoin(),
				user = act.user.leftJoin()
			],
			where: application.signature.equals(applicationSignature)
		})
	}

	async findByUuIds(
		uuIds: Actor_UuId[],
	): Promise<IActor[]> {
		let a: QActor
		return await this.db.find.tree({
			select: {},
			from: [
				a = Q.Actor
			],
			where: a.uuId.in(uuIds)
		})
	}

	async insert(
		actors: IActor[]
	): Promise<void> {
		let t: QActor;
		const values = []
		for (const actor of actors) {
			values.push([
				actor.uuId, actor.user.id, actor.terminal.id,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: t = Q.Terminal,
			columns: [
				t.uuId,
				t.user.id,
				t.terminal.id
			],
			values
		})
	}

	private async findWithDetailsAndGlobalIdsByWhereClause(
		getWhereClause: (
			a: QActor
		) => JSONBaseOperation
	): Promise<IActor[]> {
		let a: QActor
		let ap: QApplication
		let t: QTerminal
		const id = Y
		const uuId = Y
		return await this.db.find.tree({
			select: {
				...ALL_FIELDS,
				application: {
					index: Y,
					name: Y,
					domain: {
						name: Y
					}
				},
				terminal: {
					id,
					uuId,
					owner: {
						id,
						uuId,
					}
				},
				user: {
					id,
					uuId
				}
			},
			from: [
				a = Q.Actor,
				ap = a.application.innerJoin(),
				ap.domain.innerJoin(),
				t = a.terminal.innerJoin(),
				t.owner.innerJoin(),
				a.user.innerJoin()
			],
			where: getWhereClause(a)
		})
	}
}

DI.set(ACTOR_DAO, ActorDao)
