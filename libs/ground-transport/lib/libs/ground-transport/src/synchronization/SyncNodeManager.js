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
const moving_walkway_1 = require("@airport/moving-walkway");
const terminal_map_1 = require("@airport/terminal-map");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let SyncNodeManager = class SyncNodeManager {
    constructor(sharingNodeDao, synchronizationInManager, terminalStore) {
        this.sharingNodeDao = sharingNodeDao;
        this.synchronizationInManager = synchronizationInManager;
        this.terminalStore = terminalStore;
    }
    async initialize() {
        const nodesBySyncFrequency = await this.sharingNodeDao.findAllGroupedBySyncFrequency();
        this.terminalStore.nodesBySyncFrequency.next(nodesBySyncFrequency);
    }
    async sendMessages(sharingNodeMap, messagesBySharingNode) {
        const messageDepartures = [];
        const sharingNodes = [];
        for (const [sharingNodeId, sharingNode] of sharingNodeMap) {
            const syncMessage = messagesBySharingNode.get(sharingNodeId);
            sharingNodes.push(sharingNode);
            messageDepartures.push(this.sendMessage(sharingNode, syncMessage));
        }
        const incomingMessages = await Promise.all(messageDepartures);
        await this.synchronizationInManager.receiveMessages(sharingNodes, incomingMessages);
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
};
SyncNodeManager = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncNodeManagerToken),
    __param(0, typedi_1.Inject(moving_walkway_1.SharingNodeDaoToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.SynchronizationInManagerToken)),
    __param(2, typedi_1.Inject(terminal_map_1.TerminalStoreToken)),
    __metadata("design:paramtypes", [Object, Object, Object])
], SyncNodeManager);
exports.SyncNodeManager = SyncNodeManager;
/**
 * NEED: a state container that can handle effects AND notifies only when
 * a given memorized selector changes value.  Notification should be an observable
 *
 */ 
//# sourceMappingURL=SyncNodeManager.js.map