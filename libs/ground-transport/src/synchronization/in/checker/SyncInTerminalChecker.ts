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
	ITerminalDao,
	Terminal_GUID
} from '@airport/travel-document-checkpoint/dist/app/bundle'

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
				const owner = message.userAccounts[terminal.owner as any]
				if (!owner) {
					throw new Error(
						`Did not find userAccount for terminal.owner with "in-message index" ${terminal.owner}
						for RepositorySynchronizationMessage.terminals`);
				}
				terminal.owner = owner
				terminalGUIDs.push(terminal.GUID)
				messageTerminalIndexMap.set(terminal.GUID, i)
			}

			const terminals = await this.terminalDao.findByGUIDs(terminalGUIDs)
			const foundTerminalsByGUID: Map<Terminal_GUID, ITerminal> = new Map()
			for (const terminal of terminals) {
				foundTerminalsByGUID.set(terminal.GUID, terminal)
				const messageUserAccountIndex = messageTerminalIndexMap.get(terminal.GUID)
				message.terminals[messageUserAccountIndex] = terminal
			}

			const missingTerminals = message.terminals
				.filter(messageTerminal => !foundTerminalsByGUID.has(messageTerminal.GUID))

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
