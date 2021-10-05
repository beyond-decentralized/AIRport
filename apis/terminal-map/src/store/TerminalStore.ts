import {
	IMemoizedSelector,
	SELECTOR_MANAGER
} from '@airport/check-in';
import { DI } from '@airport/di';
import {
	ApplicationId,
	ApplicationSignature,
	DomainName,
	ensureChildJsMap,
	JsonSchemaName,
	SchemaName
} from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import type { IApplication, IDomain } from '@airport/territory';
import {
	ISchema,
	ISchemaColumn,
	ISchemaEntity,
	ISchemaRelation,
	ISchemaVersion
} from '@airport/traffic-pattern';
import { BehaviorSubject } from 'rxjs';
import { TERMINAL_STORE } from '../tokens';
import { ITerminalState } from './TerminalState';

export interface ITerminalStore {

	state: BehaviorSubject<ITerminalState>

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationActorMapBySignature: IMemoizedSelector<Map<ApplicationSignature, IActor>, ITerminalState>

	getApplications: IMemoizedSelector<IApplication[], ITerminalState>

	getApplicationMapBySignature: IMemoizedSelector<Map<ApplicationSignature, IApplication>, ITerminalState>

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonSchemaName, ISchemaVersion>>, ITerminalState>

	// Schema name contains the domain name as a prefix + '___'
	getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<SchemaName, ISchemaVersion>, ITerminalState>

	getAllSchemaVersionsByIds: IMemoizedSelector<ISchemaVersion[], ITerminalState>

	getLatestSchemaVersionsBySchemaIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getSchemas: IMemoizedSelector<ISchema[], ITerminalState>

	getAllColumns: IMemoizedSelector<ISchemaColumn[], ITerminalState>

	getAllEntities: IMemoizedSelector<ISchemaEntity[], ITerminalState>

	getAllRelations: IMemoizedSelector<ISchemaRelation[], ITerminalState>

	tearDown()
}

export class TerminalStore
	implements ITerminalStore {

	state: BehaviorSubject<ITerminalState>;

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationActorMapBySignature: IMemoizedSelector<Map<ApplicationSignature, IActor>, ITerminalState>

	getApplications: IMemoizedSelector<IApplication[], ITerminalState>

	getApplicationMapBySignature: IMemoizedSelector<Map<ApplicationSignature, IApplication>, ITerminalState>

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>;

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonSchemaName, ISchemaVersion>>, ITerminalState>;

	getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<SchemaName, ISchemaVersion>, ITerminalState>;

	getAllSchemaVersionsByIds: IMemoizedSelector<ISchemaVersion[], ITerminalState>;

	getLatestSchemaVersionsBySchemaIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>;

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;

	getSchemas: IMemoizedSelector<ISchema[], ITerminalState>;

	getAllColumns: IMemoizedSelector<ISchemaColumn[], ITerminalState>;

	getAllEntities: IMemoizedSelector<ISchemaEntity[], ITerminalState>;

	getAllRelations: IMemoizedSelector<ISchemaRelation[], ITerminalState>;

	async init(): Promise<void> {
		const selectorManager = await DI.db().get(SELECTOR_MANAGER);
		this.state = new BehaviorSubject<ITerminalState>({
			applicationActors: [],
			applications: [],
			domains: [],
			frameworkActor: null,
			nodesBySyncFrequency: new Map(),
			schemas: [],
			terminal: null,
		});

		this.getTerminalState = selectorManager.createRootSelector(this.state);
		this.getApplicationActors = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applicationActors)
		this.getApplicationActorMapBySignature = selectorManager.createSelector(this.getApplicationActors,
			applicationActors => {
				const applicationActorsBySignature: Map<ApplicationSignature, IActor> = new Map()
				for (const applicationActor of applicationActors) {
					applicationActorsBySignature.set(applicationActor.application.signature, applicationActor)
				}
				return applicationActorsBySignature
			})
		this.getApplicationMapBySignature = selectorManager.createSelector(this.getApplications,
			applications => {
				const applicationsBySignature: Map<ApplicationSignature, IApplication> = new Map()
				for (const application of applications) {
					applicationsBySignature.set(application.signature, application)
				}
				return applicationsBySignature
			})
		this.getDomains = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.domains);
		this.getFrameworkActor = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.frameworkActor)
		this.getLatestSchemaVersionMapByNames = selectorManager.createSelector(this.getDomains,
			domains => {
				const latestSchemaVersionMapByNames: Map<DomainName, Map<SchemaName, ISchemaVersion>> = new Map();

				for (const domain of domains) {
					const mapForDomain = ensureChildJsMap(latestSchemaVersionMapByNames, domain.name);
					for (const schema of domain.schemas) {
						mapForDomain.set(schema.name, schema.currentVersion[0].schemaVersion);
					}
				}

				return latestSchemaVersionMapByNames;
			});

		this.getLatestSchemaVersionMapBySchemaName = selectorManager.createSelector(
			this.getLatestSchemaVersionMapByNames, (
				latestSchemaVersionMapByNames: Map<DomainName, Map<JsonSchemaName, ISchemaVersion>>
			) => {
			const latestSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion> = new Map();

			for (const schemaVersionsForDomainName of latestSchemaVersionMapByNames.values()) {
				for (const schemaVersion of schemaVersionsForDomainName.values()) {
					latestSchemaVersionMapBySchemaName.set(schemaVersion.schema.name, schemaVersion);
				}
			}

			return latestSchemaVersionMapBySchemaName;
		});

		// getNodesBySyncFrequency = createSelector(this.getTerminalState,
		// 	terminal => terminal.nodesBySyncFrequency)

		this.getAllSchemaVersionsByIds = selectorManager.createSelector(this.getDomains,
			domains => {
				const allSchemaVersionsByIds: ISchemaVersion[] = [];

				for (const domain of domains) {
					for (const schema of domain.schemas) {
						for (const schemaVersion of schema.versions) {
							allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
						}
					}
				}

				return allSchemaVersionsByIds;
			});

		this.getLatestSchemaVersionsBySchemaIndexes = selectorManager.createSelector(this.getDomains,
			domains => {
				const latestSchemaVersionsBySchemaIndexes: ISchemaVersion[] = [];

				for (const domain of domains) {
					for (const schema of domain.schemas) {
						latestSchemaVersionsBySchemaIndexes[schema.index]
							= schema.currentVersion[0].schemaVersion;
					}
				}

				return latestSchemaVersionsBySchemaIndexes;
			});

		this.getSchemas = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.schemas);

		this.getAllEntities = selectorManager.createSelector(this.getLatestSchemaVersionsBySchemaIndexes,
			latestSchemaVersionsBySchemaIndexes => {
				const allEntities: ISchemaEntity[] = [];
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

		this.getAllColumns = selectorManager.createSelector(this.getAllEntities,
			allEntities => {
				const allColumns: ISchemaColumn[] = [];

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

		this.getAllRelations = selectorManager.createSelector(this.getAllEntities,
			allEntities => {
				const allRelations: ISchemaRelation[] = [];

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
