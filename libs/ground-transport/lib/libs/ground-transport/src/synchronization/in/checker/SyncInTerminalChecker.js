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
var _a;
const typedi_1 = require("typedi");
const holding_pattern_1 = require("@airport/holding-pattern");
const air_control_1 = require("@airport/air-control");
const InjectionTokens_1 = require("../../../InjectionTokens");
let SyncInTerminalChecker = class SyncInTerminalChecker {
    constructor(terminalDao, utils) {
        this.terminalDao = terminalDao;
        this.utils = utils;
    }
    async ensureTerminalsAndGetAsMaps(dataMessages, localTerminal, userCheckResults) {
        const remoteTerminalMapByUniqueIds = new Map();
        const terminalNameSet = new Set();
        const terminalSecondIdSet = new Set();
        const ownerIdSet = new Set();
        const mapByMessageIndex = [];
        const consistentMessages = [];
        const inconsistentMessages = [];
        // record terminal information
        dataMessages.forEach((message, index) => {
            this.recordTerminalCredentials(message, index, userCheckResults, localTerminal, consistentMessages, inconsistentMessages, terminalNameSet, terminalSecondIdSet, ownerIdSet, remoteTerminalMapByUniqueIds, mapByMessageIndex);
        });
        const terminalMapByIds = await this.terminalDao.findMapByIds(Array.from(ownerIdSet), Array.from(terminalNameSet), Array.from(terminalSecondIdSet));
        await this.addMissingTerminals(remoteTerminalMapByUniqueIds, terminalMapByIds, userCheckResults);
        return {
            mapByMessageIndex,
            consistentMessages,
            inconsistentMessages
        };
    }
    recordTerminalCredentials(message, index, userCheckResults, localTerminal, consistentMessages, inconsistentMessages, terminalNameSet, terminalSecondIdSet, ownerIdSet, remoteTerminalMapByUniqueIds, mapByMessageIndex) {
        let terminal = message.data.terminal;
        const userMapForMessageByRemoteUserId = userCheckResults.mapByMessageIndexAndRemoteUserId[index];
        const owner = userMapForMessageByRemoteUserId.get(terminal.owner.id);
        if (!this.areTerminalIdsConsistentInMessageData(terminal, localTerminal, owner)) {
            inconsistentMessages.push(message);
            userCheckResults.mapByMessageIndexAndRemoteUserId.splice(index);
            return;
        }
        terminal = {
            ...terminal,
            owner
        };
        terminalNameSet.add(terminal.name);
        terminalSecondIdSet.add(terminal.secondId);
        ownerIdSet.add(owner.id);
        this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(remoteTerminalMapByUniqueIds, owner.uniqueId), terminal.name)
            .set(terminal.secondId, terminal);
        mapByMessageIndex.push(terminal);
        consistentMessages.push(message);
    }
    areTerminalIdsConsistentInMessageData(terminal, localTerminal, ownerUser) {
        if (localTerminal.owner.uniqueId === ownerUser.uniqueId
            && localTerminal.name === terminal.name
            && localTerminal.secondId === terminal.secondId) {
            // Terminal should never receive messages from itself
            return false;
        }
        return true;
    }
    async addMissingTerminals(remoteTerminalMapByUniqueIds, terminalMapByIds, userCheckResults) {
        const userMap = userCheckResults.map;
        const newTerminals = [];
        for (const [userUniqueId, remoteTerminalMapByDbUniqueIds] of remoteTerminalMapByUniqueIds) {
            const owner = userMap.get(userUniqueId);
            const terminalMapByDbUniqueIds = terminalMapByIds.get(owner.id);
            for (const [name, remoteTerminalMapBySecondId] of remoteTerminalMapByDbUniqueIds) {
                let terminalMapBySecondId;
                if (terminalMapByDbUniqueIds) {
                    terminalMapBySecondId = terminalMapByDbUniqueIds.get(name);
                }
                for (const [secondId, remoteTerminal] of remoteTerminalMapBySecondId) {
                    let terminal;
                    if (terminalMapBySecondId) {
                        terminal = terminalMapBySecondId.get(secondId);
                    }
                    if (!terminal) {
                        delete remoteTerminal.id;
                        remoteTerminal.isLocal = false;
                        newTerminals.push(remoteTerminal);
                    }
                    else {
                        remoteTerminal.id = terminal.id;
                    }
                }
            }
        }
        if (newTerminals.length) {
            await this.terminalDao.bulkCreate(newTerminals, false, false);
        }
    }
};
SyncInTerminalChecker = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncInTerminalCheckerToken),
    __param(0, typedi_1.Inject(holding_pattern_1.TerminalDaoToken)),
    __param(1, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof holding_pattern_1.ITerminalDao !== "undefined" && holding_pattern_1.ITerminalDao) === "function" ? _a : Object, Object])
], SyncInTerminalChecker);
exports.SyncInTerminalChecker = SyncInTerminalChecker;
//# sourceMappingURL=SyncInTerminalChecker.js.map