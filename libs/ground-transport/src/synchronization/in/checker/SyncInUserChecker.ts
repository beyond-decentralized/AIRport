import {Inject}                                              from "typedi/decorators/Inject";
import {SyncInUserCheckerToken}                              from "../../../../../apps/terminal/src/InjectionTokens";
import {IUser, IUserDao, UserDaoToken, UserId, UserUniqueId} from "@airport/holding-pattern";
import {UtilsToken}                                          from "@airport/air-control/lib/InjectionTokens";
import {IUtils}                                              from "@airport/air-control/lib/lingo/utils/Utils";
import {IDataToTM}                                           from "../SyncInUtils";
import {RepositoryTransactionBlockData}                      from "@airport/moving-walkway/lib/common";
import {Y}                                                   from "@airport/air-control/lib/lingo/query/facade/Query";

export interface UserCheckResults {
	map: Map<UserUniqueId, IUser>;
	mapById: Map<UserId, IUser>;
	mapByMessageIndexAndRemoteUserId: Map<UserId, IUser>[];
	consistentMessages: IDataToTM[];
	inconsistentMessages: IDataToTM[];
}

export interface ISyncInUserChecker {

	ensureUsersAndGetAsMaps(
		dataMessages: IDataToTM[]
	): Promise<UserCheckResults>;

}

@Inject(SyncInUserCheckerToken)
export class SyncInUserChecker
	implements ISyncInUserChecker {

	constructor(
		@Inject(UserDaoToken)
		private userDao: IUserDao,
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}

	async ensureUsersAndGetAsMaps(
		dataMessages: IDataToTM[]
	): Promise<UserCheckResults> {
		const remoteUserMapByUniqueId: Map<UserUniqueId, IUser> = new Map();
		const mapById: Map<UserId, IUser> = new Map();
		const mapByMessageIndexAndRemoteUserId: Map<UserId, IUser>[] = [];

		const consistentMessages: IDataToTM[] = [];
		const inconsistentMessages: IDataToTM[] = [];
		for (const message of dataMessages) {
			const data = message.data;
			if (!this.areUserIdsConsistentInMessageData(data)) {
				inconsistentMessages.push(message);
				continue;
			}

			const mapForMessageByRemoteUserId = this.gatherUserUniqueIds(
				data, remoteUserMapByUniqueId);
			consistentMessages.push(message);
			mapByMessageIndexAndRemoteUserId.push(mapForMessageByRemoteUserId);
		}

		const map = await this.userDao.findFieldsMapByUniqueId(
			Array.from(remoteUserMapByUniqueId.keys()), {
				id: Y,
				uniqueId: Y
			});

		await this.addMissingUsers(remoteUserMapByUniqueId, map, mapById);

		return {
			map,
			mapById,
			mapByMessageIndexAndRemoteUserId,
			consistentMessages,
			inconsistentMessages
		};
	}

	private areUserIdsConsistentInMessageData(
		data: RepositoryTransactionBlockData
	): boolean {
		const userIdSet: Set<UserId> = new Set();
		for (const user of data.users) {
			const userId = user.id;
			if (userIdSet.has(userId)) {
				return false;
			}
		}
		if (!userIdSet.has(data.database.owner.id)) {
			return false;
		}
		for (const actor of data.actors) {
			if (!userIdSet.has(actor.user.id)) {
				return false;
			}
		}

		return true;
	}

	private gatherUserUniqueIds(
		data: RepositoryTransactionBlockData,
		remoteUserMapByUniqueId: Map<UserUniqueId, IUser>
	): Map<UserId, IUser> {
		const mapForMessageByRemoteUserId: Map<UserId, IUser> = new Map();
		for (const remoteUser of data.users) {
			const user = {
				...remoteUser
			};
			remoteUserMapByUniqueId.set(user.uniqueId, user);
			mapForMessageByRemoteUserId.set(user.id, user);
		}
		return mapForMessageByRemoteUserId;
	}

	private async addMissingUsers(
		remoteUserMapByUniqueId: Map<UserUniqueId, IUser>,
		userMap: Map<UserUniqueId, IUser>,
		userMapById: Map<UserId, IUser>
	): Promise<void> {
		const newUsers: IUser[] = [];
		for (const [uniqueId, user] of remoteUserMapByUniqueId) {
			const existingUser = userMap.get(uniqueId);
			if (!existingUser) {
				delete user.id;
				newUsers.push(user);
				userMap.set(uniqueId, user);
			} else {
				user.id = existingUser.id;
				userMapById.set(existingUser.id, user);
			}
		}
		if (newUsers.length) {
			await this.userDao.bulkCreate(newUsers, false, false);
			for (const newUser of newUsers) {
				userMapById.set(newUser.id, newUser);
			}
		}
	}

}