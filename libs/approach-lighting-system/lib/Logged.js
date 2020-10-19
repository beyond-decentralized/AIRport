import { LogLevel } from "@airport/runway-edge-lighting";
export class Logged {
    constructor(level = LogLevel.INFO) {
        this._level = level;
    }
    get level() {
        return this._level;
    }
    set level(newLevel) {
        this._level = newLevel;
    }
}
//# sourceMappingURL=Logged.js.map