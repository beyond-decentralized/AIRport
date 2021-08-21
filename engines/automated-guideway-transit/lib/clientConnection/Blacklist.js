import { DI } from '@airport/di';
import { BLACKLIST } from "../tokens";
export class Blacklist {
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
DI.set(BLACKLIST, Blacklist);
//# sourceMappingURL=Blacklist.js.map