"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const travel_document_checkpoint_1 = require("@airport/travel-document-checkpoint");
const diTokens_1 = require("../../../diTokens");
class SyncInTerminalChecker {
    constructor() {
        di_1.DI.get(() => {
        }, travel_document_checkpoint_1.TERMINAL_DAO, air_control_1.UTILS);
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
}
exports.SyncInTerminalChecker = SyncInTerminalChecker;
di_1.DI.set(diTokens_1.SYNC_IN_TERMINAL_CHECKER, SyncInTerminalChecker);
//# sourceMappingURL=SyncInTerminalChecker.js.map