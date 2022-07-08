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
	QUserAccount,
	Terminal_LocalId,
	UserAccount_LocalId
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
	): Promise<IActor[]>

	findWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userAccountIds: UserAccount_LocalId[],
		terminalIds: Terminal_LocalId[]
	): Promise<IActor[]>

	findMapsWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userAccountIds: UserAccount_LocalId[],
		terminalIds: Terminal_LocalId[],
		actorMap: Map<UserAccount_LocalId, Map<Terminal_LocalId, IActor>>,
		actorMapById: Map<Actor_LocalId, IActor>
	): Promise<void>

	findWithUserAccountBy_LocalIdIn(
		actor_localIds: Actor_LocalId[],
	): Promise<IActor[]>

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
		userAccountIds: UserAccount_LocalId[],
		terminalIds: Terminal_LocalId[],
		actorMap: Map<UserAccount_LocalId, Map<Terminal_LocalId, IActor>>,
		actorMapById: Map<Actor_LocalId, IActor>
	): Promise<void> {
		const actors = await this.findWithDetailsByGlobalIds(
			actorGUIDs,
			userAccountIds,
			terminalIds
		)

		for (const actor of actors) {
			ensureChildJsMap(actorMap, actor.userAccount._localId)
				.set(actor.terminal._localId, actor)
			actorMapById.set(actor._localId, actor)
		}
	}

	async findWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userAccountIds: UserAccount_LocalId[],
		terminalIds: Terminal_LocalId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor
		) => and(
			a.GUID.in(actorGUIDs),
			a.terminal._localId.in(terminalIds),
			a.userAccount._localId.in(userAccountIds)
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
		let userAccount: QUserAccount
		return await this.db.find.tree({
			select: {
				_localId: Y,
				application: {
					...ALL_FIELDS,
					domain: {}
				},
				terminal: {},
				userAccount: {},
				GUID: Y
			},
			from: [
				act = Q.Actor,
				application = act.application.innerJoin(),
				domain = application.domain.innerJoin(),
				terminal = act.terminal.leftJoin(),
				userAccount = act.userAccount.leftJoin()
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

	async findWithUserAccountBy_LocalIdIn(
		actor_localIds: Actor_LocalId[],
	): Promise<IActor[]> {
		let a: QActor,
			u: QUserAccount
		return await this.db.find.graph({
			select: {
				'*': Y,
				userAccount: {
					_localId: Y,
					GUID: Y,
					ranking: Y,
					username: Y
				}
			},
			from: [
				a = Q.Actor,
				u = a.userAccount.leftJoin(),
				u.continent.leftJoin(),
				u.country.leftJoin(),
				u.metroArea.leftJoin(),
				u.state.leftJoin()
			],

			where: a._localId.in(actor_localIds)
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
				actor.userAccount._localId, actor.terminal._localId
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			insertInto: a = Q.Actor,
			columns: [
				a.GUID,
				a.application.index,
				a.userAccount._localId,
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
				userAccount: {
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
				a.userAccount.leftJoin()
			],
			where: getWhereClause(a)
		})
	}
}
