"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
const Constants_1 = require("./Constants");
const Logged_1 = require("./Logged");
const Logger_1 = require("./Logger");
var log;
class LoggedPackage extends Logged_1.Logged {
    constructor(packageName, level = runway_edge_lighting_1.LogLevel.INFO) {
        super(level);
        this.loggerMap = new Map();
        this.package = {
            id: null,
            name: packageName,
            applicationPackages: []
        };
        setTimeout(() => {
            log = Constants_1.APPROACH_LIGHTING_SYSTEM_LOGGER.add('LoggedPackage');
        });
        // loggedApplication.addPackage(this);
    }
    get applicationPackage() {
        return this._applicationPackage;
    }
    set applicationPackage(applicationPackage) {
        applicationPackage.package = this.package;
        this._applicationPackage = applicationPackage;
    }
    set level(newLevel) {
        super.level = newLevel;
        for (const logger of this.loggerMap.values()) {
            logger.level = newLevel;
        }
    }
    addLogger(logger) {
        this.loggerMap.set(logger.unit.name, logger);
        // logger.level = this.level;
    }
    add(packagedUnitName) {
        if (this.loggerMap.get(packagedUnitName)) {
            log.throw('Logger {1} already exists in package {2}', packagedUnitName, this.package.name);
        }
        const logger = new Logger_1.Logger(this, packagedUnitName, this.level);
        this.loggerMap.set(packagedUnitName, logger);
        return logger;
    }
}
exports.LoggedPackage = LoggedPackage;
//# sourceMappingURL=LoggedPackage.js.map