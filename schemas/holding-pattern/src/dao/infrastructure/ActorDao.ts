import {
	ALL_FIELDS,
	AND,
	Y
} from '@airport/tarmaq-query'
import {
	Actor_GUID,
	Actor_LocalId,
	DbApplication_Name,
	DbDomain_Name,
	IActor,
	IDatastructureUtils,
	QueryBaseOperation,
	Terminal_GUID,
} from '@airport/ground-control'
import {
	QDdlApplication,
	QDdlDomain
} from '@airport/airspace/dist/app/bundle'
import {
	QTerminal,
	QUserAccount,
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import {
	BaseActorDao,
	IBaseActorDao,
	QActor
} from '../../generated/generated'
import Q from '../../generated/qApplication'
import { IContext, Inject, Injected } from '@airport/direction-indicator'
import { UserAccount_PublicSigningKey } from '@airport/aviation-communication'

export interface IActorDao
	extends IBaseActorDao {

	findWithDetailsAndGlobalIdsByIds(
		actorIds: Actor_LocalId[]
	): Promise<IActor[]>

	findWithUserAccountBy_LocalIdIn(
		actor_localIds: Actor_LocalId[],
	): Promise<IActor[]>

	findOneByDomainAndDbApplication_Names_AccountPublicSigningKey_TerminalGUID(
		domainName: DbDomain_Name,
		applicationName: DbApplication_Name,
		accountPublicSigningKey: UserAccount_PublicSigningKey,
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

	async findOneByDomainAndDbApplication_Names_AccountPublicSigningKey_TerminalGUID(
		domainName: DbDomain_Name,
		applicationName: DbApplication_Name,
		accountPublicSigningKey: UserAccount_PublicSigningKey,
		terminalGUID: Terminal_GUID
	): Promise<IActor> {
		let act: QActor
		let application: QDdlApplication
		let domain: QDdlDomain
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
				userAccount.accountPublicSigningKey.equals(accountPublicSigningKey)
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
					accountPublicSigningKey: Y,
					username: Y
				}
			},
			FROM: [
				a = Q.Actor,
				u = a.userAccount.LEFT_JOIN()
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
		) => QueryBaseOperation
	): Promise<IActor[]> {
		let a: QActor
		let ap: QDdlApplication
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
