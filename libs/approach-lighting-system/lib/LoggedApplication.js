import { LogLevel } from '@airport/runway-edge-lighting';
import { Logged } from './Logged';
export class LoggedApplication extends Logged {
    constructor(applicationName, level = LogLevel.INFO) {
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
//# sourceMappingURL=LoggedApplication.js.map