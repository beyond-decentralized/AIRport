import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ITerminalDao
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import { IRepositoryBlockData, ITerminal, Terminal_GUID } from '@airport/ground-control'

export interface ISyncInTerminalChecker {

	ensureTerminals(
		data: IRepositoryBlockData,
		context: IContext
	): Promise<boolean>

}

@Injected()
export class SyncInTerminalChecker
	implements ISyncInTerminalChecker {

	@Inject()
	terminalDao: ITerminalDao

	async ensureTerminals(
		data: IRepositoryBlockData,
		context: IContext
	): Promise<boolean> {
		try {
			let terminalGUIDs: string[] = []
			let blockTerminalIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < data.terminals.length; i++) {
				const terminal = data.terminals[i]
				if (typeof terminal._localId !== 'undefined') {
					throw new Error(`'terminal._localId' cannot be specified`)
				}
				if (typeof terminal.owner !== 'number') {
					throw new Error(`Expecting "in-block index" (number)
					in 'terminal.owner' of IRepositoryBlockData.terminals`)
				}
				if (typeof terminal.GUID !== 'string' || terminal.GUID.length !== 36) {
					throw new Error(`Invalid 'terminal.GUID' in IRepositoryBlockData.terminals`)
				}
				if (terminal.isLocal !== undefined) {
					throw new Error(`'terminal.isLocal' cannot defined in IRepositoryBlockData.terminals`)
				}
				terminal.isLocal = false
				const owner = data.userAccounts[terminal.owner as any]
				if (!owner) {
					throw new Error(
						`Did not find userAccount for terminal.owner with "in-block index" ${terminal.owner}
						for IRepositoryBlockData.terminals`);
				}
				terminal.owner = owner
				terminalGUIDs.push(terminal.GUID)
				blockTerminalIndexMap.set(terminal.GUID, i)
			}

			const terminals = await this.terminalDao.findByGUIDs(terminalGUIDs, context)
			const foundTerminalsByGUID: Map<Terminal_GUID, ITerminal> = new Map()
			for (const terminal of terminals) {
				foundTerminalsByGUID.set(terminal.GUID, terminal)
				const blockTerminalIndex = blockTerminalIndexMap.get(terminal.GUID)
				data.terminals[blockTerminalIndex] = terminal
			}

			const missingTerminals = data.terminals
				.filter(blockTerminal => !foundTerminalsByGUID.has(blockTerminal.GUID))

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
			delete terminal._localId
		}
		await this.terminalDao.insert(missingTerminals, context)
	}

}
