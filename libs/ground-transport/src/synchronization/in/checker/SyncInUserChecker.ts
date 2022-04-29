import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	IUser,
	IUserDao
} from '@airport/travel-document-checkpoint-internal'

export interface ISyncInUserChecker {

	ensureUsers(
		message: RepositorySynchronizationMessage
	): Promise<boolean>;

}

export class SyncInUserChecker
	implements ISyncInUserChecker {

	userDao: IUserDao

	async ensureUsers(
		message: RepositorySynchronizationMessage
	): Promise<boolean> {
		try {
			let userUuids: string[] = []
			let messageUserIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.users.length; i++) {
				const user = message.users[i]
				if (typeof user.uuId !== 'string' || user.uuId.length !== 36) {
					throw new Error(`Invalid 'user.uuid'`)
				}
				if (typeof user.username !== 'string' || user.username.length < 3) {
					throw new Error(`Invalid 'user.username'`)
				}
				userUuids.push(user.uuId)
				messageUserIndexMap.set(user.uuId, i)
				// Make sure id field is not in the input
				delete user.id
			}

			const users = await this.userDao.findByUuIds(userUuids)
			for (const user of users) {
				const messageUserIndex = messageUserIndexMap.get(user.uuId)
				message.users[messageUserIndex] = user
			}

			const missingUsers = message.users.filter(messageUser => !messageUser.id)

			if (missingUsers.length) {
				await this.addMissingUsers(missingUsers)
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async addMissingUsers(
		missingUsers: IUser[]
	): Promise<void> {
		for (const user of missingUsers) {
			if (!user.username || typeof user.username !== 'string') {
				throw new Error(`Invalid User.username ${user.username}`)
			}
		}
		await this.userDao.insert(missingUsers)
	}

}
