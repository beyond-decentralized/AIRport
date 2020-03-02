"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
class Blacklist {
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
}
exports.Blacklist = Blacklist;
di_1.DI.set(tokens_1.BLACKLIST, Blacklist);
//# sourceMappingURL=Blacklist.js.map