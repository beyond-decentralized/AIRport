import { container, DI } from '@airport/di';
import { CascadeOverwrite, ensureChildJsMap } from '@airport/ground-control';
import { TERMINAL_DAO } from '@airport/travel-document-checkpoint';
import { SYNC_IN_TERMINAL_CHECKER } from '../../../tokens';
export class SyncInTerminalChecker {
    async ensureTerminalsAndGetAsMaps(dataMessages, localTerminal, userCheckResults) {
        const terminalDao = await container(this).get(TERMINAL_DAO);
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
        const terminalMapByIds = await terminalDao.findMapByIds(Array.from(ownerIdSet), Array.from(terminalNameSet), Array.from(terminalSecondIdSet));
        await this.addMissingTerminals(remoteTerminalMapByUniqueIds, terminalMapByIds, userCheckResults, terminalDao);
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
        ensureChildJsMap(ensureChildJsMap(remoteTerminalMapByUniqueIds, owner.uniqueId), terminal.name)
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
    async addMissingTerminals(remoteTerminalMapByUniqueIds, terminalMapByIds, userCheckResults, terminalDao) {
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
            await terminalDao.bulkCreate(newTerminals, CascadeOverwrite.DEFAULT, false);
        }
    }
}
DI.set(SYNC_IN_TERMINAL_CHECKER, SyncInTerminalChecker);
//# sourceMappingURL=SyncInTerminalChecker.js.map