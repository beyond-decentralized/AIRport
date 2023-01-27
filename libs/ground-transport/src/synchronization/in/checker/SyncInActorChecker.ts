import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IActorDao
} from '@airport/holding-pattern/dist/app/bundle'
import { IActor, RepositorySynchronizationData } from '@airport/ground-control'

export interface ISyncInActorChecker {

	ensureActors(
		data: RepositorySynchronizationData,
		context: IContext
	): Promise<boolean>

}

@Injected()
export class SyncInActorChecker
	implements ISyncInActorChecker {

	@Inject()
	actorDao: IActorDao

	async ensureActors(
		data: RepositorySynchronizationData,
		context: IContext
	): Promise<boolean> {
		try {
			let actorGUIDs: string[] = []
			let messageActorIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < data.actors.length; i++) {
				const actor = data.actors[i]
				if (typeof actor.GUID !== 'string' || actor.GUID.length !== 36) {
					throw new Error(`Invalid 'terminal.GUID'`)
				}
				this.checkActorApplication(actor, data)
				this.checkActorTerminal(actor, data)
				this.checkActorUserAccount(actor, data)
				actorGUIDs.push(actor.GUID)
				messageActorIndexMap.set(actor.GUID, i)
				// Make sure id field is not in the input
				delete actor._localId
			}

			const actors = await this.actorDao.findByGUIDs(actorGUIDs)
			for (const actor of actors) {
				const messageUserAccountIndex = messageActorIndexMap.get(actor.GUID)
				data.actors[messageUserAccountIndex] = actor
			}

			const missingActors = data.actors
				.filter(messageActor => !messageActor._localId)

			if (missingActors.length) {
				await this.actorDao.insert(missingActors, context)
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private checkActorApplication(
		actor: IActor,
		data: RepositorySynchronizationData
	): void {
		if (typeof actor.application !== 'number') {
			throw new Error(`Expecting "in-message index" (number)
			in 'actor.terminal'`)
		}
		const application = data.applications[actor.application as any]
		if (!application) {
			throw new Error(
				`Did not find actor.application with "in-message index" ${actor.application}`);
		}
		actor.application = application
	}

	private checkActorTerminal(
		actor: IActor,
		data: RepositorySynchronizationData
	): void {
		if (typeof actor.terminal !== 'number') {
			throw new Error(`Expecting "in-message index" (number)
			in 'actor.terminal'`)
		}
		const terminal = data.terminals[actor.terminal as any]
		if (!terminal) {
			throw new Error(
				`Did not find actor.terminal with "in-message index" ${actor.terminal}`);
		}
		actor.terminal = terminal
	}

	private checkActorUserAccount(
		actor: IActor,
		data: RepositorySynchronizationData
	): void {
		if (typeof actor.userAccount !== 'number') {
			throw new Error(`Expecting "in-message index" (number)
			in 'actor.userAccount'`)
		}
		const userAccount = data.userAccounts[actor.userAccount as any]
		if (!userAccount) {
			throw new Error(
				`Did not find actor.userAccount with "in-message index" ${actor.userAccount}`);
		}
		actor.userAccount = userAccount
	}

}
