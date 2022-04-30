import {
	RepositorySynchronizationMessage,
} from '@airport/arrivals-n-departures'
import { ISyncInApplicationVersionChecker } from './SyncInApplicationVersionChecker';
import { ISyncInActorChecker } from './SyncInActorChecker';
import { ISyncInApplicationChecker } from './SyncInApplicationChecker';
import { ISyncInDataChecker } from './SyncInDataChecker';
import { ISyncInRepositoryChecker } from './SyncInRepositoryChecker';
import { ISyncInTerminalChecker } from './SyncInTerminalChecker';
import { ISyncInUserChecker } from './SyncInUserChecker';
import { Inject, Injected } from '@airport/air-control';

export interface ISyncInChecker {

	checkMessage(
		message: RepositorySynchronizationMessage
	): Promise<boolean>;

}

@Injected()
export class SyncInChecker
	implements ISyncInChecker {

	@Inject()
	syncInActorChecker: ISyncInActorChecker

	@Inject()
	syncInApplicationChecker: ISyncInApplicationChecker

	@Inject()
	syncInApplicationVersionChecker: ISyncInApplicationVersionChecker

	@Inject()
	syncInDataChecker: ISyncInDataChecker

	@Inject()
	syncInRepositoryChecker: ISyncInRepositoryChecker

	@Inject()
	syncInTerminalChecker: ISyncInTerminalChecker

	@Inject()
	syncInUserChecker: ISyncInUserChecker

	/**
	 * Check the message and load all required auxiliary entities.
	 */
	async checkMessage(
		message: RepositorySynchronizationMessage
	): Promise<boolean> {
		// FIXME: replace as many DB lookups as possible with Terminal State lookups

		if (! await this.syncInUserChecker.ensureUsers(message)) {
			return false
		}
		if (! await this.syncInTerminalChecker.ensureTerminals(message)) {
			return false
		}
		if (! await this.syncInApplicationChecker.ensureApplications(message)) {
			return false
		}
		if (! await this.syncInActorChecker.ensureActors(message)) {
			return false
		}
		if (! await this.syncInRepositoryChecker.ensureRepositories(message)) {
			return false
		}
		if (!await this.syncInApplicationVersionChecker.ensureApplicationVersions(message)) {
			return false
		}
		if (!await this.syncInDataChecker.checkData(message)) {
			return false
		}

		return true
	}

}
