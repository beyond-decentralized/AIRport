import {
	ALL_FIELDS,
	AND,
	Y
} from '@airport/tarmaq-query'
import {
	Actor_GUID,
	Actor_LocalId,
	Application_Name,
	Domain_Name,
	IDatastructureUtils,
	JSONBaseOperation
} from '@airport/ground-control'
import {
	QApplication,
	QDomain
} from '@airport/airspace/dist/app/bundle'
import {
	QTerminal,
	QUserAccount,
	Terminal_GUID,
	UserAccount_GUID,
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import {
	Actor
} from '../../ddl/infrastructure/Actor'
import {
	BaseActorDao,
	IActor,
	IBaseActorDao,
	QActor
} from '../../generated/generated'
import Q from '../../generated/qApplication'
import { IContext, Inject, Injected } from '@airport/direction-indicator'

export interface IActorDao
	extends IBaseActorDao {

	findWithDetailsAndGlobalIdsByIds(
		actorIds: Actor_LocalId[]
	): Promise<IActor[]>

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

	@Inject()
	datastructureUtils: IDatastructureUtils

	async findWithDetailsAndGlobalIdsByIds(
		actorIds: Actor_LocalId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor,
		) => a._localId.IN(actorIds))
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
		const _localId = Y
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
					_localId: 
					GUID,
					owner: {
						username,
						GUID,
					}
				},
				userAccount: {
					_localId,
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
