import {and}                          from '@airport/air-control'
import {
	AgtRepositoryId,
	TerminalId
}                                     from '@airport/arrivals-n-departures'
import {DI}                           from '@airport/di'
import {TerminalRepositoryPermission} from '../../ddl/ddl'
import {TERMINAL_REPOSITORY_DAO}      from '../../diTokens'
import {
	BaseTerminalRepositoryDao,
	QTerminalRepository
}                                     from '../../generated/generated'
import {Q}                            from '../../generated/qSchema'

export interface ITerminalRepositoryDao {

	findByTerminalIdInAndRepositoryIdIn(
		terminalIds: TerminalId[],
		repositoryIds: AgtRepositoryId[]
	): Promise<Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>>;

}

export class TerminalRepositoryDao
	extends BaseTerminalRepositoryDao
	implements ITerminalRepositoryDao {

	async findByTerminalIdInAndRepositoryIdIn(
		terminalIds: TerminalId[],
		repositoryIds: AgtRepositoryId[]
	): Promise<Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>> {
		const resultMapByTerminalId: Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>
			      = new Map()

		let tr: QTerminalRepository
		const results = await this.airDb.find.sheet({
			from: [
				tr = Q.TerminalRepository
			],
			select: [
				tr.terminal.id,
				tr.repository.id,
				tr.permission,
			],
			where: and(
				tr.terminal.id.in(terminalIds),
				tr.repository.id.in(repositoryIds)
			)
		})

		for (const result of results) {
			const terminalId       = result[0]
			let repoMapForTerminal = resultMapByTerminalId.get(terminalId)
			if (!repoMapForTerminal) {
				repoMapForTerminal = new Map()
				resultMapByTerminalId.set(terminalId, repoMapForTerminal)
			}
			repoMapForTerminal.set(result[1], result[2])
		}

		return resultMapByTerminalId
	}

}

DI.set(TERMINAL_REPOSITORY_DAO, TerminalRepositoryDao)
