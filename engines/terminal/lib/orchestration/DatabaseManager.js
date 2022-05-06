var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { container } from '@airport/direction-indicator';
import { getFullApplicationName, } from '@airport/ground-control';
import { Actor, } from '@airport/holding-pattern-runtime';
import { BLUEPRINT } from '@airport/blueprint';
let DatabaseManager = class DatabaseManager {
    constructor() {
        this.initialized = false;
    }
    async initNoDb(context, ...applications) {
        await container(this).get(AIRPORT_DATABASE);
        this.transactionalServer.tempActor = new Actor();
        await this.installStarterApplication(true, false, context);
        await this.applicationInitializer.stage(applications, context);
        this.transactionalServer.tempActor = null;
        this.initialized = true;
    }
    async initWithDb(domainName, context) {
        await container(this).get(AIRPORT_DATABASE);
        this.transactionalServer.tempActor = new Actor();
        const hydrate = await this.storeDriver.doesTableExist(getFullApplicationName(BLUEPRINT[0]), 'PACKAGES', context);
        await this.installStarterApplication(false, hydrate, context);
        if (!hydrate) {
            await this.internalRecordManager.initTerminal(domainName, context);
        }
        this.transactionalServer.tempActor = null;
        this.initialized = true;
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
            const existingApplication = existingApplicationMap.get(getFullApplicationName(jsonApplication));
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
    /*
    static async addDataStore(
        storeType: StoreType,
        terminalName: string
    ): Promise<void> {
        if (this.isInitialized(terminalName)) {
            throw new Error(
            `Database '${terminalName}' is already initialized`);
        }
        const newDataStore = await QDataStore.db(dbConst.DEFAULT_DB).save({
            name: terminalName,
            storeType: storeType
        });
        await TQ.init(storeType, terminalName);
    }

    private doEnsureInitialized(
        terminalName: string,
        resolve,
        reject,
        remainingTimeout: number
    ): void {
        if (this.isInitialized(terminalName)) {
            resolve()
        }
        if (remainingTimeout <= 0) {
            reject(`Timeout out waiting for initialization of DB: [${terminalName}]`)
        }
        remainingTimeout -= 100
        setTimeout(() => {
            this.doEnsureInitialized(terminalName, resolve, reject, remainingTimeout)
        }, 100)
    }
    */
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
], DatabaseManager.prototype, "applicationDao", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "applicationInitializer", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "internalRecordManager", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "storeDriver", void 0);
__decorate([
    Inject()
], DatabaseManager.prototype, "transactionalServer", void 0);
DatabaseManager = __decorate([
    Injected()
], DatabaseManager);
export { DatabaseManager };
//# sourceMappingURL=DatabaseManager.js.map