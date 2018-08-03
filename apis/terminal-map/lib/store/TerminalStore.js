"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
class MemoizedSelector {
}
exports.MemoizedSelector = MemoizedSelector;
let TerminalStore = class TerminalStore {
    constructor() {
        this.terminal = new rxjs_1.BehaviorSubject(null);
        this.nodesBySyncFrequency = new rxjs_1.BehaviorSubject(new Map());
    }
    tearDown() {
        this.nodesBySyncFrequency.complete();
    }
};
TerminalStore = __decorate([
    typedi_1.Service(InjectionTokens_1.TerminalStoreToken)
], TerminalStore);
exports.TerminalStore = TerminalStore;
//# sourceMappingURL=TerminalStore.js.map