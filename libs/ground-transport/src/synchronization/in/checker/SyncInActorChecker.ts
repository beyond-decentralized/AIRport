import {
	TerminalId,
	TerminalMessage,
	TerminalName,
	TerminalSecondId
} from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import { ensureChildJsMap } from '@airport/ground-control'
import {
	ACTOR_DAO,
	ActorId,
	ActorUuId,
	IActor
} from '@airport/holding-pattern'
import {
	TERMINAL_DAO,
	User_PrivateId
} from '@airport/travel-document-checkpoint'
import { SYNC_IN_ACTOR_CHECKER } from '../../../tokens'
import { MessageToTM } from '../../types'
import {
	IDataToTM,
	RemoteActorId
} from '../SyncInUtils'
import { TerminalCheckResults } from './SyncInTerminalChecker'
import { UserCheckResults } from './SyncInUserChecker'

export interface ActorCheckResults {
	actorMap: Map<ActorUuId, Map<User_PrivateId,
		Map<TerminalName, Map<TerminalSecondId, Map<User_PrivateId, IActor>>>>>;
	actorMapById: Map<ActorId, IActor>;
	consistentMessages: IDataToTM[];
	inconsistentMessages: IDataToTM[];
}

export interface ISyncInActorChecker {

	ensureActors(
		message: TerminalMessage
	): Promise<boolean>

}

export class SyncInActorChecker
	implements ISyncInActorChecker {

	async ensureActors(
		message: TerminalMessage
	): Promise<boolean> {
		try {
			const actorDao = await container(this).get(ACTOR_DAO)

			let actorUuids: string[] = []
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
				terminal.owner = message.terminals[terminal.owner as any]
				actorUuids.push(terminal.uuId)
				messageTerminalIndexMap.set(terminal.uuId, i)
				// Make sure id field is not in the input
				delete terminal.id
			}

			const terminals = await actorDao.findByUuIds(actorUuids)
			for (const terminal of terminals) {
				const messageUserIndex = messageTerminalIndexMap.get(terminal.uuId)
				message.terminals[messageUserIndex] = terminal
			}

			const missingTerminals = message.terminals
				.filter(messageTerminal => !messageTerminal.id)

			if (missingTerminals.length) {
				await this.addMissingTerminals(missingTerminals, actorDao)
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

DI.set(SYNC_IN_ACTOR_CHECKER, SyncInActorChecker)
