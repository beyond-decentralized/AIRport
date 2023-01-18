import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { RepositorySynchronizationData } from '@airport/arrivals-n-departures'
import {
	IUserAccountDao
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import { UserAccount_GUID } from '@airport/aviation-communication';
import { IUserAccount } from '@airport/ground-control';

export interface ISyncInUserAccountChecker {

	ensureUserAccounts(
		message: RepositorySynchronizationData,
		context: IContext
	): Promise<boolean>;

}

@Injected()
export class SyncInUserAccountChecker
	implements ISyncInUserAccountChecker {

	@Inject()
	userAccountDao: IUserAccountDao

	async ensureUserAccounts(
		message: RepositorySynchronizationData,
		context: IContext
	): Promise<boolean> {
		try {
			let userAccountGUIDs: string[] = []
			let messageUserAccountIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.userAccounts.length; i++) {
				const userAccount = message.userAccounts[i]
				if (typeof userAccount._localId !== 'undefined') {
					throw new Error(`'userAccount._localId' cannot be specified`)
				}
				if (typeof userAccount.GUID !== 'string' || userAccount.GUID.length !== 36) {
					throw new Error(`Invalid 'userAccount.GUID'`)
				}
				if (typeof userAccount.username !== 'string' || userAccount.username.length < 3) {
					throw new Error(`Invalid 'userAccount.username'`)
				}
				userAccountGUIDs.push(userAccount.GUID)
				messageUserAccountIndexMap.set(userAccount.GUID, i)
			}

			const userAccounts = await this.userAccountDao.findByGUIDs(userAccountGUIDs)
			const foundUserAccountsByGUID: Map<UserAccount_GUID, IUserAccount> = new Map()
			for (const userAccount of userAccounts) {
				foundUserAccountsByGUID.set(userAccount.GUID, userAccount)
				const messageUserAccountIndex = messageUserAccountIndexMap.get(userAccount.GUID)
				message.userAccounts[messageUserAccountIndex] = userAccount
			}

			const missingUserAccounts = message.userAccounts
				.filter(messageUserAccount => !foundUserAccountsByGUID.has(messageUserAccount.GUID))

			if (missingUserAccounts.length) {
				await this.addMissingUserAccounts(missingUserAccounts, context)
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async addMissingUserAccounts(
		missingUserAccounts: IUserAccount[],
		context: IContext
	): Promise<void> {
		for (const userAccount of missingUserAccounts) {
			if (!userAccount.username || typeof userAccount.username !== 'string') {
				throw new Error(`Invalid UserAccount.username ${userAccount.username}`)
			}
		}
		await this.userAccountDao.insert(missingUserAccounts, context)
	}

}
