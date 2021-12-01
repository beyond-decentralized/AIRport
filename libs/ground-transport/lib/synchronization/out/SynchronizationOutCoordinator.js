import { container, DI } from '@airport/di';
import { TERMINAL_STORE, } from '@airport/terminal-map';
import { AbstractCompletable } from '../../AbstractCompletable';
import { SYNC_NODE_MANAGER, SYNCHRONIZATION_OUT_COORDINATOR, SYNCHRONIZATION_OUT_MANAGER } from '../../tokens';
export class SynchronizationOutCoordinator extends AbstractCompletable {
    constructor() {
        super(...arguments);
        this.nodesBySyncFrequency = new Map();
    }
    // private syncOutManager: ISynchronizationOutManager
    // private syncNodeManager: ISyncNodeManager
    // private terminalStore: ITerminalStore
    async initialize() {
        const [syncNodeManager, syncOutManager, terminalStore] = await container(this).get(SYNC_NODE_MANAGER, SYNCHRONIZATION_OUT_MANAGER, TERMINAL_STORE);
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
DI.set(SYNCHRONIZATION_OUT_COORDINATOR, SynchronizationOutCoordinator);
//# sourceMappingURL=SynchronizationOutCoordinator.js.map