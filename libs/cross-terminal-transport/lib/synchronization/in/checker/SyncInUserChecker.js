import { Y } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { USER_DAO } from '@airport/travel-document-checkpoint';
import { SYNC_IN_USER_CHECKER } from '../../../tokens';
export class SyncInUserChecker {
    async ensureUsersAndGetAsMaps(dataMessages) {
        const userDao = await container(this).get(USER_DAO);
        const remoteUserMapByUniqueId = new Map();
        const mapById = new Map();
        const mapByMessageIndexAndRemoteUserId = [];
        const consistentMessages = [];
        const inconsistentMessages = [];
        for (const message of dataMessages) {
            const data = message.data;
            if (!this.areUserIdsConsistentInMessageData(data)) {
                inconsistentMessages.push(message);
                continue;
            }
            const mapForMessageByRemoteUserId = this.gatherUserUniqueIds(data, remoteUserMapByUniqueId);
            consistentMessages.push(message);
            mapByMessageIndexAndRemoteUserId.push(mapForMessageByRemoteUserId);
        }
        const map = userDao.findFieldsMapByUniqueId(Array.from(remoteUserMapByUniqueId.keys()), {
            id: Y,
            uniqueId: Y
        });
        await this.addMissingUsers(remoteUserMapByUniqueId, map, mapById, userDao);
        return {
            map,
            mapById,
            mapByMessageIndexAndRemoteUserId,
            consistentMessages,
            inconsistentMessages
        };
    }
    areUserIdsConsistentInMessageData(data) {
        const userIdSet = new Set();
        for (const user of data.users) {
            const userId = user.id;
            if (userIdSet.has(userId)) {
                return false;
            }
        }
        if (!userIdSet.has(data.terminal.owner.id)) {
            return false;
        }
        for (const actor of data.actors) {
            if (!userIdSet.has(actor.user.id)) {
                return false;
            }
        }
        return true;
    }
    gatherUserUniqueIds(data, remoteUserMapByUniqueId) {
        const mapForMessageByRemoteUserId = new Map();
        for (const remoteUser of data.users) {
            const user = {
                ...remoteUser
            };
            remoteUserMapByUniqueId.set(user.privateId, user);
            mapForMessageByRemoteUserId.set(user.id, user);
        }
        return mapForMessageByRemoteUserId;
    }
    async addMissingUsers(remoteUserMapByUniqueId, userMap, userMapById, userDao) {
        const newUsers = [];
        for (const [uniqueId, user] of remoteUserMapByUniqueId) {
            const existingUser = userMap.get(uniqueId);
            if (!existingUser) {
                delete user.id;
                newUsers.push(user);
                userMap.set(uniqueId, user);
            }
            else {
                user.id = existingUser.id;
                userMapById.set(existingUser.id, user);
            }
        }
        if (newUsers.length) {
            await userDao.bulkCreate(newUsers, false);
            for (const newUser of newUsers) {
                userMapById.set(newUser.id, newUser);
            }
        }
    }
}
DI.set(SYNC_IN_USER_CHECKER, SyncInUserChecker);
//# sourceMappingURL=SyncInUserChecker.js.map