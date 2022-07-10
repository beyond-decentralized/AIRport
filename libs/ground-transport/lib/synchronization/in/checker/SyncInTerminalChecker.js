var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let SyncInTerminalChecker = class SyncInTerminalChecker {
    async ensureTerminals(message, context) {
        try {
            let terminalGUIDs = [];
            let messageTerminalIndexMap = new Map();
            for (let i = 0; i < message.terminals.length; i++) {
                const terminal = message.terminals[i];
                if (typeof terminal.owner !== 'number') {
                    throw new Error(`Expecting "in-message index" (number)
					in 'terminal.owner' of RepositorySynchronizationMessage.terminals`);
                }
                if (typeof terminal.GUID !== 'string' || terminal.GUID.length !== 36) {
                    throw new Error(`Invalid 'terminal.GUID' in RepositorySynchronizationMessage.terminals`);
                }
                if (terminal.isLocal !== undefined) {
                    throw new Error(`'terminal.isLocal' cannot defined in RepositorySynchronizationMessage.terminals`);
                }
                terminal.isLocal = false;
                const owner = message.userAccounts[terminal.owner];
                if (!owner) {
                    throw new Error(`Did not find userAccount for terminal.owner with "in-message index" ${terminal.owner}
						for RepositorySynchronizationMessage.terminals`);
                }
                terminal.owner = owner;
                terminalGUIDs.push(terminal.GUID);
                messageTerminalIndexMap.set(terminal.GUID, i);
                // Make sure id field is not in the input
                delete terminal._localId;
            }
            const terminals = await this.terminalDao.findByGUIDs(terminalGUIDs);
            for (const terminal of terminals) {
                const messageUserAccountIndex = messageTerminalIndexMap.get(terminal.GUID);
                message.terminals[messageUserAccountIndex] = terminal;
            }
            const missingTerminals = message.terminals
                .filter(messageTerminal => !messageTerminal._localId);
            if (missingTerminals.length) {
                await this.addMissingTerminals(missingTerminals, context);
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async addMissingTerminals(missingTerminals, context) {
        for (const terminal of missingTerminals) {
            terminal.isLocal = false;
        }
        await this.terminalDao.insert(missingTerminals, context);
    }
};
__decorate([
    Inject()
], SyncInTerminalChecker.prototype, "terminalDao", void 0);
SyncInTerminalChecker = __decorate([
    Injected()
], SyncInTerminalChecker);
export { SyncInTerminalChecker };
//# sourceMappingURL=SyncInTerminalChecker.js.map