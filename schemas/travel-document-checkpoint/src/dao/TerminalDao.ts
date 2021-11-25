import { and } from '@airport/air-control'
import { DI } from '@airport/di'
import { ensureChildJsMap } from '@airport/ground-control'
import {
	UserId,
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

	findMapByIds(
		ownerUniqueIds: UserId[],
		uuIds: Terminal_UuId[]
	): Promise<Map<UserId, Map<Terminal_UuId, ITerminal>>>;

	findByIds(
		ownerIds: UserId[],
		uuIds: Terminal_UuId[]
	): Promise<ITerminal[]>;

}

export class TerminalDao
	extends BaseTerminalDao
	implements ITerminalDao {

	async findMapByIds(
		ownerIds: UserId[],
		uuIds: Terminal_UuId[],
	): Promise<Map<UserId, Map<Terminal_UuId, ITerminal>>> {
		const terminalMap: Map<UserId, Map<Terminal_UuId, ITerminal>> = new Map()

		const terminals = await this.findByIds(ownerIds, uuIds)
		for (const terminal of terminals) {
			ensureChildJsMap(terminalMap, terminal.owner.id)
				.set(terminal.uuId, terminal)
		}

		return terminalMap
	}

	async findByIds(
		ownerIds: UserId[],
		uuIds: Terminal_UuId[],
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

}

DI.set(TERMINAL_DAO, TerminalDao)

