"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../../diTokens");
class SynchronizationOutCoordinator extends AbstractCompletable {
    constructor() {
        super();
        this.nodesBySyncFrequency = new Map();
        di_1.DI.get(() => {
        }, diTokens_1.SYNC_OUT_MANAGER, diTokens_1.SYNC_NODE_MANAGER, terminal_map_1.TERMINAL_STORE);
    }
    async initialize() {
        await this.syncNodeManager.initialize();
        this.record(this.terminalStore.nodesBySyncFrequency.pipe(withLatestFrom(this.terminalStore.terminal)).subscribe(([nodesBySyncFrequency, terminal]) => {
            if (!terminal) {
                return;
            }
            this.updateSyncPool(nodesBySyncFrequency, terminal);
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
            await this.synchronizationOutManager.synchronize(sharingNodes, terminal).then();
            this.returnToSyncPool(frequency, terminal);
        }, frequency);
    }
}
exports.SynchronizationOutCoordinator = SynchronizationOutCoordinator;
di_1.DI.set(diTokens_1.SYNC_OUT_COORDINATOR, SynchronizationOutCoordinator);
//# sourceMappingURL=SynchronizationOutCoordinator.js.map