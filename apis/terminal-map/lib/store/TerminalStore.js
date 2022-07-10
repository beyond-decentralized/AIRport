var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { ensureChildJsMap } from '@airport/ground-control';
let TerminalStore = class TerminalStore {
    get state() {
        return this.terminalState.terminalState;
    }
    async init() {
        this.getTerminalState = this.selectorManager.createRootSelector(this.state);
        this.getApplicationActors = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.applicationActors);
        this.getApplicationInitializer = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.applicationInitializer);
        this.getApplicationActorMapByDomainAndApplication_Names = this.selectorManager.createSelector(this.getApplicationActors, applicationActors => {
            const applicationActorsByDomainAndApplication_Names = new Map();
            for (const applicationActor of applicationActors) {
                const applicationActorMapForDomain = ensureChildJsMap(applicationActorsByDomainAndApplication_Names, applicationActor.application.domain.name);
                let actorsForApplication = applicationActorMapForDomain
                    .get(applicationActor.application.name);
                if (!actorsForApplication) {
                    actorsForApplication = [];
                    applicationActorMapForDomain.set(applicationActor.application.name, actorsForApplication);
                }
                actorsForApplication.push(applicationActor);
            }
            return applicationActorsByDomainAndApplication_Names;
        });
        this.getDomains = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.domains);
        this.getDomainMapByName = this.selectorManager.createSelector(this.getDomains, domains => {
            const domainsByName = new Map();
            for (const domain of domains) {
                domainsByName.set(domain.name, domain);
            }
            return domainsByName;
        });
        this.getFrameworkActor = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.frameworkActor);
        this.getInternalConnector = this.selectorManager.createSelector(this.getTerminalState, terminalState => terminalState.internalConnector);
        this.getLastIds = this.selectorManager.createSelector(this.getTerminalState, terminalState => terminalState.lastIds);
        this.getLatestApplicationVersionMapByNames = this.selectorManager.createSelector(this.getDomains, domains => {
            const latestApplicationVersionMapByNames = new Map();
            for (const domain of domains) {
                const mapForDomain = ensureChildJsMap(latestApplicationVersionMapByNames, domain.name);
                for (const application of domain.applications) {
                    mapForDomain.set(application.name, application.currentVersion[0].applicationVersion);
                }
            }
            return latestApplicationVersionMapByNames;
        });
        this.getLatestApplicationVersionMapByFullApplication_Name = this.selectorManager.createSelector(this.getLatestApplicationVersionMapByNames, (latestApplicationVersionMapByNames) => {
            const latestApplicationVersionMapByFullApplication_Name = new Map();
            for (const applicationVersionsForDomain_Name of latestApplicationVersionMapByNames.values()) {
                for (const applicationVersion of applicationVersionsForDomain_Name.values()) {
                    latestApplicationVersionMapByFullApplication_Name.set(applicationVersion.application.fullName, applicationVersion);
                }
            }
            return latestApplicationVersionMapByFullApplication_Name;
        });
        this.getAllApplicationVersionsByIds = this.selectorManager.createSelector(this.getDomains, domains => {
            const allApplicationVersionsByIds = [];
            for (const domain of domains) {
                for (const application of domain.applications) {
                    for (const applicationVersion of application.versions) {
                        allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion;
                    }
                }
            }
            return allApplicationVersionsByIds;
        });
        this.getLatestApplicationVersionsByApplication_Indexes = this.selectorManager.createSelector(this.getDomains, domains => {
            const latestApplicationVersionsByApplication_Indexes = [];
            for (const domain of domains) {
                for (const application of domain.applications) {
                    latestApplicationVersionsByApplication_Indexes[application.index]
                        = application.currentVersion[0].applicationVersion;
                }
            }
            return latestApplicationVersionsByApplication_Indexes;
        });
        this.getApplications = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.applications);
        this.getAllEntities = this.selectorManager.createSelector(this.getLatestApplicationVersionsByApplication_Indexes, latestApplicationVersionsByApplication_Indexes => {
            const allEntities = [];
            for (const latestApplicationVersion of latestApplicationVersionsByApplication_Indexes) {
                if (!latestApplicationVersion) {
                    continue;
                }
                for (const entity of latestApplicationVersion.entities) {
                    allEntities[entity._localId] = entity;
                }
            }
            return allEntities;
        });
        this.getAllColumns = this.selectorManager.createSelector(this.getAllEntities, allEntities => {
            const allColumns = [];
            for (const entity of allEntities) {
                if (!entity) {
                    continue;
                }
                for (const column of entity.columns) {
                    allColumns[column._localId] = column;
                }
            }
            return allColumns;
        });
        this.getAllRelations = this.selectorManager.createSelector(this.getAllEntities, allEntities => {
            const allRelations = [];
            for (const entity of allEntities) {
                if (!entity) {
                    continue;
                }
                for (const relation of entity.relations) {
                    allRelations[relation._localId] = relation;
                }
            }
            return allRelations;
        });
        this.getReceiver = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.receiver);
        this.getSequenceGenerator = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.sequenceGenerator);
        this.getTransactionManager = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.transactionManager);
        this.getWebReceiver = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.webReceiver);
    }
    tearDown() {
    }
};
__decorate([
    Inject()
], TerminalStore.prototype, "selectorManager", void 0);
__decorate([
    Inject()
], TerminalStore.prototype, "terminalState", void 0);
TerminalStore = __decorate([
    Injected()
], TerminalStore);
export { TerminalStore };
//# sourceMappingURL=TerminalStore.js.map