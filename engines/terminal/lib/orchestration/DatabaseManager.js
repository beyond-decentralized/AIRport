var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { Actor, } from '@airport/holding-pattern';
import { BLUEPRINT } from '@airport/blueprint';
let DatabaseManager = class DatabaseManager {
    constructor() {
        this.initialized = false;
    }
    async initNoDb(context, ...applications) {
        this.airportDatabase.load();
        this.transactionalServer.tempActor = new Actor();
        await this.installStarterApplication(true, false, context);
        await this.applicationInitializer.stage(applications, context);
        this.transactionalServer.tempActor = null;
        this.initialized = true;
    }
    async initWithDb(domainName, context) {
        this.airportDatabase.load();
        this.transactionalServer.tempActor = new Actor();
        await this.transactionManager.transactInternal(async (_transaction, context) => {
            const hydrate = await this.storeDriver.doesTableExist(this.dbApplicationUtils
                .getFullApplicationName(BLUEPRINT[0]), 'PACKAGES', context);
            await this.installStarterApplication(false, hydrate, context);
            if (!hydrate) {
                await this.internalRecordManager.initTerminal(domainName, context);
            }
            this.transactionalServer.tempActor = null;
            this.initialized = true;
        }, {
            doNotRecordHistory: true
        });
    }
    isInitialized() {
        return this.initialized;
    }
    async initFeatureApplications(context, jsonApplications) {
        const applications = await this.applicationDao.findAllWithJson();
        const existingApplicationMap = new Map();
        for (const application of applications) {
            existingApplicationMap.set(application.fullName, application);
        }
        const applicationsToCreate = [];
        for (const jsonApplication of jsonApplications) {
            const existingApplication = existingApplicationMap.get(this.dbApplicationUtils
                .getFullApplicationName(jsonApplication));
            if (existingApplication) {
                jsonApplication.lastIds = existingApplication.versions[0].jsonApplication.lastIds;
            }
            else {
                applicationsToCreate.push(jsonApplication);
            }
        }
        this.transactionalServer.tempActor = new Actor();
        await this.applicationInitializer.initialize(applicationsToCreate, context, true, true);
        this.transactionalServer.tempActor = null;
    }
    async installStarterApplication(stage, hydrate, context) {
        const blueprintFile = await import('@airport/blueprint');
        if (stage) {
            await this.applicationInitializer.stage(blueprintFile.BLUEPRINT, context);
        }
        else if (hydrate) {
            await this.applicationInitializer.hydrate(blueprintFile.BLUEPRINT, context);
        }
        else {
            await this.applicationInitializer.initialize(blueprintFile.BLUEPRINT, context, false, false);
        }
    }
};
__decorate([
    Inject()
], DatabaseManager.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "applicationDao", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "applicationInitializer", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "dbApplicationUtils", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "internalRecordManager", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "storeDriver", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "transactionalServer", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "transactionManager", void 0);
DatabaseManager = __decorate([
    Injected()
], DatabaseManager);
export { DatabaseManager };
//# sourceMappingURL=DatabaseManager.js.map