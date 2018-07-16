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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
const Inject_1 = require("typedi/decorators/Inject");
const InjectionTokens_1 = require("../../../../../apps/terminal/src/InjectionTokens");
const holding_pattern_1 = require("@airport/holding-pattern");
const InjectionTokens_2 = require("@airport/air-control/lib/InjectionTokens");
const Utils_1 = require("@airport/air-control/lib/lingo/utils/Utils");
const Query_1 = require("@airport/air-control/lib/lingo/query/facade/Query");
let SyncInUserChecker = class SyncInUserChecker {
    constructor(userDao, utils) {
        this.userDao = userDao;
        this.utils = utils;
    }
    ensureUsersAndGetAsMaps(dataMessages) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const map = yield this.userDao.findFieldsMapByUniqueId(Array.from(remoteUserMapByUniqueId.keys()), {
                id: Query_1.Y,
                uniqueId: Query_1.Y
            });
            yield this.addMissingUsers(remoteUserMapByUniqueId, map, mapById);
            return {
                map,
                mapById,
                mapByMessageIndexAndRemoteUserId,
                consistentMessages,
                inconsistentMessages
            };
        });
    }
    areUserIdsConsistentInMessageData(data) {
        const userIdSet = new Set();
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
    gatherUserUniqueIds(data, remoteUserMapByUniqueId) {
        const mapForMessageByRemoteUserId = new Map();
        for (const remoteUser of data.users) {
            const user = Object.assign({}, remoteUser);
            remoteUserMapByUniqueId.set(user.uniqueId, user);
            mapForMessageByRemoteUserId.set(user.id, user);
        }
        return mapForMessageByRemoteUserId;
    }
    addMissingUsers(remoteUserMapByUniqueId, userMap, userMapById) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield this.userDao.bulkCreate(newUsers, false, false);
                for (const newUser of newUsers) {
                    userMapById.set(newUser.id, newUser);
                }
            }
        });
    }
};
SyncInUserChecker = __decorate([
    Inject_1.Inject(InjectionTokens_1.SyncInUserCheckerToken),
    __param(0, Inject_1.Inject(holding_pattern_1.UserDaoToken)),
    __param(1, Inject_1.Inject(InjectionTokens_2.UtilsToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof holding_pattern_1.IUserDao !== "undefined" && holding_pattern_1.IUserDao) === "function" ? _a : Object, typeof (_b = typeof Utils_1.IUtils !== "undefined" && Utils_1.IUtils) === "function" ? _b : Object])
], SyncInUserChecker);
exports.SyncInUserChecker = SyncInUserChecker;
//# sourceMappingURL=SyncInUserChecker.js.map