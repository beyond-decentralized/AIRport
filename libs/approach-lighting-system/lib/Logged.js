"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
class Logged {
    constructor(level = runway_edge_lighting_1.LogLevel.INFO) {
        this._level = level;
    }
    get level() {
        return this._level;
    }
    set level(newLevel) {
        this._level = newLevel;
    }
}
exports.Logged = Logged;
//# sourceMappingURL=Logged.js.map