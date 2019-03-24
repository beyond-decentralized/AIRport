"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const moving_walkway_1 = require("@airport/moving-walkway");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
class SyncNodeManager {
    constructor() {
        di_1.DI.get((sharingNodeDao, sharingNodeTerminalDao, synchronizationInManager, terminalStore) => {
            this.sharingNodeDao = sharingNodeDao;
            this.sharingNodeTerminalDao = sharingNodeTerminalDao;
            this.synchronizationInManager = synchronizationInManager;
            this.terminalStore = terminalStore;
        }, diTokens_1.SYNC_NODE_MANAGER, moving_walkway_1.SHARING_NODE_TERMINAL_DAO, diTokens_1.SYNC_IN_MANAGER, terminal_map_1.TERMINAL_STORE);
    }
    async initialize() {
        const nodesBySyncFrequency = await this.sharingNodeDao.findAllGroupedBySyncFrequency();
        this.terminalStore.nodesBySyncFrequency.next(nodesBySyncFrequency);
    }
    async sendMessages(sharingNodeMap, messagesBySharingNode) {
        let terminal;
        this.terminalStore.terminal.subscribe((theTerminal) => terminal = theTerminal).unsubscribe();
        const sharingNodeTerminalMap = await this.sharingNodeTerminalDao
            .findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(terminal.id, Array.from(sharingNodeMap.keys()));
        const messageDepartures = [];
        const sharingNodes = [];
        for (const [sharingNodeId, sharingNode] of sharingNodeMap) {
            const syncMessage = messagesBySharingNode.get(sharingNodeId);
            sharingNodes.push(sharingNode);
            messageDepartures.push(this.sendMessage(sharingNode, syncMessage));
        }
        const incomingMessages = await Promise.all(messageDepartures);
        await this.synchronizationInManager.receiveMessages(sharingNodes, incomingMessages, sharingNodeTerminalMap);
    }
    async sendMessage(sharingNode, message) {
        return await this.sharingNodeEndPoint.communicateWithAGT(sharingNode, message);
    }
    serializeMessageDates() {
        // FIXME: serialize all dates to numbers (where needed)
    }
    deserializeMessageDates() {
        // FIXME: deserialize all numbers to Dates (where needed)
    }
}
exports.SyncNodeManager = SyncNodeManager;
di_1.DI.set(diTokens_1.SYNC_NODE_MANAGER, SyncNodeManager);
/**
 * NEED: a state container that can handle effects AND notifies only when
 * a given memorized selector changes value.  Notification should be an observable
 *
 */ 
//# sourceMappingURL=SyncNodeManager.js.map