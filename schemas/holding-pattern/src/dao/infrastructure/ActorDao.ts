import {
	ALL_FIELDS,
	and,
	Y
} from '@airport/air-traffic-control'
import {
	ApplicationName,
	DomainName,
	ensureChildJsMap,
	JSONBaseOperation
} from '@airport/ground-control'
import {
	QApplication,
	QDomain
} from '@airport/airspace'
import {
	QTerminal,
	QUser,
	TmTerminal_Id,
	User_Id
} from '@airport/travel-document-checkpoint-runtime'
import {
	Actor_Id,
	Actor_UuId,
} from '../../ddl/ddl'
import {
	BaseActorDao,
	IActor,
	IBaseActorDao,
	Q,
	QActor
} from '../../generated/generated'
import { IContext, Injected } from '@airport/direction-indicator'

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

	findByDomainAndApplicationNames(
		domainName: DomainName,
		applicationName: ApplicationName
	): Promise<IActor[]>

	findByUuIds(
		uuIds: Actor_UuId[],
	): Promise<IActor[]>

	insert(
		actors: IActor[],
		context: IContext
	): Promise<void>

}

@Injected()
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

	async findByDomainAndApplicationNames(
		domainName: DomainName,
		applicationName: ApplicationName
	): Promise<IActor[]> {
		let act: QActor
		let application: QApplication
		let domain: QDomain
		let terminal: QTerminal
		let user: QUser
		return await this.db.find.tree({
			select: {
				id: Y,
				application: {
					...ALL_FIELDS,
					domain: {}
				},
				terminal: {},
				user: {},
				uuId: Y
			},
			from: [
				act = Q.Actor,
				application = act.application.innerJoin(),
				domain = application.domain.innerJoin(),
				terminal = act.terminal.leftJoin(),
				user = act.user.leftJoin()
			],
			where: and(
				domain.name.equals(domainName),
				application.name.equals(applicationName)
			)
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
		actors: IActor[],
		context: IContext
	): Promise<void> {
		let t: QActor;
		const values = []
		for (const actor of actors) {
			values.push([
				actor.uuId, actor.application.index, actor.user.id, actor.terminal.id,
			])
		}
		const ids = await this.db.insertValuesGenerateIds({
			insertInto: t = Q.Actor,
			columns: [
				t.uuId,
				t.application.index,
				t.user.id,
				t.terminal.id
			],
			values
		}, context)
		for (let i = 0; i < actors.length; i++) {
			let actor = actors[i]
			actor.id = ids[i][0]
		}
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
		const username = Y
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
						username,
						uuId,
					}
				},
				user: {
					id,
					username,
					uuId,
				}
			},
			from: [
				a = Q.Actor,
				ap = a.application.leftJoin(),
				ap.domain.leftJoin(),
				t = a.terminal.leftJoin(),
				t.owner.leftJoin(),
				a.user.leftJoin()
			],
			where: getWhereClause(a)
		})
	}
}
