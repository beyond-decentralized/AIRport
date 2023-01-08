import {
	RepositorySynchronizationMessage,
} from '@airport/arrivals-n-departures'
import { ISyncInApplicationVersionChecker } from './SyncInApplicationVersionChecker';
import { ISyncInActorChecker } from './SyncInActorChecker';
import { ISyncInApplicationChecker } from './SyncInApplicationChecker';
import { IDataCheckResult, ISyncInDataChecker } from './SyncInDataChecker';
import { ISyncInRepositoryChecker } from './SyncInRepositoryChecker';
import { ISyncInTerminalChecker } from './SyncInTerminalChecker';
import { ISyncInUserAccountChecker } from './SyncInUserAccountChecker';
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'

export interface ISyncInChecker {

	checkMessage(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<IDataCheckResult>;

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
	syncInUserAccountChecker: ISyncInUserAccountChecker

	/**
	 * Check the message and load all required auxiliary entities.
	 */
	async checkMessage(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<IDataCheckResult> {
		// FIXME: replace as many DB lookups as possible with Terminal State lookups

		if (! await this.syncInUserAccountChecker.ensureUserAccounts(message, context)) {
			return {
				isValid: false
			}
		}
		if (! await this.syncInTerminalChecker.ensureTerminals(message, context)) {
			return {
				isValid: false
			}
		}
		if (! await this.syncInApplicationChecker.ensureApplications(message, context)) {
			return {
				isValid: false
			}
		}
		if (! await this.syncInActorChecker.ensureActors(message, context)) {
			return {
				isValid: false
			}
		}
		if (! await this.syncInRepositoryChecker.ensureRepositories(message, context)) {
			return {
				isValid: false
			}
		}
		if (!await this.syncInApplicationVersionChecker.ensureApplicationVersions(
			message.applicationVersions, message.applications, context)) {
			return {
				isValid: false
			}
		}

		return await this.syncInDataChecker.checkData(message, context)
	}

}
