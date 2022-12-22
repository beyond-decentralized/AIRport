import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	IUserAccount,
	IUserAccountDao,
	UserAccount_GUID
} from '@airport/travel-document-checkpoint/dist/app/bundle'

export interface ISyncInUserAccountChecker {

	ensureUserAccounts(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<boolean>;

}

@Injected()
export class SyncInUserAccountChecker
	implements ISyncInUserAccountChecker {

	@Inject()
	userAccountDao: IUserAccountDao

	async ensureUserAccounts(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<boolean> {
		try {
			let userAccountGUIDs: string[] = []
			let messageUserAccountIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.userAccounts.length; i++) {
				const userAccount = message.userAccounts[i]
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
