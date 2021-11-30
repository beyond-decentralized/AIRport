import {
	TerminalMessage,
} from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import {
	SYNC_IN_ACTOR_CHECKER,
	SYNC_IN_CHECKER,
	SYNC_IN_DATA_CHECKER,
	SYNC_IN_REPOSITORY_CHECKER,
	SYNC_IN_SCHEMA_CHECKER,
	SYNC_IN_SCHEMA_VERSION_CHECKER,
	SYNC_IN_TERMINAL_CHECKER,
	SYNC_IN_USER_CHECKER
} from '../../../tokens'

export interface ISyncInChecker {

	checkMessage(
		message: TerminalMessage
	): Promise<boolean>;

}

export class SyncInChecker
	implements ISyncInChecker {

	/**
	 * Check the message and load all required auxiliary entities.
	 */
	async checkMessage(
		message: TerminalMessage
	): Promise<boolean> {
		// FIXME: replace as many DB lookups as possible with Terminal State lookups

		const [syncInActorChecker, syncInDataChecker, syncInRepositoryChecker,
			syncInSchemaChecker, syncInSchemaVersionChecker, syncInTerminalChecker,
			syncInUserChecker] = await container(this).get(
				SYNC_IN_ACTOR_CHECKER, SYNC_IN_DATA_CHECKER, SYNC_IN_REPOSITORY_CHECKER,
				SYNC_IN_SCHEMA_CHECKER, SYNC_IN_SCHEMA_VERSION_CHECKER, SYNC_IN_TERMINAL_CHECKER,
				SYNC_IN_USER_CHECKER)

		if (! await syncInUserChecker.ensureUsers(message)) {
			return false
		}
		if (! await syncInTerminalChecker.ensureTerminals(message)) {
			return false
		}
		if (! await syncInSchemaChecker.ensureSchemas(message)) {
			return false
		}
		if (! await syncInActorChecker.ensureActors(message)) {
			return false
		}
		if (! await syncInRepositoryChecker.ensureRepositories(message)) {
			return false
		}
		if (!await syncInSchemaVersionChecker.ensureSchemaVersions(message)) {
			return false
		}
		if (!await syncInDataChecker.checkData(message)) {
			return false
		}

		return true
	}

}

DI.set(SYNC_IN_CHECKER, SyncInChecker)
