import {
	ALL_FIELDS,
	and,
	Y
} from '@airport/air-traffic-control'
import {
	Application_Name,
	Domain_Name,
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
	Terminal_LocalId,
	User_LocalId
} from '@airport/travel-document-checkpoint'
import {
	Actor_LocalId,
	Actor_GUID,
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
		actorIds: Actor_LocalId[]
	): Promise<IActor[]>;

	findWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userIds: User_LocalId[],
		terminalIds: Terminal_LocalId[]
	): Promise<IActor[]>;

	findMapsWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userIds: User_LocalId[],
		terminalIds: Terminal_LocalId[],
		actorMap: Map<User_LocalId, Map<Terminal_LocalId, IActor>>,
		actorMapById: Map<Actor_LocalId, IActor>
	): Promise<void>;

	findByDomainAndApplication_Names(
		domainName: Domain_Name,
		applicationName: Application_Name
	): Promise<IActor[]>

	findByGUIDs(
		actorGUIDs: Actor_GUID[],
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
		actorIds: Actor_LocalId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor,
		) => a._localId.in(actorIds))
	}

	async findMapsWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userIds: User_LocalId[],
		terminalIds: Terminal_LocalId[],
		actorMap: Map<User_LocalId, Map<Terminal_LocalId, IActor>>,
		actorMapById: Map<Actor_LocalId, IActor>
	): Promise<void> {
		const actors = await this.findWithDetailsByGlobalIds(
			actorGUIDs,
			userIds,
			terminalIds
		)

		for (const actor of actors) {
			ensureChildJsMap(actorMap, actor.user._localId)
				.set(actor.terminal._localId, actor)
			actorMapById.set(actor._localId, actor)
		}
	}

	async findWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userIds: User_LocalId[],
		terminalIds: Terminal_LocalId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor
		) => and(
			a.GUID.in(actorGUIDs),
			a.terminal._localId.in(terminalIds),
			a.user._localId.in(userIds)
		))
	}

	async findByDomainAndApplication_Names(
		domainName: Domain_Name,
		applicationName: Application_Name
	): Promise<IActor[]> {
		let act: QActor
		let application: QApplication
		let domain: QDomain
		let terminal: QTerminal
		let user: QUser
		return await this.db.find.tree({
			select: {
				_localId: Y,
				application: {
					...ALL_FIELDS,
					domain: {}
				},
				terminal: {},
				user: {},
				GUID: Y
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

	async findByGUIDs(
		actorGUIDs: Actor_GUID[],
	): Promise<IActor[]> {
		let a: QActor
		return await this.db.find.tree({
			select: {},
			from: [
				a = Q.Actor
			],
			where: a.GUID.in(actorGUIDs)
		})
	}

	async insert(
		actors: IActor[],
		context: IContext
	): Promise<void> {
		let a: QActor;
		const values = []
		for (const actor of actors) {
			values.push([
				actor.GUID, actor.application.index,
				actor.user._localId, actor.terminal._localId
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			insertInto: a = Q.Actor,
			columns: [
				a.GUID,
				a.application.index,
				a.user._localId,
				a.terminal._localId
			],
			values
		}, context)
		for (let i = 0; i < actors.length; i++) {
			let actor = actors[i]
			actor._localId = _localIds[i][0]
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
		const GUID = Y
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
					GUID,
					owner: {
						id,
						username,
						GUID,
					}
				},
				user: {
					id,
					username,
					GUID,
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
