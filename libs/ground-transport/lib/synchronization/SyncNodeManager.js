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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
const moving_walkway_1 = require("@airport/moving-walkway");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let SyncNodeManager = class SyncNodeManager {
    constructor(sharingNodeDao, synchronizationInManager, terminalStore) {
        this.sharingNodeDao = sharingNodeDao;
        this.synchronizationInManager = synchronizationInManager;
        this.terminalStore = terminalStore;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const nodesBySyncFrequency = yield this.sharingNodeDao.findAllGroupedBySyncFrequency();
            this.terminalStore.nodesBySyncFrequency.next(nodesBySyncFrequency);
        });
    }
    sendMessages(sharingNodeMap, messagesBySharingNode) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageDepartures = [];
            const sharingNodes = [];
            for (const [sharingNodeId, sharingNode] of sharingNodeMap) {
                const syncMessage = messagesBySharingNode.get(sharingNodeId);
                sharingNodes.push(sharingNode);
                messageDepartures.push(this.sendMessage(sharingNode, syncMessage));
            }
            const incomingMessages = yield Promise.all(messageDepartures);
            yield this.synchronizationInManager.receiveMessages(sharingNodes, incomingMessages);
        });
    }
    sendMessage(sharingNode, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sharingNodeEndPoint.communicateWithAGT(sharingNode, message);
        });
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
    __param(2, typedi_1.Inject(TerminalStoreToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof moving_walkway_1.ISharingNodeDao !== "undefined" && moving_walkway_1.ISharingNodeDao) === "function" ? _a : Object, Object, typeof (_b = typeof ITerminalStore !== "undefined" && ITerminalStore) === "function" ? _b : Object])
], SyncNodeManager);
exports.SyncNodeManager = SyncNodeManager;
/**
 * NEED: a state container that can handle effects AND notifies only when
 * a given memorized selector changes value.  Notification should be an observable
 *
 */ 
//# sourceMappingURL=SyncNodeManager.js.map