var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { setQApplicationEntities } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
class EntityAccumulator {
    constructor(applicationDomain, applicationName, entityMap) {
        this.applicationDomain = applicationDomain;
        this.applicationName = applicationName;
        this.entityMap = entityMap;
    }
    add(clazz, index) {
        this.entityMap.set(clazz, {
            entity: {
                index,
                name: clazz.name,
            },
            application: {
                domain: this.applicationDomain,
                name: this.applicationName,
            },
        });
    }
}
let AirportDatabase = class AirportDatabase {
    get entityMap() {
        return this.databaseStore.entityMap;
    }
    ;
    get F() {
        return this.databaseStore.functions;
    }
    get functions() {
        return this.databaseStore.functions;
    }
    get A() {
        return this.databaseStore.applications;
    }
    get applications() {
        return this.databaseStore.applications;
    }
    get qApplications() {
        return this.databaseStore.qApplications;
    }
    get Q() {
        return this.databaseStore.qApplications;
    }
    get QM() {
        return this.databaseStore.QM;
    }
    async load() {
        // Just calling this method, loads the AirpotDatabase object
    }
    setQApplication(qApplication) {
        const fullApplication_Name = this.dbApplicationUtils
            .getFullApplication_Name(qApplication);
        const existingQApplication = this.QM[fullApplication_Name];
        if (existingQApplication) {
            const dbApplication = existingQApplication.__dbApplication__;
            qApplication.__dbApplication__ = dbApplication;
            setQApplicationEntities(dbApplication, qApplication, this.qApplications, this.appliationUtils, this.relationManager);
            this.Q[dbApplication.index] = qApplication;
        }
        this.QM[fullApplication_Name] = qApplication;
    }
    getAccumulator(applicationDomain, applicationName) {
        return new EntityAccumulator(applicationDomain, applicationName, this.entityMap);
    }
    async addRepository(
    // url: string,
    // platform: PlatformType,
    // platformConfig: string,
    // distributionStrategy: DistributionStrategy,
    context) {
        return await this.databaseFacade.addRepository(
        // url, platform, platformConfig, distributionStrategy, 
        context);
    }
    async insertColumnValues(rawInsertValues, context) {
        return await this.databaseFacade.insertColumnValues(rawInsertValues, context);
    }
    async insertValues(rawInsertValues, context) {
        return await this.databaseFacade.insertValues(rawInsertValues, context);
    }
    async insertColumnValuesGenerateIds(rawInsertValues, context) {
        return await this.databaseFacade.insertColumnValuesGenerateIds(rawInsertValues, context);
    }
    async insertValuesGenerateIds(rawInsertValues, context) {
        return await this.databaseFacade.insertValuesGenerateIds(rawInsertValues, context);
    }
    /**
     * Creates an entity with a WHERE clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    async deleteWhere(rawDelete, context) {
        return await this.databaseFacade.deleteWhere(rawDelete, context);
    }
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    async save(entity, context, operationName) {
        return await this.databaseFacade.save(entity, context);
    }
    /**
     * Updates an entity with a WHERE clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdateColumns, context) {
        return await this.databaseFacade.updateColumnsWhere(rawUpdateColumns, context);
    }
    /**
     * Updates an entity with a WHERE clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateWhere(rawUpdate, context) {
        return await this.databaseFacade.updateWhere(rawUpdate, context);
    }
};
__decorate([
    Inject()
], AirportDatabase.prototype, "appliationUtils", void 0);
__decorate([
    Inject()
], AirportDatabase.prototype, "databaseFacade", void 0);
__decorate([
    Inject()
], AirportDatabase.prototype, "databaseStore", void 0);
__decorate([
    Inject()
], AirportDatabase.prototype, "dbApplicationUtils", void 0);
__decorate([
    Inject()
], AirportDatabase.prototype, "find", void 0);
__decorate([
    Inject()
], AirportDatabase.prototype, "findOne", void 0);
__decorate([
    Inject()
], AirportDatabase.prototype, "relationManager", void 0);
__decorate([
    Inject()
], AirportDatabase.prototype, "search", void 0);
__decorate([
    Inject()
], AirportDatabase.prototype, "searchOne", void 0);
AirportDatabase = __decorate([
    Injected()
], AirportDatabase);
export { AirportDatabase };
export function injectAirportDatabase() {
    console.log('Injecting AirportDatabase');
}
//# sourceMappingURL=AirportDatabase.js.map