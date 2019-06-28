import {and}              from '@airport/air-control'
import {
	TerminalName,
	TerminalSecondId
}                         from '@airport/arrivals-n-departures'
import {DI}               from '@airport/di'
import {ensureChildJsMap} from '@airport/ground-control'
import {UserId}           from '../ddl/ddl'
import {TERMINAL_DAO}     from '../diTokens'
import {
	BaseTerminalDao,
	IBaseTerminalDao,
	ITerminal,
	Q,
	QTerminal
}                         from '../generated/generated'

export interface ITerminalDao
	extends IBaseTerminalDao {

	findMapByIds(
		ownerUniqueIds: UserId[],
		names: TerminalName[],
		secondIds: TerminalSecondId[]
	): Promise<Map<UserId, Map<TerminalName, Map<TerminalSecondId, ITerminal>>>>;

	findByIds(
		ownerIds: UserId[],
		names: TerminalName[],
		secondIds: TerminalSecondId[]
	): Promise<ITerminal[]>;

}

export class TerminalDao
	extends BaseTerminalDao
	implements ITerminalDao {

	async findMapByIds(
		ownerIds: UserId[],
		names: TerminalName[],
		secondIds: TerminalSecondId[]
	): Promise<Map<UserId, Map<TerminalName, Map<TerminalSecondId, ITerminal>>>> {
		const terminalMap: Map<UserId,
			Map<TerminalName, Map<TerminalSecondId, ITerminal>>> = new Map()

		const terminals = await this.findByIds(ownerIds, names, secondIds)
		for (const terminal of terminals) {
			ensureChildJsMap(
				ensureChildJsMap(terminalMap,
					terminal.owner.id),
				terminal.name)
				.set(terminal.secondId, terminal)
		}

		return terminalMap
	}

	async findByIds(
		ownerIds: UserId[],
		names: TerminalName[],
		secondIds: TerminalSecondId[]
	): Promise<ITerminal[]> {
		let d: QTerminal
		return await this.db.find.tree({
			select: {},
			from: [
				d = Q.Terminal
			],
			where: and(
				d.owner.id.in(ownerIds),
				d.name.in(names),
				d.secondId.in(secondIds)
			)
		})
	}

}

DI.set(TERMINAL_DAO, TerminalDao)

