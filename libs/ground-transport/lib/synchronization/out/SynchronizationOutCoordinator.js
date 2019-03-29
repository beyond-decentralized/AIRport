"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const AbstractCompletable_1 = require("../../AbstractCompletable");
const diTokens_1 = require("../../diTokens");
class SynchronizationOutCoordinator extends AbstractCompletable_1.AbstractCompletable {
    constructor() {
        super();
        this.nodesBySyncFrequency = new Map();
        di_1.DI.get((syncNodeManager, synchronizationOutManager, terminalStore) => {
            this.syncNodeManager = syncNodeManager;
            this.syncOutManager = synchronizationOutManager;
            this.terminalStore = terminalStore;
        }, diTokens_1.SYNC_NODE_MANAGER, diTokens_1.SYNC_OUT_MANAGER, terminal_map_1.TERMINAL_STORE);
    }
    async initialize() {
        await this.syncNodeManager.initialize();
        /*
                pipe(this.terminalStore.getTerminalState.observable, (
                    terminalState: ITerminalState,
                    context: any
                ) => withLatestFrom([]))
                */
        this.record(this.terminalStore.getTerminalState.observable.subscribe((terminalState) => {
            if (!terminalState.terminal) {
                return;
            }
            this.updateSyncPool(terminalState.nodesBySyncFrequency, terminalState.terminal);
        }));
    }
    updateSyncPool(nodesBySyncFrequency, terminal) {
        const lastNodesBySyncFrequency = this.nodesBySyncFrequency;
        this.nodesBySyncFrequency = nodesBySyncFrequency;
        for (const [frequency, sharingNodes] of this.nodesBySyncFrequency) {
            // If in the new map there are sync node frequency that weren't in
            // the old map then kick off syncs for those frequencies
            if (!lastNodesBySyncFrequency.get(frequency)) {
                this.scheduleSyncsForFrequency(frequency, sharingNodes, terminal);
            }
        }
    }
    returnToSyncPool(frequency, terminal) {
        const sharingNodes = this.nodesBySyncFrequency.get(frequency);
        if (!sharingNodes) {
            return;
        }
        this.scheduleSyncsForFrequency(frequency, sharingNodes, terminal);
    }
    scheduleSyncsForFrequency(frequency, sharingNodes, terminal) {
        setTimeout(async () => {
            await this.syncOutManager.synchronize(sharingNodes, terminal).then();
            this.returnToSyncPool(frequency, terminal);
        }, frequency);
    }
}
exports.SynchronizationOutCoordinator = SynchronizationOutCoordinator;
di_1.DI.set(diTokens_1.SYNC_OUT_COORDINATOR, SynchronizationOutCoordinator);
//# sourceMappingURL=SynchronizationOutCoordinator.js.map