import { and } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator';
import {
	UserAccount_LocalId,
	Terminal_GUID
} from '../ddl/ddl'
import {
	BaseTerminalDao,
	IBaseTerminalDao,
	ITerminal,
	Q,
	QTerminal
} from '../generated/generated'

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
			select: {},
			from: [
				t = Q.Terminal
			],
			where: and(
				t.owner._localId.in(ownerIds),
				t.GUID.in(GUIDs)
			)
		})
	}

	async findByGUIDs(
		GUIDs: Terminal_GUID[],
	): Promise<ITerminal[]> {
		let t: QTerminal
		return await this.db.find.tree({
			select: {},
			from: [
				t = Q.Terminal
			],
			where: t.GUID.in(GUIDs)
		})
	}

	async insert(
		terminals: ITerminal[],
		context: IContext
	): Promise<void> {
		let t: QTerminal;
		const values = []
		for (const terminal of terminals) {
			values.push([
				terminal.GUID, terminal.owner._localId, false,
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			insertInto: t = Q.Terminal,
			columns: [
				t.GUID,
				t.owner._localId,
				t.isLocal
			],
			values
		}, context) as number[][]
		for (let i = 0; i < terminals.length; i++) {
			const terminal = terminals[i]
			terminal._localId = _localIds[i][0]
		}
	}

}
