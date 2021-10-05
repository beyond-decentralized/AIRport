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
            applications: [],
            domains: [],
            frameworkActor: null,
            nodesBySyncFrequency: new Map(),
            schemas: [],
            terminal: null,
        });
        this.getTerminalState = selectorManager.createRootSelector(this.state);
        this.getApplicationActors = selectorManager.createSelector(this.getTerminalState, terminal => terminal.applicationActors);
        this.getApplicationActorMapById = selectorManager.createSelector(this.getApplicationActors, applicationActors => {
            const applicationActorsByIds = new Map();
            for (const applicationActor of applicationActors) {
                applicationActorsByIds.set(applicationActor.application.id, applicationActor);
            }
            return applicationActorsByIds;
        });
        this.getApplicationActorMapByNames = selectorManager.createSelector(this.getApplicationActors, applicationActors => {
            const applicationActorsByNames = new Map();
            for (const applicationActor of applicationActors) {
                const mapForDomain = ensureChildJsMap(applicationActorsByNames, applicationActor.application.domain.name);
                mapForDomain.set(applicationActor.application.name, applicationActor);
            }
            return applicationActorsByNames;
        });
        this.getApplicationMapById = selectorManager.createSelector(this.getApplications, applications => {
            const applicationsByIds = new Map();
            for (const application of applications) {
                applicationsByIds.set(application.id, application);
            }
            return applicationsByIds;
        });
        this.getApplicationMapByNames = selectorManager.createSelector(this.getApplications, applications => {
            const applicationsByNames = new Map();
            for (const application of applications) {
                const mapForDomain = ensureChildJsMap(applicationsByNames, application.domain.name);
                mapForDomain.set(application.name, application);
            }
            return applicationsByNames;
        });
        this.getDomains = selectorManager.createSelector(this.getTerminalState, terminal => terminal.domains);
        this.getFrameworkActor = selectorManager.createSelector(this.getTerminalState, terminal => terminal.frameworkActor);
        this.getLatestSchemaVersionMapByNames = selectorManager.createSelector(this.getDomains, domains => {
            const latestSchemaVersionMapByNames = new Map();
            for (const domain of domains) {
                const mapForDomain = ensureChildJsMap(latestSchemaVersionMapByNames, domain.name);
                for (const schema of domain.schemas) {
                    mapForDomain.set(schema.name, schema.currentVersion[0].schemaVersion);
                }
            }
            return latestSchemaVersionMapByNames;
        });
        this.getLatestSchemaVersionMapBySchemaName = selectorManager.createSelector(this.getLatestSchemaVersionMapByNames, (latestSchemaVersionMapByNames) => {
            const latestSchemaVersionMapBySchemaName = new Map();
            for (const schemaVersionsForDomainName of latestSchemaVersionMapByNames.values()) {
                for (const schemaVersion of schemaVersionsForDomainName.values()) {
                    latestSchemaVersionMapBySchemaName.set(schemaVersion.schema.name, schemaVersion);
                }
            }
            return latestSchemaVersionMapBySchemaName;
        });
        // getNodesBySyncFrequency = createSelector(this.getTerminalState,
        // 	terminal => terminal.nodesBySyncFrequency)
        this.getAllSchemaVersionsByIds = selectorManager.createSelector(this.getDomains, domains => {
            const allSchemaVersionsByIds = [];
            for (const domain of domains) {
                for (const schema of domain.schemas) {
                    for (const schemaVersion of schema.versions) {
                        allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
                    }
                }
            }
            return allSchemaVersionsByIds;
        });
        this.getLatestSchemaVersionsBySchemaIndexes = selectorManager.createSelector(this.getDomains, domains => {
            const latestSchemaVersionsBySchemaIndexes = [];
            for (const domain of domains) {
                for (const schema of domain.schemas) {
                    latestSchemaVersionsBySchemaIndexes[schema.index]
                        = schema.currentVersion[0].schemaVersion;
                }
            }
            return latestSchemaVersionsBySchemaIndexes;
        });
        this.getSchemas = selectorManager.createSelector(this.getTerminalState, terminal => terminal.schemas);
        this.getAllEntities = selectorManager.createSelector(this.getLatestSchemaVersionsBySchemaIndexes, latestSchemaVersionsBySchemaIndexes => {
            const allEntities = [];
            for (const latestSchemaVersion of latestSchemaVersionsBySchemaIndexes) {
                if (!latestSchemaVersion) {
                    continue;
                }
                for (const entity of latestSchemaVersion.entities) {
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