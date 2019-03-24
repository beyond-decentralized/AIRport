"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const travel_document_checkpoint_1 = require("@airport/travel-document-checkpoint");
const diTokens_1 = require("../../../diTokens");
class SyncInUserChecker {
    constructor() {
        di_1.DI.get((userDao, utils) => {
            this.userDao = userDao;
            this.utils = utils;
        }, travel_document_checkpoint_1.USER_DAO, air_control_1.UTILS);
    }
    async ensureUsersAndGetAsMaps(dataMessages) {
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
        const map = await this.userDao.findFieldsMapByUniqueId(Array.from(remoteUserMapByUniqueId.keys()), {
            id: air_control_1.Y,
            uniqueId: air_control_1.Y
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
            remoteUserMapByUniqueId.set(user.uniqueId, user);
            mapForMessageByRemoteUserId.set(user.id, user);
        }
        return mapForMessageByRemoteUserId;
    }
    async addMissingUsers(remoteUserMapByUniqueId, userMap, userMapById) {
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
            await this.userDao.bulkCreate(newUsers, false, false);
            for (const newUser of newUsers) {
                userMapById.set(newUser.id, newUser);
            }
        }
    }
}
exports.SyncInUserChecker = SyncInUserChecker;
di_1.DI.set(diTokens_1.SYNC_IN_USER_CHECKER, SyncInUserChecker);
//# sourceMappingURL=SyncInUserChecker.js.map