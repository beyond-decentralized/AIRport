import {
	RepositorySynchronizationMessage,
} from '@airport/arrivals-n-departures'
import {
	DEPENDENCY_INJECTION
} from '@airport/direction-indicator'
import {
	ITerminal,
	ITerminalDao
} from '@airport/travel-document-checkpoint-internal'
import { SYNC_IN_TERMINAL_CHECKER } from '../../../tokens'

export interface ISyncInTerminalChecker {

	ensureTerminals(
		message: RepositorySynchronizationMessage
	): Promise<boolean>

}

export class SyncInTerminalChecker
	implements ISyncInTerminalChecker {

	terminalDao: ITerminalDao

	async ensureTerminals(
		message: RepositorySynchronizationMessage
	): Promise<boolean> {
		try {
			let terminalUuids: string[] = []
			let messageTerminalIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.terminals.length; i++) {
				const terminal = message.terminals[i]
				if (typeof terminal.owner !== 'number') {
					throw new Error(`Expecting "in-message index" (number)
					in 'terminal.owner' of RepositorySynchronizationMessage.terminals`)
				}
				if (typeof terminal.uuId !== 'string' || terminal.uuId.length !== 36) {
					throw new Error(`Invalid 'terminal.uuid' in RepositorySynchronizationMessage.terminals`)
				}
				if (terminal.isLocal !== undefined) {
					throw new Error(`'terminal.isLocal' cannot defined in RepositorySynchronizationMessage.terminals`)
				}
				terminal.isLocal = false
				const owner = message.users[terminal.owner as any]
				if (!owner) {
					throw new Error(
						`Did not find user for terminal.owner with "in-message index" ${terminal.owner}
						for RepositorySynchronizationMessage.terminals`);
				}
				terminal.owner = owner
				terminalUuids.push(terminal.uuId)
				messageTerminalIndexMap.set(terminal.uuId, i)
				// Make sure id field is not in the input
				delete terminal.id
			}

			const terminals = await this.terminalDao.findByUuIds(terminalUuids)
			for (const terminal of terminals) {
				const messageUserIndex = messageTerminalIndexMap.get(terminal.uuId)
				message.terminals[messageUserIndex] = terminal
			}

			const missingTerminals = message.terminals
				.filter(messageTerminal => !messageTerminal.id)

			if (missingTerminals.length) {
				await this.addMissingTerminals(missingTerminals)
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async addMissingTerminals(
		missingTerminals: ITerminal[]
	): Promise<void> {
		for (const terminal of missingTerminals) {
			terminal.isLocal = false
		}
		await this.terminalDao.insert(missingTerminals)
	}

}

DEPENDENCY_INJECTION.set(SYNC_IN_TERMINAL_CHECKER, SyncInTerminalChecker)
