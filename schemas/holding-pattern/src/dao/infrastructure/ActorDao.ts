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
	IActor,
	IDatastructureUtils,
	IUserAccount,
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
import Q from '../../generated/qApplication'
import { IContext, Inject, Injected } from '@airport/direction-indicator'
import { UserAccount_PublicSigningKey } from '@airport/aviation-communication'
import { BaseActorDao, IBaseActorDao } from '../../generated/baseDaos'
import { QActor } from '../../generated/qInterfaces'

export interface IActorDao
	extends IBaseActorDao {

	findWithDetailsAndGlobalIdsByIds(
		actorLids: Actor_LocalId[],
		context: IContext
	): Promise<IActor[]>

	findWithUserAccountBy_LocalIdIn(
		actor_localIds: Actor_LocalId[],
		context: IContext
	): Promise<IActor[]>

	findOneByDomainAndApplication_Names_AccountPublicSigningKey_TerminalGUID(
		domainName: Domain_Name,
		applicationName: Application_Name,
		accountPublicSigningKey: UserAccount_PublicSigningKey,
		terminalGUID: Terminal_GUID,
		context: IContext
	): Promise<IActor>

	findByGUIDs(
		actorGUIDs: Actor_GUID[],
		context: IContext
	): Promise<IActor[]>

	insert(
		actors: IActor[],
		context: IContext
	): Promise<void>

	updateUserAccount(
		userAccount: IUserAccount,
		actor: IActor,
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
		actorLids: Actor_LocalId[],
		context: IContext
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor,
		) => a._localId.IN(actorLids), context)
	}

	async findOneByDomainAndApplication_Names_AccountPublicSigningKey_TerminalGUID(
		domainName: Domain_Name,
		applicationName: Application_Name,
		accountPublicSigningKey: UserAccount_PublicSigningKey,
		terminalGUID: Terminal_GUID,
		context: IContext
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
		}, context)
	}

	async findByGUIDs(
		actorGUIDs: Actor_GUID[],
		context: IContext
	): Promise<IActor[]> {
		let a: QActor
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				a = Q.Actor
			],
			WHERE: a.GUID.IN(actorGUIDs)
		}, context)
	}

	async findWithUserAccountBy_LocalIdIn(
		actor_localIds: Actor_LocalId[],
		context: IContext
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
		}, context)
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

	async updateUserAccount(
		userAccount: IUserAccount,
		actor: IActor,
		context: IContext
	): Promise<void> {
		let a: QActor;
		await this.db.updateColumnsWhere({
			UPDATE: a = Q.Actor,
			SET: {
				USER_ACCOUNT_LID: userAccount._localId
			},
			WHERE: a._localId.equals(actor._localId)
		}, context)
	}

	private async findWithDetailsAndGlobalIdsByWhereClause(
		getWhereClause: (
			a: QActor
		) => QueryBaseOperation,
		context: IContext
	): Promise<IActor[]> {
		let a: QActor
		let ap: QDdlApplication
		let t: QTerminal
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
					_localId: Y,
					GUID: Y,
					owner: {}
				},
				userAccount: {}
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
		}, context)
	}
}
