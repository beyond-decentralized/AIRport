import { AND } from '@airport/tarmaq-query'
import { IContext, Inject, Injected } from '@airport/direction-indicator'
import { IAirportDatabase } from '@airport/air-traffic-control'
import { Dictionary, ISequenceGenerator, ITerminal, IUserAccount, Terminal_GUID } from '@airport/ground-control'
import { UserAccount_PublicSigningKey } from '@airport/aviation-communication'
import { BaseTerminalDao, IBaseTerminalDao } from '../generated/baseDaos'
import { QTerminal, QUserAccount } from '../generated/qInterfaces'

export interface ITerminalDao
	extends IBaseTerminalDao {

	findByOwnerPublicKeysAndOwnGUIDs(
		accountPublicSigningKeys: UserAccount_PublicSigningKey[],
		GUIDs: Terminal_GUID[],
		context: IContext
	): Promise<ITerminal[]>

	findByGUIDs(
		GUIDs: Terminal_GUID[],
		context: IContext
	): Promise<ITerminal[]>

	insert(
		terminals: ITerminal[],
		context: IContext
	): Promise<void>

	updateOwner(
		terminal: ITerminal,
		userAccount: IUserAccount,
		context: IContext
	): Promise<void>

}

@Injected()
export class TerminalDao
	extends BaseTerminalDao
	implements ITerminalDao {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	dictionary: Dictionary

	@Inject()
	sequenceGenerator: ISequenceGenerator

	async findByOwnerPublicKeysAndOwnGUIDs(
		accountPublicSigningKeys: UserAccount_PublicSigningKey[],
		GUIDs: Terminal_GUID[],
		context: IContext
	): Promise<ITerminal[]> {
		let t: QTerminal,
			ua: QUserAccount
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				t = this.qSchema.Terminal,
				ua = t.owner.LEFT_JOIN()
			],
			WHERE: AND(
				ua.accountPublicSigningKey.IN(accountPublicSigningKeys),
				t.GUID.IN(GUIDs)
			)
		}, context)
	}

	async findByGUIDs(
		GUIDs: Terminal_GUID[],
		context: IContext
	): Promise<ITerminal[]> {
		let t: QTerminal
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				t = this.qSchema.Terminal
			],
			WHERE: t.GUID.IN(GUIDs)
		}, context)
	}

	async insert(
		terminals: ITerminal[],
		context: IContext
	): Promise<void> {
		const VALUES = []
		for (let i = 0; i < terminals.length; i++) {
			const terminal = terminals[i]
			VALUES.push([
				terminal.GUID, terminal.owner._localId, false
			])
		}

		let t: QTerminal

		const ids = await this.db.insertValuesGenerateIds({
			INSERT_INTO: t = this.qSchema.Terminal,
			columns: [
				t.GUID,
				t.owner._localId,
				t.isLocal
			],
			VALUES
		}, context) as number[]
		
		for (let i = 0; i < terminals.length; i++) {
			const terminal = terminals[i]
			terminal._localId = ids[i][0]
		}
	}

	async updateOwner(
		terminal: ITerminal,
		userAccount: IUserAccount,
		context: IContext
	): Promise<void> {
		let t: QTerminal;
		await this.db.updateColumnsWhere({
			UPDATE: t = this.qSchema.Terminal,
			SET: {
				OWNER_USER_ACCOUNT_LID: userAccount._localId
			},
			WHERE: t._localId.equals(terminal._localId)
		}, context)

		terminal.owner = userAccount
	}

}
