import {
	TerminalMessage,
} from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import {
	ACTOR_DAO
} from '@airport/holding-pattern'
import { SYNC_IN_ACTOR_CHECKER } from '../../../tokens'

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
			let messageActorIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.actors.length; i++) {
				const actor = message.actors[i]
				if (typeof actor.uuId !== 'string' || actor.uuId.length !== 36) {
					throw new Error(`Invalid 'terminal.uuid'`)
				}
				if (typeof actor.user !== 'number') {
					throw new Error(`Expecting "in-message index" (number)
						in 'actor.user'`)
				}
				const user = message.users[actor.user as any]
				if (!user) {
					throw new Error(
						`Did not find actor.user with "in-message index" ${actor.user}`);
				}
				actor.user = user
				if (typeof actor.terminal !== 'number') {
					throw new Error(`Expecting "in-message index" (number)
						in 'actor.terminal'`)
				}
				const terminal = message.terminals[actor.terminal as any]
				if (!terminal) {
					throw new Error(
						`Did not find actor.terminal with "in-message index" ${actor.terminal}`);
				}
				actor.terminal = terminal
				actorUuids.push(actor.uuId)
				messageActorIndexMap.set(actor.uuId, i)
				// Make sure id field is not in the input
				delete actor.id
			}

			const actors = await actorDao.findByUuIds(actorUuids)
			for (const actor of actors) {
				const messageUserIndex = messageActorIndexMap.get(actor.uuId)
				message.actors[messageUserIndex] = actor
			}

			const missingActors = message.actors
				.filter(messageActor => !messageActor.id)

			if (missingActors.length) {
				await actorDao.insert(missingActors)
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

}

DI.set(SYNC_IN_ACTOR_CHECKER, SyncInActorChecker)
