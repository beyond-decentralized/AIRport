import { and } from '@airport/air-traffic-control'
import { IContext, Injected } from '@airport/direction-indicator';
import {
	User_Id,
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
		ownerIds: User_Id[],
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
		ownerIds: User_Id[],
		GUIDs: Terminal_GUID[]
	): Promise<ITerminal[]> {
		let t: QTerminal
		return await this.db.find.tree({
			select: {},
			from: [
				t = Q.Terminal
			],
			where: and(
				t.owner.id.in(ownerIds),
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
				terminal.GUID, terminal.owner.id, false,
			])
		}
		const ids = await this.db.insertValuesGenerateIds({
			insertInto: t = Q.Terminal,
			columns: [
				t.GUID,
				t.owner.id,
				t.isLocal
			],
			values
		}, context) as number[][]
		for (let i = 0; i < terminals.length; i++) {
			const terminal = terminals[i]
			terminal.id = ids[i][0]
		}
	}

}
