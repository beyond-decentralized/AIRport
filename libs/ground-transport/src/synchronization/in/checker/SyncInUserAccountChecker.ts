import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IUserAccountDao
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import { UserAccount_PublicSigningKey } from '@airport/aviation-communication';
import { IUserAccount, SyncRepositoryData } from '@airport/ground-control';

export interface ISyncInUserAccountChecker {

	ensureUserAccounts(
		datas: SyncRepositoryData,
		context: IContext
	): Promise<boolean>;

}

@Injected()
export class SyncInUserAccountChecker
	implements ISyncInUserAccountChecker {

	@Inject()
	userAccountDao: IUserAccountDao

	async ensureUserAccounts(
		data: SyncRepositoryData,
		context: IContext
	): Promise<boolean> {
		try {
			// let userAccountPublicSigningKeys: UserAccount_PublicSigningKey[] = []
			const userAccountPublicSigningKeySet: Set<UserAccount_PublicSigningKey> = new Set()
			let messageUserAccountIndexMap: Map<UserAccount_PublicSigningKey, number> = new Map()
			for (let i = 0; i < data.userAccounts.length; i++) {
				const userAccount = data.userAccounts[i]
				if (typeof userAccount._localId !== 'undefined') {
					throw new Error(`'userAccount._localId' cannot be specified`)
				}
				const accountPublicSigningKey = userAccount.accountPublicSigningKey
				// FIXME: put in the proper UserAccount_PublicSigningKey (521) length
				if (typeof accountPublicSigningKey !== 'string' || accountPublicSigningKey.length !== 272) {
					throw new Error(`Invalid 'userAccount.accountPublicSigningKey'`)
				}
				if (userAccountPublicSigningKeySet.has(accountPublicSigningKey)) {
					throw new Error(`UserAccount with accountPublicSigningKey:
'${accountPublicSigningKey}'
appears more than once in message.data.userAccounts
`)
				}
				if (typeof userAccount.username !== 'string' || userAccount.username.length < 3) {
					throw new Error(`Invalid 'userAccount.username'`)
				}
				userAccountPublicSigningKeySet.add(userAccount.accountPublicSigningKey)
				messageUserAccountIndexMap.set(userAccount.accountPublicSigningKey, i)
			}

			const userAccounts = await this.userAccountDao
				.findByAccountPublicSingingKeys(
					Array.from(userAccountPublicSigningKeySet), context)
			const foundUserAccountsByPublicSigningKey: Map<UserAccount_PublicSigningKey, IUserAccount>
				= new Map()
			for (const userAccount of userAccounts) {
				foundUserAccountsByPublicSigningKey.set(
					userAccount.accountPublicSigningKey, userAccount)
				const messageUserAccountIndex = messageUserAccountIndexMap.get(
					userAccount.accountPublicSigningKey)
				data.userAccounts[messageUserAccountIndex] = userAccount
			}

			const missingUserAccounts = data.userAccounts
				.filter(messageUserAccount => !foundUserAccountsByPublicSigningKey
					.has(messageUserAccount.accountPublicSigningKey))

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
			delete userAccount._localId
		}
		await this.userAccountDao.insert(missingUserAccounts, context)
	}

}
