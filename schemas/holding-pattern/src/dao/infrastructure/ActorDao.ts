import {
	ALL_FIELDS,
	AND,
	Y
} from '@airport/tarmaq-query'
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
		) => a._localId.IN(actorIds))
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
		) => AND(
			a.GUID.IN(actorGUIDs),
			a.terminal._localId.IN(terminalIds),
			a.userAccount._localId.IN(userAccountIds)
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
			SELECT: {
				_localId: Y,
				application: {
					...ALL_FIELDS,
					domain: {}
				},
				terminal: {},
				userAccount: {},
				GUID: Y
			},
			FROM: [
				act = Q.Actor,
				application = act.application.INNER_JOIN(),
				domain = application.domain.INNER_JOIN(),
				terminal = act.terminal.LEFT_JOIN(),
				userAccount = act.userAccount.LEFT_JOIN()
			],
			WHERE: AND(
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
			SELECT: {},
			FROM: [
				a = Q.Actor
			],
			WHERE: a.GUID.IN(actorGUIDs)
		})
	}

	async findWithUserAccountBy_LocalIdIn(
		actor_localIds: Actor_LocalId[],
	): Promise<IActor[]> {
		let a: QActor,
			u: QUserAccount
		return await this.db.find.graph({
			SELECT: {
				'*': Y,
				userAccount: {
					_localId: Y,
					GUID: Y,
					ranking: Y,
					username: Y
				}
			},
			FROM: [
				a = Q.Actor,
				u = a.userAccount.LEFT_JOIN(),
				u.continent.LEFT_JOIN(),
				u.country.LEFT_JOIN(),
				u.metroArea.LEFT_JOIN(),
				u.state.LEFT_JOIN()
			],

			WHERE: a._localId.IN(actor_localIds)
		})
	}

	async insert(
		actors: IActor[],
		context: IContext
	): Promise<void> {
		let a: QActor;
		const VALUES = []
		for (const actor of actors) {
			VALUES.push([
				actor.GUID, actor.application.index,
				actor.userAccount._localId, actor.terminal._localId
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			INSERT_INTO: a = Q.Actor,
			columns: [
				a.GUID,
				a.application.index,
				a.userAccount._localId,
				a.terminal._localId
			],
			VALUES
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
			SELECT: {
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
			FROM: [
				a = Q.Actor,
				ap = a.application.LEFT_JOIN(),
				ap.domain.LEFT_JOIN(),
				t = a.terminal.LEFT_JOIN(),
				t.owner.LEFT_JOIN(),
				a.userAccount.LEFT_JOIN()
			],
			WHERE: getWhereClause(a)
		})
	}
}
