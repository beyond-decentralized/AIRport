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
var _a;
const withLatestFrom_1 = require("rxjs/operators/withLatestFrom");
const InjectionTokens_1 = require("../../../../apps/terminal/src/InjectionTokens");
const TerminalStore_1 = require("../../../../apps/terminal/src/+state/TerminalStore");
const Inject_1 = require("typedi/decorators/Inject");
const AbstractCompletable_1 = require("../../../../apps/terminal/src/core/AbstractCompletable");
const typedi_1 = require("typedi");
let SynchronizationOutCoordinator = class SynchronizationOutCoordinator extends AbstractCompletable_1.AbstractCompletable {
    constructor(synchronizationOutManager, syncNodeManager, terminalStore) {
        super();
        this.synchronizationOutManager = synchronizationOutManager;
        this.syncNodeManager = syncNodeManager;
        this.terminalStore = terminalStore;
        this.nodesBySyncFrequency = new Map();
    }
    async initialize() {
        await this.syncNodeManager.initialize();
        this.record(this.terminalStore.nodesBySyncFrequency.pipe(withLatestFrom_1.withLatestFrom(this.terminalStore.terminal)).subscribe(([nodesBySyncFrequency, terminal]) => {
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
};
SynchronizationOutCoordinator = __decorate([
    typedi_1.Service(InjectionTokens_1.SynchronizationOutCoordinatorToken),
    __param(0, Inject_1.Inject(InjectionTokens_1.SynchronizationOutManagerToken)),
    __param(1, Inject_1.Inject(InjectionTokens_1.SyncNodeManagerToken)),
    __param(2, Inject_1.Inject(InjectionTokens_1.TerminalStoreToken)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof TerminalStore_1.ITerminalStore !== "undefined" && TerminalStore_1.ITerminalStore) === "function" && _a || Object])
], SynchronizationOutCoordinator);
exports.SynchronizationOutCoordinator = SynchronizationOutCoordinator;
//# sourceMappingURL=SynchronizationOutCoordinator.js.map