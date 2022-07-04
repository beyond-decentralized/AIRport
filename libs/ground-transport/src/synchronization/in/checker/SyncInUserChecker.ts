import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	IUser,
	IUserDao
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index'

export interface ISyncInUserChecker {

	ensureUsers(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<boolean>;

}

@Injected()
export class SyncInUserChecker
	implements ISyncInUserChecker {

	@Inject()
	userDao: IUserDao

	async ensureUsers(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<boolean> {
		try {
			let userGUIDs: string[] = []
			let messageUserIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.users.length; i++) {
				const user = message.users[i]
				if (typeof user.GUID !== 'string' || user.GUID.length !== 36) {
					throw new Error(`Invalid 'user.GUID'`)
				}
				if (typeof user.username !== 'string' || user.username.length < 3) {
					throw new Error(`Invalid 'user.username'`)
				}
				userGUIDs.push(user.GUID)
				messageUserIndexMap.set(user.GUID, i)
				// Make sure id field is not in the input
				delete user._localId
			}

			const users = await this.userDao.findByGUIDs(userGUIDs)
			for (const user of users) {
				const messageUserIndex = messageUserIndexMap.get(user.GUID)
				message.users[messageUserIndex] = user
			}

			const missingUsers = message.users.filter(messageUser => !messageUser._localId)

			if (missingUsers.length) {
				await this.addMissingUsers(missingUsers, context)
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async addMissingUsers(
		missingUsers: IUser[],
		context: IContext
	): Promise<void> {
		for (const user of missingUsers) {
			if (!user.username || typeof user.username !== 'string') {
				throw new Error(`Invalid User.username ${user.username}`)
			}
		}
		await this.userDao.insert(missingUsers, context)
	}

}
