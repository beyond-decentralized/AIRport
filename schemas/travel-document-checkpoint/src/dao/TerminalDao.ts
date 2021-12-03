import { and } from '@airport/air-control'
import { DI } from '@airport/di'
import {
	User_Id,
	Terminal_UuId
} from '../ddl/ddl'
import { TERMINAL_DAO } from '../tokens'
import {
	BaseTerminalDao,
	IBaseTerminalDao,
	ITerminal,
	Q,
	QTerminal
} from '../generated/generated'

export interface ITerminalDao
	extends IBaseTerminalDao {

	findByOwnerIdsAndUuIds(
		ownerIds: User_Id[],
		uuIds: Terminal_UuId[]
	): Promise<ITerminal[]>;

	findByUuIds(
		uuIds: Terminal_UuId[]
	): Promise<ITerminal[]>;

	insert(
		terminals: ITerminal[]
	): Promise<void>

}

export class TerminalDao
	extends BaseTerminalDao
	implements ITerminalDao {

	async findByOwnerIdsAndUuIds(
		ownerIds: User_Id[],
		uuIds: Terminal_UuId[]
	): Promise<ITerminal[]> {
		let d: QTerminal
		return await this.db.find.tree({
			select: {},
			from: [
				d = Q.Terminal
			],
			where: and(
				d.owner.id.in(ownerIds),
				d.uuId.in(uuIds)
			)
		})
	}

	async findByUuIds(
		uuIds: Terminal_UuId[],
	): Promise<ITerminal[]> {
		let d: QTerminal
		return await this.db.find.tree({
			select: {},
			from: [
				d = Q.Terminal
			],
			where: d.uuId.in(uuIds)
		})
	}

	async insert(
		terminals: ITerminal[]
	): Promise<void> {
		let t: QTerminal;
		const values = []
		for (const user of terminals) {
			values.push([
				user.uuId, user.owner.id, false,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: t = Q.Terminal,
			columns: [
				t.uuId,
				t.owner.id,
				t.isLocal
			],
			values
		})
	}

}

DI.set(TERMINAL_DAO, TerminalDao)

