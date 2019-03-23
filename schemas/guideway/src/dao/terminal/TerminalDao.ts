import {
	and,
	Y
}                                            from '@airport/air-control'
import {
	AgtRepositoryId,
	TerminalId,
	TerminalPassword,
}                                            from '@airport/arrivals-n-departures'
import {DI}                                  from '@airport/di'
import {TerminalLastPollConnectionDatetime,} from '../../ddl/ddl'
import {TERMINAL_DAO}                        from '../../diTokens'
import {
	BaseTerminalDao,
	IBaseTerminalDao
}                                            from '../../generated/baseDaos'
import {Q}                                   from '../../generated/qSchema'
import {
	ITerminal,
	QTerminal
}                                            from '../../generated/terminal/qterminal'
import {QTerminalRepository}                 from '../../generated/terminal/qterminalrepository'

export type TerminalKey = string;

export interface ITerminalDao
	extends IBaseTerminalDao {

	findTerminalVerificationRecords(
		terminalIds: TerminalId[],
	): Promise<Map<TerminalId, [TerminalPassword,
		TerminalLastPollConnectionDatetime, TerminalId]>>; //.

	/**
	 * Finds Terminals with Repository Relations and User Info,
	 * via matching records in Terminal Repository Verification Stage.
	 *
	 * @param {TerminalRepositoryVerificationStageServerId} serverId
	 * @param {TerminalRepositoryVerificationStageRunId} verificationRunId
	 * @returns {Promise<Map<TerminalKey, ITerminal>>}
	 */
	findTerminalRepositoryVerificationRecords(
		terminalIds: TerminalId[],
		// Superset of all of repository ids received for all of the above terminals
		repositoryIds: AgtRepositoryId[],
	): Promise<Map<TerminalId, AgtRepositoryId>>;

	findSseLoginVerificationRecords(
		terminalPasswords: TerminalPassword[],
	): Promise<Map<TerminalPassword, ITerminal>>;

	updateLastPollConnectionDatetime(
		terminalIds: TerminalId[],
		lastPollConnectionDatetime: TerminalLastPollConnectionDatetime
	): Promise<void>;

	updateLastSseConnectionDatetime(
		terminalPasswords: TerminalPassword[],
	): Promise<void>;

}

export class TerminalDao
	extends BaseTerminalDao
	implements ITerminalDao {

	async findTerminalVerificationRecords(
		terminalIds: TerminalId[],
	): Promise<Map<TerminalId, [TerminalPassword,
		TerminalLastPollConnectionDatetime, TerminalId]>> {
		const resultMapByTerminalId: Map<TerminalId, [TerminalPassword,
			TerminalLastPollConnectionDatetime, TerminalId]>
			      = new Map()

		let t: QTerminal
		const results = await this.airDb.find.sheet({
			from: [
				t = Q.Terminal
			],
			select: [
				t.password,
				t.lastPollConnectionDatetime,
				t.id,
			],
			where: t.id.in(terminalIds)
		})

		for (const result of results) {
			resultMapByTerminalId.set(result[2],
				<[TerminalPassword, TerminalLastPollConnectionDatetime,
					TerminalId]>result)
		}

		return resultMapByTerminalId
	}

	async findTerminalRepositoryVerificationRecords(
		terminalIds: TerminalId[],
		// Superset of all of repository ids received for all of the above terminals
		repositoryIds: AgtRepositoryId[],
	): Promise<Map<TerminalId, AgtRepositoryId>> {
		const resultMapByTerminalId: Map<TerminalId, AgtRepositoryId> = new Map()

		let tr: QTerminalRepository
		const results = await this.airDb.find.sheet({
			from: [
				tr = Q.TerminalRepository,
			],
			select: [
				tr.terminal.id,
				tr.repository.id
			],
			where: and(
				tr.terminal.id.in(terminalIds),
				// Joining on the superset of the repositories should return
				// all needed records and possibly additional ones
				tr.repository.id.in(repositoryIds)
			)
		})

		for (const result of results) {
			resultMapByTerminalId.set(result[0], result[1])
		}

		return resultMapByTerminalId
	}

	async findSseLoginVerificationRecords(
		terminalPasswords: TerminalPassword[],
	): Promise<Map<TerminalPassword, ITerminal>> {
		const resultMapByPassword: Map<TerminalPassword, ITerminal> = new Map()

		let t: QTerminal,
		    tr: QTerminalRepository
		const id      = Y, password = Y, lastConnectionDatetime = Y
		const results = await this.db.find.tree({
			select: {
				id,
				password,
				lastConnectionDatetime
			},
			from: [
				t = Q.Terminal,
			],
			where:
				t.password.in(terminalPasswords),
		})

		for (const result of results) {
			resultMapByPassword.set(result.password, result)
		}

		return resultMapByPassword
	}

	async updateLastPollConnectionDatetime(
		terminalIds: TerminalId[],
		lastPollConnectionDatetime: TerminalLastPollConnectionDatetime
	): Promise<void> {
		let t: QTerminal
		await this.db.updateWhere({
			update: t = Q.Terminal,
			set: {
				lastPollConnectionDatetime
			},
			where: t.id.in(terminalIds)
		})
	}

	async updateLastSseConnectionDatetime(
		terminalPasswords: TerminalPassword[]
	): Promise<void> {
		let t: QTerminal
		await this.db.updateWhere({
			update: t = Q.Terminal,
			set: {
				lastSseConnectionDatetime: new Date().getTime()
			},
			where: t.password.in(terminalPasswords)
		})
	}

}

DI.set(TERMINAL_DAO, TerminalDao)
