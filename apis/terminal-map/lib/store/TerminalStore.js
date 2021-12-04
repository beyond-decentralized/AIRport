import { SELECTOR_MANAGER } from '@airport/check-in';
import { DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { BehaviorSubject } from 'rxjs';
import { TERMINAL_STORE } from '../tokens';
export class TerminalStore {
    async init() {
        const selectorManager = await DI.db().get(SELECTOR_MANAGER);
        this.state = new BehaviorSubject({
            applicationActors: [],
            domains: [],
            frameworkActor: null,
            applications: [],
            terminal: null,
        });
        this.getTerminalState = selectorManager.createRootSelector(this.state);
        this.getApplicationActors = selectorManager.createSelector(this.getTerminalState, terminal => terminal.applicationActors);
        this.getApplicationActorMapBySignature = selectorManager.createSelector(this.getApplicationActors, applicationActors => {
            const applicationActorsBySignature = new Map();
            for (const applicationActor of applicationActors) {
                let actorsForSignature = applicationActorsBySignature
                    .get(applicationActor.application.signature);
                if (!actorsForSignature) {
                    actorsForSignature = [];
                    applicationActorsBySignature.set(applicationActor.application.signature, actorsForSignature);
                }
                actorsForSignature.push(applicationActor);
            }
            return applicationActorsBySignature;
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
        this.getLatestApplicationVersionMapByApplicationName = selectorManager.createSelector(this.getLatestApplicationVersionMapByNames, (latestApplicationVersionMapByNames) => {
            const latestApplicationVersionMapByApplicationName = new Map();
            for (const applicationVersionsForDomainName of latestApplicationVersionMapByNames.values()) {
                for (const applicationVersion of applicationVersionsForDomainName.values()) {
                    latestApplicationVersionMapByApplicationName.set(applicationVersion.application.name, applicationVersion);
                }
            }
            return latestApplicationVersionMapByApplicationName;
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
    }
    tearDown() {
    }
}
DI.set(TERMINAL_STORE, TerminalStore);
//# sourceMappingURL=TerminalStore.js.map