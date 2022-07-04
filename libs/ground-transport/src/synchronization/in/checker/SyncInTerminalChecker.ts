import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	RepositorySynchronizationMessage,
} from '@airport/arrivals-n-departures'
import {
	ITerminal,
	ITerminalDao
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index'

export interface ISyncInTerminalChecker {

	ensureTerminals(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<boolean>

}

@Injected()
export class SyncInTerminalChecker
	implements ISyncInTerminalChecker {

	@Inject()
	terminalDao: ITerminalDao

	async ensureTerminals(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<boolean> {
		try {
			let terminalGUIDs: string[] = []
			let messageTerminalIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.terminals.length; i++) {
				const terminal = message.terminals[i]
				if (typeof terminal.owner !== 'number') {
					throw new Error(`Expecting "in-message index" (number)
					in 'terminal.owner' of RepositorySynchronizationMessage.terminals`)
				}
				if (typeof terminal.GUID !== 'string' || terminal.GUID.length !== 36) {
					throw new Error(`Invalid 'terminal.GUID' in RepositorySynchronizationMessage.terminals`)
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
				terminalGUIDs.push(terminal.GUID)
				messageTerminalIndexMap.set(terminal.GUID, i)
				// Make sure id field is not in the input
				delete terminal._localId
			}

			const terminals = await this.terminalDao.findByGUIDs(terminalGUIDs)
			for (const terminal of terminals) {
				const messageUserIndex = messageTerminalIndexMap.get(terminal.GUID)
				message.terminals[messageUserIndex] = terminal
			}

			const missingTerminals = message.terminals
				.filter(messageTerminal => !messageTerminal._localId)

			if (missingTerminals.length) {
				await this.addMissingTerminals(missingTerminals, context)
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async addMissingTerminals(
		missingTerminals: ITerminal[],
		context: IContext
	): Promise<void> {
		for (const terminal of missingTerminals) {
			terminal.isLocal = false
		}
		await this.terminalDao.insert(missingTerminals, context)
	}

}
