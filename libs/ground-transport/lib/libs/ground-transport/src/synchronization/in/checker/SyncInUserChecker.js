"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const Inject_1 = require("typedi/decorators/Inject");
const InjectionTokens_1 = require("../../../../../apps/terminal/src/InjectionTokens");
const holding_pattern_1 = require("@airport/holding-pattern");
const InjectionTokens_2 = require("@airport/air-control/lib/InjectionTokens");
const Query_1 = require("@airport/air-control/lib/lingo/query/facade/Query");
let SyncInUserChecker = class SyncInUserChecker {
    constructor(userDao, utils) {
        this.userDao = userDao;
        this.utils = utils;
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
            id: Query_1.Y,
            uniqueId: Query_1.Y
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
};
SyncInUserChecker = __decorate([
    Inject_1.Inject(InjectionTokens_1.SyncInUserCheckerToken),
    __param(0, Inject_1.Inject(holding_pattern_1.UserDaoToken)),
    __param(1, Inject_1.Inject(InjectionTokens_2.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], SyncInUserChecker);
exports.SyncInUserChecker = SyncInUserChecker;
//# sourceMappingURL=SyncInUserChecker.js.map