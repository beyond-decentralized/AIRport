var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let QueryObjectInitializer = class QueryObjectInitializer {
    generateQObjectsAndPopulateStore(allDdlObjects) {
        this.ddlObjectLinker.link(allDdlObjects);
        this.queryEntityClassCreator.createAll(allDdlObjects.all.applications);
        const lastTerminalState = this.terminalStore.getTerminalState();
        const existingDomainMap = {};
        for (const domain of lastTerminalState.domains) {
            existingDomainMap[domain.name] = domain;
        }
        for (const domain of allDdlObjects.added.domains) {
            delete existingDomainMap[domain.name];
        }
        const unmodifiedDomains = [];
        for (const domainName in existingDomainMap) {
            unmodifiedDomains.push(existingDomainMap[domainName]);
        }
        const existingApplicationMap = {};
        for (const application of lastTerminalState.applications) {
            existingApplicationMap[application.fullName] = application;
        }
        for (const application of allDdlObjects.added.applications) {
            delete existingApplicationMap[application.fullName];
        }
        const unmodifiedApplications = [];
        for (const applicationName in existingApplicationMap) {
            unmodifiedApplications.push(existingApplicationMap[applicationName]);
        }
        this.terminalStore.state.next({
            ...lastTerminalState,
            domains: [
                ...unmodifiedDomains,
                ...allDdlObjects.added.domains
            ],
            applications: [
                ...unmodifiedApplications,
                ...allDdlObjects.added.applications
            ]
        });
    }
    async initialize() {
        const ddlObjects = await this.ddlObjectRetriever.retrieveDdlObjects();
        const allApplicationVersionsByIds = [];
        for (const applicationVersion of ddlObjects.applicationVersions) {
            allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion;
        }
        let allDdlObjects = {
            all: ddlObjects,
            allApplicationVersionsByIds,
            added: ddlObjects
        };
        this.generateQObjectsAndPopulateStore(allDdlObjects);
        return allDdlObjects;
    }
};
__decorate([
    Inject()
], QueryObjectInitializer.prototype, "ddlObjectLinker", void 0);
__decorate([
    Inject()
], QueryObjectInitializer.prototype, "ddlObjectRetriever", void 0);
__decorate([
    Inject()
], QueryObjectInitializer.prototype, "queryEntityClassCreator", void 0);
__decorate([
    Inject()
], QueryObjectInitializer.prototype, "terminalStore", void 0);
QueryObjectInitializer = __decorate([
    Injected()
], QueryObjectInitializer);
export { QueryObjectInitializer };
//# sourceMappingURL=QueryObjectInitializer.js.map