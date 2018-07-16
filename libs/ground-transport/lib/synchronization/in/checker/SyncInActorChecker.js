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
var _a, _b, _c;
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../../../../apps/terminal/src/InjectionTokens");
const holding_pattern_1 = require("@airport/holding-pattern");
const air_control_1 = require("@airport/air-control");
let SyncInActorChecker = class SyncInActorChecker {
    constructor(actorDao, databaseDao, utils) {
        this.actorDao = actorDao;
        this.databaseDao = databaseDao;
        this.utils = utils;
    }
    ensureActorsAndGetAsMaps(dataMessages, actorMap, actorMapById, userCheckResults, databaseCheckResults) {
        return __awaiter(this, void 0, void 0, function* () {
            const actorRandomIdSet = new Set();
            const userUniqueIdsSet = new Set();
            const databaseNameSet = new Set();
            const databaseSecondIdSet = new Set();
            const ownerUniqueIdSet = new Set();
            const consistentMessages = [];
            const inconsistentMessages = [];
            // split messages by repository and record actor information
            for (const message of dataMessages) {
                if (!this.areActorIdsConsistentInMessage(message)) {
                    inconsistentMessages.push(message);
                    continue;
                }
                const data = message.data;
                databaseNameSet.add(data.database.name);
                databaseSecondIdSet.add(data.database.secondId);
                ownerUniqueIdSet.add(data.database.owner.uniqueId);
                consistentMessages.push(message);
                for (const actor of data.actors) {
                    actorRandomIdSet.add(actor.randomId);
                    userUniqueIdsSet.add(actor.user.uniqueId);
                }
            }
            const databaseMapByGlobalIds = yield this.databaseDao.findMapByGlobalIds(Array.from(ownerUniqueIdSet), Array.from(databaseNameSet), Array.from(databaseSecondIdSet));
            const databaseIdSet = new Set();
            for (const message of dataMessages) {
                const database = message.data.database;
                const databaseId = databaseMapByGlobalIds
                    .get(database.owner.uniqueId)
                    .get(database.name).get(database.secondId).id;
                databaseIdSet.add(databaseId);
            }
            // NOTE: remote actors should not contain database info, it should be populated here
            // this is because a given RTB is always generated in one and only one database
            yield this.actorDao.findMapsWithDetailsByGlobalIds(Array.from(actorRandomIdSet), Array.from(userUniqueIdsSet), Array.from(databaseIdSet), actorMap, actorMapById);
            const newActors = this.getNewActors(consistentMessages, actorMap);
            yield this.actorDao.bulkCreate(newActors, false, false);
            for (const newActor of newActors) {
                actorMapById.set(newActor.id, newActor);
            }
            this.updateActorIdsInMessages(actorMap, consistentMessages);
            return {
                actorMap,
                actorMapById,
                consistentMessages,
                inconsistentMessages
            };
        });
    }
    areActorIdsConsistentInMessage(message) {
        const actorIdSet = new Set();
        const usedActorIdSet = new Set();
        for (const actor of message.data.actors) {
            actorIdSet.add(actor.id);
        }
        const data = message.data;
        for (const repoTransHistory of data.repoTransHistories) {
            const transactionRemoteActorId = repoTransHistory.actor.id;
            if (!actorIdSet.has(transactionRemoteActorId)) {
                return false;
            }
            usedActorIdSet.add(transactionRemoteActorId);
            for (const operationHistory of repoTransHistory.operationHistory) {
                for (const recordHistory of operationHistory.recordHistory) {
                    const recordRemoteActorId = recordHistory.actor.id;
                    if (!actorIdSet.has(recordRemoteActorId)) {
                        return false;
                    }
                    usedActorIdSet.add(recordRemoteActorId);
                }
            }
        }
        return actorIdSet.size === usedActorIdSet.size;
    }
    updateActorIdsInMessages(actorMap, dataMessages) {
        for (const message of dataMessages) {
            const messageActorMapByRemoteId = new Map();
            const updatedActors = [];
            for (const actor of message.data.actors) {
                const localActor = actorMap
                    .get(actor.randomId)
                    .get(actor.user.uniqueId)
                    .get(actor.database.name)
                    .get(actor.database.secondId)
                    .get(actor.database.owner.uniqueId);
                updatedActors.push(localActor);
                messageActorMapByRemoteId.set(actor.id, localActor);
            }
            const data = message.data;
            data.actors = updatedActors;
            for (const repoTransHistory of data.repoTransHistories) {
                const transactionRemoteActorId = repoTransHistory.actor.id;
                const transactionLocalActor = messageActorMapByRemoteId.get(transactionRemoteActorId);
                repoTransHistory.actor.id = transactionLocalActor.id;
                for (const operationHistory of repoTransHistory.operationHistory) {
                    for (const recordHistory of operationHistory.recordHistory) {
                        const recordRemoteActorId = recordHistory.actor.id;
                        const recordLocalActor = messageActorMapByRemoteId.get(recordRemoteActorId);
                        recordHistory.actor.id = recordLocalActor.id;
                    }
                }
            }
        }
    }
    getNewActors(dataMessages, actorMap) {
        const newActorMap = new Map();
        // split messages by repository
        for (const message of dataMessages) {
            for (let actor of message.data.actors) {
                actor = Object.assign({ id: undefined }, actor);
                const actorsForRandomId = actorMap.get(actor.randomId);
                if (!actorsForRandomId) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const actorsForUserUniqueId = actorsForRandomId.get(actor.user.uniqueId);
                if (!actorsForUserUniqueId) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const actorsForDatabaseName = actorsForUserUniqueId.get(actor.database.name);
                if (!actorsForDatabaseName) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const actorsForDatabaseSecondId = actorsForDatabaseName.get(actor.database.secondId);
                if (!actorsForDatabaseSecondId) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const existingActor = actorsForDatabaseSecondId.get(actor.database.owner.uniqueId);
                if (!existingActor) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
            }
        }
        const newActors = [];
        for (const [actorRandomId, actorsForRandomId] of newActorMap) {
            for (const [userUniqueId, actorsForUserUniqueId] of actorsForRandomId) {
                for (const [databaseName, actorsForDatabaseName] of actorsForUserUniqueId) {
                    for (const [databaseSecondId, actorsForDatabaseSecondId] of actorsForDatabaseName) {
                        for (const [databaseOwnerUniqueId, actor] of actorsForDatabaseSecondId) {
                            newActors.push(actor);
                        }
                    }
                }
            }
        }
        return newActors;
    }
    addActorToMap(actor, actorMap) {
        this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(actorMap, actor.randomId), actor.user.uniqueId), actor.database.name), actor.database.secondId).set(actor.database.owner.uniqueId, actor);
    }
};
SyncInActorChecker = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncInActorCheckerToken),
    __param(0, typedi_1.Inject(holding_pattern_1.ActorDaoToken)),
    __param(1, typedi_1.Inject(holding_pattern_1.DatabaseDaoToken)),
    __param(2, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof holding_pattern_1.IActorDao !== "undefined" && holding_pattern_1.IActorDao) === "function" ? _a : Object, typeof (_b = typeof holding_pattern_1.IDatabaseDao !== "undefined" && holding_pattern_1.IDatabaseDao) === "function" ? _b : Object, typeof (_c = typeof air_control_1.IUtils !== "undefined" && air_control_1.IUtils) === "function" ? _c : Object])
], SyncInActorChecker);
exports.SyncInActorChecker = SyncInActorChecker;
//# sourceMappingURL=SyncInActorChecker.js.map