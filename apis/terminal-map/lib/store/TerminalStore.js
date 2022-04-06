import { SELECTOR_MANAGER } from '@airport/check-in';
import { DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { TERMINAL_STORE } from '../tokens';
import { internalTerminalState } from './theState';
export class TerminalStore {
    async init() {
        const selectorManager = await DI.db().get(SELECTOR_MANAGER);
        this.state = internalTerminalState;
        this.getTerminalState = selectorManager.createRootSelector(this.state);
        this.getApplicationActors = selectorManager.createSelector(this.getTerminalState, terminal => terminal.applicationActors);
        this.getApplicationActorMapByDomainAndApplicationNames = selectorManager.createSelector(this.getApplicationActors, applicationActors => {
            const applicationActorsByDomainAndApplicationNames = new Map();
            for (const applicationActor of applicationActors) {
                const applicationActorMapForDomain = ensureChildJsMap(applicationActorsByDomainAndApplicationNames, applicationActor.application.domain.name);
                let actorsForApplication = applicationActorMapForDomain
                    .get(applicationActor.application.name);
                if (!actorsForApplication) {
                    actorsForApplication = [];
                    applicationActorMapForDomain.set(applicationActor.application.name, actorsForApplication);
                }
                actorsForApplication.push(applicationActor);
            }
            return applicationActorsByDomainAndApplicationNames;
        });
        this.getDomains = selectorManager.createSelector(this.getTerminalState, terminal => terminal.domains);
        this.getDomainMapByName = selectorManager.createSelector(this.getDomains, domains => {
            const domainsByName = new Map();
            for (const domain of domains) {
                domainsByName.set(domain.name, domain);
            }
            return domainsByName;
        });
        this.getFrameworkActor = selectorManager.createSelector(this.getTerminalState, terminal => terminal.frameworkActor);
        this.getInitializedApps = selectorManager.createSelector(this.getTerminalState, terminalState => terminalState.initializedApps);
        this.getInitializingApps = selectorManager.createSelector(this.getTerminalState, terminalState => terminalState.initializingApps);
        this.getLatestApplicationVersionMapByNames = selectorManager.createSelector(this.getDomains, domains => {
            const latestApplicationVersionMapByNames = new Map();
            for (const domain of domains) {
                const mapForDomain = ensureChildJsMap(latestApplicationVersionMapByNames, domain.name);
                for (const application of domain.applications) {
                    mapForDomain.set(application.name, application.currentVersion[0].applicationVersion);
                }
            }
            return latestApplicationVersionMapByNames;
        });
        this.getLatestApplicationVersionMapByFullApplicationName = selectorManager.createSelector(this.getLatestApplicationVersionMapByNames, (latestApplicationVersionMapByNames) => {
            const latestApplicationVersionMapByFullApplicationName = new Map();
            for (const applicationVersionsForDomainName of latestApplicationVersionMapByNames.values()) {
                for (const applicationVersion of applicationVersionsForDomainName.values()) {
                    latestApplicationVersionMapByFullApplicationName.set(applicationVersion.application.fullName, applicationVersion);
                }
            }
            return latestApplicationVersionMapByFullApplicationName;
        });
        this.getAllApplicationVersionsByIds = selectorManager.createSelector(this.getDomains, domains => {
            const allApplicationVersionsByIds = [];
            for (const domain of domains) {
                for (const application of domain.applications) {
                    for (const applicationVersion of application.versions) {
                        allApplicationVersionsByIds[applicationVersion.id] = applicationVersion;
                    }
                }
            }
            return allApplicationVersionsByIds;
        });
        this.getLatestApplicationVersionsByApplicationIndexes = selectorManager.createSelector(this.getDomains, domains => {
            const latestApplicationVersionsByApplicationIndexes = [];
            for (const domain of domains) {
                for (const application of domain.applications) {
                    latestApplicationVersionsByApplicationIndexes[application.index]
                        = application.currentVersion[0].applicationVersion;
                }
            }
            return latestApplicationVersionsByApplicationIndexes;
        });
        this.getApplications = selectorManager.createSelector(this.getTerminalState, terminal => terminal.applications);
        this.getAllEntities = selectorManager.createSelector(this.getLatestApplicationVersionsByApplicationIndexes, latestApplicationVersionsByApplicationIndexes => {
            const allEntities = [];
            for (const latestApplicationVersion of latestApplicationVersionsByApplicationIndexes) {
                if (!latestApplicationVersion) {
                    continue;
                }
                for (const entity of latestApplicationVersion.entities) {
                    allEntities[entity.id] = entity;
                }
            }
            return allEntities;
        });
        this.getAllColumns = selectorManager.createSelector(this.getAllEntities, allEntities => {
            const allColumns = [];
            for (const entity of allEntities) {
                if (!entity) {
                    continue;
                }
                for (const column of entity.columns) {
                    allColumns[column.id] = column;
                }
            }
            return allColumns;
        });
        this.getAllRelations = selectorManager.createSelector(this.getAllEntities, allEntities => {
            const allRelations = [];
            for (const entity of allEntities) {
                if (!entity) {
                    continue;
                }
                for (const relation of entity.relations) {
                    allRelations[relation.id] = relation;
                }
            }
            return allRelations;
        });
        this.getTransactionMapById = selectorManager.createSelector(this.getTerminalState, terminal => terminal.transactionMapById);
    }
    tearDown() {
    }
}
DI.set(TERMINAL_STORE, TerminalStore);
//# sourceMappingURL=TerminalStore.js.map