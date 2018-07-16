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
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("typedi/decorators/Service");
const InjectionTokens_1 = require("../InjectionTokens");
let Blacklist = class Blacklist {
    constructor() {
        this.enabled = false;
        this.map = new Map();
    }
    enable(enable) {
        this.enabled = enable;
    }
    isBlacklisted(key, until) {
        if (!this.enabled) {
            return false;
        }
        if (!until) {
            until = new Date().getTime();
        }
        const blacklistedUntil = this.map.get(key);
        // If there is no blacklist entry
        if (!blacklistedUntil) {
            return false;
        }
        // If blacklisting is still in effect
        if (blacklistedUntil > until) {
            return true;
        }
        // Drop the entry from the map (if any)
        if (blacklistedUntil) {
            this.map.delete(key);
        }
        return false;
    }
    blacklist(key, until) {
        if (!this.enabled) {
            return;
        }
        if (!until) {
            until = new Date().getTime() + 600000;
        }
        this.map.set(key, until);
    }
};
Blacklist = __decorate([
    Service_1.Service(InjectionTokens_1.BlacklistToken),
    __metadata("design:paramtypes", [])
], Blacklist);
exports.Blacklist = Blacklist;
//# sourceMappingURL=Blacklist.js.map