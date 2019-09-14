"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
const Logged_1 = require("./Logged");
class LoggedApplication extends Logged_1.Logged {
    constructor(applicationName, level = runway_edge_lighting_1.LogLevel.INFO) {
        super(level);
        this.packageMap = new Map();
        this.application = {
            id: null,
            name: applicationName
        };
    }
    set level(newLevel) {
        super.level = newLevel;
        for (const aPackage of this.packageMap.values()) {
            aPackage.level = newLevel;
        }
    }
    addPackage(loggedPackage) {
        loggedPackage.applicationPackage = {
            application: this.application,
            id: null
        };
        this.packageMap.set(loggedPackage.applicationPackage.package.name, loggedPackage);
        // loggedPackage.level = this.level;
    }
}
exports.LoggedApplication = LoggedApplication;
//# sourceMappingURL=LoggedApplication.js.map