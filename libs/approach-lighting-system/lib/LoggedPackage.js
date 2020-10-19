import { LogLevel } from '@airport/runway-edge-lighting';
import { APPROACH_LIGHTING_SYSTEM_LOGGER } from './Constants';
import { Logged } from './Logged';
import { Logger } from './Logger';
var log;
export class LoggedPackage extends Logged {
    constructor(packageName, level = LogLevel.INFO) {
        super(level);
        this.loggerMap = new Map();
        this.package = {
            id: null,
            name: packageName,
            applicationPackages: []
        };
        setTimeout(() => {
            log = APPROACH_LIGHTING_SYSTEM_LOGGER.add('LoggedPackage');
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
        const logger = new Logger(this, packagedUnitName, this.level);
        this.loggerMap.set(packagedUnitName, logger);
        return logger;
    }
}
//# sourceMappingURL=LoggedPackage.js.map