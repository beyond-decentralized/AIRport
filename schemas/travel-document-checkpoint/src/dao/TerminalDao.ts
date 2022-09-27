import { AND } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator';
import {
	Terminal_GUID
} from '../ddl/ddl'
import {
	BaseTerminalDao,
	IBaseTerminalDao,
	ITerminal,
	QTerminal
} from '../generated/generated'
import Q from '../generated/qApplication'
import { UserAccount_GUID } from '../ddl/ddl'

export interface ITerminalDao
	extends IBaseTerminalDao {

	findByOwnerIdsAndGUIDs(
		ownerGuids: UserAccount_GUID[],
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
		ownerGuids: UserAccount_GUID[],
		GUIDs: Terminal_GUID[]
	): Promise<ITerminal[]> {
		let t: QTerminal
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				t = Q.Terminal
			],
			WHERE: AND(
				t.owner.GUID.IN(ownerGuids),
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
				terminal.GUID, terminal.owner.GUID, false,
			])
		}
		await this.db.insertValues({
			INSERT_INTO: t = Q.Terminal,
			columns: [
				t.GUID,
				t.owner.GUID,
				t.isLocal
			],
			VALUES
		}, context)
	}

}
