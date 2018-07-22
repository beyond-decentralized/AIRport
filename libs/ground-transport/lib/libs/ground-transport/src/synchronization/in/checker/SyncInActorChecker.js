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
const air_control_1 = require("@airport/air-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../../InjectionTokens");
let SyncInActorChecker = class SyncInActorChecker {
    constructor(actorDao, terminalDao, utils) {
        this.actorDao = actorDao;
        this.terminalDao = terminalDao;
        this.utils = utils;
    }
    async ensureActorsAndGetAsMaps(dataMessages, actorMap, actorMapById, userCheckResults, terminalCheckResults) {
        const actorRandomIdSet = new Set();
        const userUniqueIdsSet = new Set();
        const terminalNameSet = new Set();
        const terminalSecondIdSet = new Set();
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
            terminalNameSet.add(data.terminal.name);
            terminalSecondIdSet.add(data.terminal.secondId);
            ownerUniqueIdSet.add(data.terminal.owner.uniqueId);
            consistentMessages.push(message);
            for (const actor of data.actors) {
                actorRandomIdSet.add(actor.randomId);
                userUniqueIdsSet.add(actor.user.uniqueId);
            }
        }
        const terminalMapByGlobalIds = await this.terminalDao.findMapByGlobalIds(Array.from(ownerUniqueIdSet), Array.from(terminalNameSet), Array.from(terminalSecondIdSet));
        const terminalIdSet = new Set();
        for (const message of dataMessages) {
            const terminal = message.data.terminal;
            const terminalId = terminalMapByGlobalIds
                .get(terminal.owner.uniqueId)
                .get(terminal.name).get(terminal.secondId).id;
            terminalIdSet.add(terminalId);
        }
        // NOTE: remote actors should not contain terminal info, it should be populated here
        // this is because a given RTB is always generated in one and only one terminal
        await this.actorDao.findMapsWithDetailsByGlobalIds(Array.from(actorRandomIdSet), Array.from(userUniqueIdsSet), Array.from(terminalIdSet), actorMap, actorMapById);
        const newActors = this.getNewActors(consistentMessages, actorMap);
        await this.actorDao.bulkCreate(newActors, false, false);
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
                    .get(actor.terminal.name)
                    .get(actor.terminal.secondId)
                    .get(actor.terminal.owner.uniqueId);
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
                actor = {
                    id: undefined,
                    ...actor,
                };
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
                const actorsForTerminalName = actorsForUserUniqueId.get(actor.terminal.name);
                if (!actorsForTerminalName) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const actorsForTerminalSecondId = actorsForTerminalName.get(actor.terminal.secondId);
                if (!actorsForTerminalSecondId) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const existingActor = actorsForTerminalSecondId.get(actor.terminal.owner.uniqueId);
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
                for (const [terminalName, actorsForTerminalName] of actorsForUserUniqueId) {
                    for (const [terminalSecondId, actorsForTerminalSecondId] of actorsForTerminalName) {
                        for (const [terminalOwnerUniqueId, actor] of actorsForTerminalSecondId) {
                            newActors.push(actor);
                        }
                    }
                }
            }
        }
        return newActors;
    }
    addActorToMap(actor, actorMap) {
        this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(actorMap, actor.randomId), actor.user.uniqueId), actor.terminal.name), actor.terminal.secondId).set(actor.terminal.owner.uniqueId, actor);
    }
};
SyncInActorChecker = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncInActorCheckerToken),
    __param(0, typedi_1.Inject(holding_pattern_1.ActorDaoToken)),
    __param(1, typedi_1.Inject(holding_pattern_1.TerminalDaoToken)),
    __param(2, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object])
], SyncInActorChecker);
exports.SyncInActorChecker = SyncInActorChecker;
//# sourceMappingURL=SyncInActorChecker.js.map