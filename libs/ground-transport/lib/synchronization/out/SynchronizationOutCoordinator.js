"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const AbstractCompletable_1 = require("../../AbstractCompletable");
const diTokens_1 = require("../../diTokens");
class SynchronizationOutCoordinator extends AbstractCompletable_1.AbstractCompletable {
    constructor() {
        super(...arguments);
        this.nodesBySyncFrequency = new Map();
    }
    // private syncOutManager: ISynchronizationOutManager
    // private syncNodeManager: ISyncNodeManager
    // private terminalStore: ITerminalStore
    async initialize() {
        const [syncNodeManager, syncOutManager, terminalStore] = await di_1.DI.get(diTokens_1.SYNC_NODE_MANAGER, diTokens_1.SYNC_OUT_MANAGER, terminal_map_1.TERMINAL_STORE);
        await syncNodeManager.initialize();
        /*
                pipe(this.terminalStore.getTerminalState.observable, (
                    terminalState: ITerminalState,
                    context: any
                ) => withLatestFrom([]))
                */
        this.record(terminalStore.getTerminalState.observable.subscribe((terminalState) => {
            if (!terminalState.terminal) {
                return;
            }
            this.updateSyncPool(terminalState.nodesBySyncFrequency, terminalState.terminal, syncOutManager);
        }));
    }
    updateSyncPool(nodesBySyncFrequency, terminal, syncOutManager) {
        const lastNodesBySyncFrequency = this.nodesBySyncFrequency;
        this.nodesBySyncFrequency = nodesBySyncFrequency;
        for (const [frequency, sharingNodes] of this.nodesBySyncFrequency) {
            // If in the new map there are sync node frequency that weren't in
            // the old map then kick off syncs for those frequencies
            if (!lastNodesBySyncFrequency.get(frequency)) {
                this.scheduleSyncsForFrequency(frequency, sharingNodes, terminal, syncOutManager);
            }
        }
    }
    returnToSyncPool(frequency, terminal, syncOutManager) {
        const sharingNodes = this.nodesBySyncFrequency.get(frequency);
        if (!sharingNodes) {
            return;
        }
        this.scheduleSyncsForFrequency(frequency, sharingNodes, terminal, syncOutManager);
    }
    scheduleSyncsForFrequency(frequency, sharingNodes, terminal, syncOutManager) {
        setTimeout(async () => {
            await syncOutManager.synchronize(sharingNodes, terminal);
            this.returnToSyncPool(frequency, terminal, syncOutManager);
        }, frequency);
    }
}
exports.SynchronizationOutCoordinator = SynchronizationOutCoordinator;
di_1.DI.set(diTokens_1.SYNC_OUT_COORDINATOR, SynchronizationOutCoordinator);
//# sourceMappingURL=SynchronizationOutCoordinator.js.map