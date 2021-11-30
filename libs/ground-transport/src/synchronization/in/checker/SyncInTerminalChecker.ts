import {
	TerminalMessage,
} from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import {
	ITerminal,
	ITerminalDao,
	TERMINAL_DAO,
} from '@airport/travel-document-checkpoint'
import { SYNC_IN_TERMINAL_CHECKER } from '../../../tokens'

export interface ISyncInTerminalChecker {

	ensureTerminals(
		message: TerminalMessage
	): Promise<boolean>

}

export class SyncInTerminalChecker
	implements ISyncInTerminalChecker {

	async ensureTerminals(
		message: TerminalMessage
	): Promise<boolean> {
		try {
			const terminalDao = await container(this).get(TERMINAL_DAO)

			let terminalUuids: string[] = []
			let messageTerminalIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.terminals.length; i++) {
				const terminal = message.terminals[i]
				if (typeof terminal.owner !== 'number') {
					throw new Error(`Expecting "in-message index" (number)
					in 'terminal.owner'`)
				}
				if (!terminal.uuId || typeof terminal.uuId !== 'string') {
					throw new Error(`Invalid 'terminal.uuid'`)
				}
				const owner = message.users[terminal.owner as any]
				if (!owner) {
					throw new Error(
						`Did not find user for terminal.owner with "in-message index" ${terminal.owner}`);
				}
				terminal.owner = owner
				terminalUuids.push(terminal.uuId)
				messageTerminalIndexMap.set(terminal.uuId, i)
				// Make sure id field is not in the input
				delete terminal.id
			}

			const terminals = await terminalDao.findByUuIds(terminalUuids)
			for (const terminal of terminals) {
				const messageUserIndex = messageTerminalIndexMap.get(terminal.uuId)
				message.terminals[messageUserIndex] = terminal
			}

			const missingTerminals = message.terminals
				.filter(messageTerminal => !messageTerminal.id)

			if (missingTerminals.length) {
				await this.addMissingTerminals(missingTerminals, terminalDao)
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async addMissingTerminals(
		missingTerminals: ITerminal[],
		terminalDao: ITerminalDao
	): Promise<void> {
		for (const terminal of missingTerminals) {
			terminal.isLocal = false
		}
		await terminalDao.insert(missingTerminals)
	}

}

DI.set(SYNC_IN_TERMINAL_CHECKER, SyncInTerminalChecker)
