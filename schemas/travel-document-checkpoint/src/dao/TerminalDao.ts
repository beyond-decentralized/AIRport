import { AND } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator';
import {
	UserAccount_LocalId,
	Terminal_GUID
} from '../ddl/ddl'
import {
	BaseTerminalDao,
	IBaseTerminalDao,
	ITerminal,
	QTerminal
} from '../generated/generated'
import Q from '../generated/qApplication'

export interface ITerminalDao
	extends IBaseTerminalDao {

	findByOwnerIdsAndGUIDs(
		ownerIds: UserAccount_LocalId[],
		GUIDs: Terminal_GUID[]
	): Promise<ITerminal[]>;

	findByGUIDs(
		GUIDs: Terminal_GUID[]
	): Promise<ITerminal[]>;

	insert(
		terminals: ITerminal[],
		context: IContext
	): Promise<void>

}

@Injected()
export class TerminalDao
	extends BaseTerminalDao
	implements ITerminalDao {

	async findByOwnerIdsAndGUIDs(
		ownerIds: UserAccount_LocalId[],
		GUIDs: Terminal_GUID[]
	): Promise<ITerminal[]> {
		let t: QTerminal
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				t = Q.Terminal
			],
			WHERE: AND(
				t.owner._localId.IN(ownerIds),
				t.GUID.IN(GUIDs)
			)
		})
	}

	async findByGUIDs(
		GUIDs: Terminal_GUID[],
	): Promise<ITerminal[]> {
		let t: QTerminal
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				t = Q.Terminal
			],
			WHERE: t.GUID.IN(GUIDs)
		})
	}

	async insert(
		terminals: ITerminal[],
		context: IContext
	): Promise<void> {
		let t: QTerminal;
		const VALUES = []
		for (const terminal of terminals) {
			VALUES.push([
				terminal.GUID, terminal.owner._localId, false,
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			INSERT_INTO: t = Q.Terminal,
			columns: [
				t.GUID,
				t.owner._localId,
				t.isLocal
			],
			VALUES
		}, context) as number[][]
		for (let i = 0; i < terminals.length; i++) {
			const terminal = terminals[i]
			terminal._localId = _localIds[i][0]
		}
	}

}
