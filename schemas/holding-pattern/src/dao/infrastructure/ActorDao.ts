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
	Terminal_GUID,
	UserAccount_GUID,
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import {
	Actor_LocalId,
	Actor_GUID,
	Actor,
} from '../../ddl/infrastructure/Actor'
import {
	BaseActorDao,
	IActor,
	IBaseActorDao,
	QActor
} from '../../generated/generated'
import Q from '../../generated/qApplication'
import { IContext, Injected } from '@airport/direction-indicator'

export interface IActorDao
	extends IBaseActorDao {

	findWithDetailsAndGlobalIdsByIds(
		actorIds: Actor_LocalId[]
	): Promise<IActor[]>

	findWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userAccountIds: UserAccount_GUID[],
		terminalIds: Terminal_GUID[]
	): Promise<IActor[]>

	findMapsWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userAccountIds: UserAccount_GUID[],
		terminalIds: Terminal_GUID[],
		actorMap: Map<UserAccount_GUID, Map<Terminal_GUID, IActor>>,
		actorMapById: Map<Actor_LocalId, IActor>
	): Promise<void>

	findWithUserAccountBy_LocalIdIn(
		actor_localIds: Actor_LocalId[],
	): Promise<IActor[]>

	findOneByDomainAndApplication_Names_UserAccountGUID_TerminalGUID(
		domainName: Domain_Name,
		applicationName: Application_Name,
		userAccountGUID: UserAccount_GUID,
		terminalGUID: Terminal_GUID
	): Promise<IActor>

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
		userAccountGUIDs: UserAccount_GUID[],
		terminalGUIDs: Terminal_GUID[],
		actorMap: Map<UserAccount_GUID, Map<Terminal_GUID, IActor>>,
		actorMapById: Map<Actor_LocalId, IActor>
	): Promise<void> {
		const actors = await this.findWithDetailsByGlobalIds(
			actorGUIDs,
			userAccountGUIDs,
			terminalGUIDs
		)

		for (const actor of actors) {
			ensureChildJsMap(actorMap, actor.userAccount.GUID)
				.set(actor.terminal.GUID, actor)
			actorMapById.set(actor._localId, actor)
		}
	}

	async findWithDetailsByGlobalIds(
		actorGUIDs: Actor_GUID[],
		userAccountGUIDs: UserAccount_GUID[],
		terminalGUIDs: Terminal_GUID[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor
		) => AND(
			a.GUID.IN(actorGUIDs),
			a.terminal.GUID.IN(terminalGUIDs),
			a.userAccount.GUID.IN(userAccountGUIDs)
		))
	}

	async findOneByDomainAndApplication_Names_UserAccountGUID_TerminalGUID(
		domainName: Domain_Name,
		applicationName: Application_Name,
		userAccountGUID: UserAccount_GUID,
		terminalGUID: Terminal_GUID
	): Promise<Actor> {
		let act: QActor
		let application: QApplication
		let domain: QDomain
		let terminal: QTerminal
		let userAccount: QUserAccount
		return await this.db.findOne.tree({
			SELECT: {
				_localId: Y,
				application: {
					domain: {
						name: Y
					},
					fullName: Y,
					index: Y,
					name: Y
				},
				terminal: {},
				userAccount: {},
				GUID: Y
			},
			FROM: [
				act = Q.Actor,
				application = act.application.LEFT_JOIN(),
				domain = application.domain.LEFT_JOIN(),
				terminal = act.terminal.LEFT_JOIN(),
				userAccount = act.userAccount.LEFT_JOIN()
			],
			WHERE: AND(
				domain.name.equals(domainName),
				application.name.equals(applicationName),
				terminal.GUID.equals(terminalGUID),
				userAccount.GUID.equals(userAccountGUID)
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
				actor.userAccount.GUID, actor.terminal.GUID
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			INSERT_INTO: a = Q.Actor,
			columns: [
				a.GUID,
				a.application.index,
				a.userAccount.GUID,
				a.terminal.GUID
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
					GUID,
					owner: {
						username,
						GUID,
					}
				},
				userAccount: {
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
