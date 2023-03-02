import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	DbDomain_Name,
	JsonApplication_Name,
	DbApplication_Name,
	DbApplication_FullName,
	IDatastructureUtils,
	DbApplicationVersion,
	DbColumn,
	DbEntity,
	DbRelation,
	IActor,
	DbApplication,
	DbDomain,
	ITerminal,
	Repository_LocalId,
	Repository_GUID
} from '@airport/ground-control';
import { Subject } from 'rxjs';
import {
	IApplicationInitializerState,
	InternalConnectorState,
	IReceiverState,
	ISequenceGeneratorState,
	ITerminalState,
	ITerminalStateContainer,
	ITransactionManagerState,
	IWebReceiverState
} from './TerminalState';
import { ITransactionCredentials } from '../ICredentials';
import { IMemoizedSelector, ISelectorManager } from './SelectorManager';
import { ILastIds } from '@airport/air-traffic-control';
import { CachedSQLQuery, IFieldMapped, SerializedJSONQuery } from '../terminal-map.index';

export interface IPendingTransaction {
	context,
	credentials: ITransactionCredentials
	reject
	resolve
}

export interface ITerminalStore<FM extends IFieldMapped = IFieldMapped> {

	state: Subject<ITerminalState>

	getAllApplicationVersionsByIds: IMemoizedSelector<DbApplicationVersion[], ITerminalState>

	getAllColumns: IMemoizedSelector<DbColumn[], ITerminalState>

	getAllEntities: IMemoizedSelector<DbEntity[], ITerminalState>

	getAllRelations: IMemoizedSelector<DbRelation[], ITerminalState>

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationMapByFullName: IMemoizedSelector<Map<DbApplication_FullName, DbApplication>, ITerminalState>

	getApplications: IMemoizedSelector<DbApplication[], ITerminalState>

	getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>

	getApplicationActorMapByDomainAndDbApplication_Names: IMemoizedSelector<Map<DbDomain_Name, Map<DbApplication_Name, IActor[]>>, ITerminalState>

	getDomains: IMemoizedSelector<DbDomain[], ITerminalState>

	getDomainMapByName: IMemoizedSelector<Map<DbDomain_Name, DbDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getIsServer: IMemoizedSelector<boolean, ITerminalState>

	getLastIds: IMemoizedSelector<ILastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DbDomain_Name, Map<JsonApplication_Name, DbApplicationVersion>>, ITerminalState>

	// Application name contains the domain name as a prefix + '___'
	getLatestApplicationVersionMapByDbApplication_FullName: IMemoizedSelector<Map<DbApplication_FullName, DbApplicationVersion>, ITerminalState>

	getLatestApplicationVersionsByDbApplication_Indexes: IMemoizedSelector<DbApplicationVersion[], ITerminalState>

	getQueries: IMemoizedSelector<Map<SerializedJSONQuery, CachedSQLQuery<FM>>, ITerminalState>

	getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>

	getRepositoryGUIDMapByLocalIds: IMemoizedSelector<Map<Repository_LocalId, Repository_GUID>, ITerminalState>

	getRepositoryLocalIdMapByGUIDs: IMemoizedSelector<Map<Repository_GUID, Repository_LocalId>, ITerminalState>

	getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>

	getTerminal: IMemoizedSelector<ITerminal, ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>

	getWebReceiver: IMemoizedSelector<IWebReceiverState, ITerminalState>

	tearDown()
}

@Injected()
export class TerminalStore<FM extends IFieldMapped = IFieldMapped>
	implements ITerminalStore<FM> {

	static sharedAcrossInjectionScopes = true

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	selectorManager: ISelectorManager

	@Inject()
	terminalState: ITerminalStateContainer<FM>

	get state(): Subject<ITerminalState<FM>> {
		return this.terminalState.terminalState
	}

	getAllApplicationVersionsByIds: IMemoizedSelector<DbApplicationVersion[], ITerminalState>;

	getAllColumns: IMemoizedSelector<DbColumn[], ITerminalState>;

	getAllEntities: IMemoizedSelector<DbEntity[], ITerminalState>;

	getAllRelations: IMemoizedSelector<DbRelation[], ITerminalState>;

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>

	getApplicationActorMapByDomainAndDbApplication_Names: IMemoizedSelector<Map<DbDomain_Name, Map<DbApplication_Name, IActor[]>>, ITerminalState>

	getApplicationMapByFullName: IMemoizedSelector<Map<DbApplication_FullName, DbApplication>, ITerminalState>

	getApplications: IMemoizedSelector<DbApplication[], ITerminalState>;

	getDomains: IMemoizedSelector<DbDomain[], ITerminalState>;

	getDomainMapByName: IMemoizedSelector<Map<DbDomain_Name, DbDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getIsServer: IMemoizedSelector<boolean, ITerminalState>

	getLastIds: IMemoizedSelector<ILastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DbDomain_Name, Map<JsonApplication_Name, DbApplicationVersion>>, ITerminalState>;

	getLatestApplicationVersionMapByDbApplication_FullName: IMemoizedSelector<Map<DbApplication_FullName, DbApplicationVersion>, ITerminalState>;

	getLatestApplicationVersionsByDbApplication_Indexes: IMemoizedSelector<DbApplicationVersion[], ITerminalState>;

	getQueries: IMemoizedSelector<Map<SerializedJSONQuery, CachedSQLQuery<FM>>, ITerminalState>

	getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>

	getRepositoryGUIDMapByLocalIds: IMemoizedSelector<Map<Repository_LocalId, Repository_GUID>, ITerminalState>

	getRepositoryLocalIdMapByGUIDs: IMemoizedSelector<Map<Repository_GUID, Repository_LocalId>, ITerminalState>

	getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>

	getTerminal: IMemoizedSelector<ITerminal, ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState<FM>, ITerminalState<FM>>

	getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>

	getWebReceiver: IMemoizedSelector<IWebReceiverState, ITerminalState>

	init(): void {
		this.getTerminalState = this.selectorManager.createRootSelector(this.state);
		this.getApplicationActors = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applicationActors)
		this.getApplicationInitializer = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applicationInitializer)
		this.getApplicationActorMapByDomainAndDbApplication_Names = this.selectorManager.createSelector(this.getApplicationActors,
			applicationActors => {
				const applicationActorsByDomainAndDbApplication_Names: Map<DbDomain_Name, Map<DbApplication_Name, IActor[]>> = new Map()
				for (const applicationActor of applicationActors) {
					const applicationActorMapForDomain = this.datastructureUtils.ensureChildJsMap(
						applicationActorsByDomainAndDbApplication_Names, applicationActor.application.domain.name)
					let actorsForApplication = applicationActorMapForDomain
						.get(applicationActor.application.name)
					if (!actorsForApplication) {
						actorsForApplication = []
						applicationActorMapForDomain.set(
							applicationActor.application.name, actorsForApplication)
					}
					actorsForApplication.push(applicationActor)
				}
				return applicationActorsByDomainAndDbApplication_Names
			})
		this.getDomains = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.domains);
		this.getDomainMapByName = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const domainsByName: Map<DbDomain_Name, DbDomain> = new Map()
				for (const domain of domains) {
					domainsByName.set(domain.name, domain)
				}
				return domainsByName
			})
		this.getFrameworkActor = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.frameworkActor)
		this.getInternalConnector = this.selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.internalConnector)
		this.getIsServer = this.selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.isServer)
		this.getLastIds = this.selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.lastIds)
		this.getLatestApplicationVersionMapByNames = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const latestApplicationVersionMapByNames: Map<DbDomain_Name, Map<DbApplication_Name, DbApplicationVersion>> = new Map();

				for (const domain of domains) {
					const mapForDomain = this.datastructureUtils.ensureChildJsMap(
						latestApplicationVersionMapByNames, domain.name);
					for (const application of domain.applications) {
						mapForDomain.set(application.name, application.currentVersion[0].applicationVersion);
					}
				}

				return latestApplicationVersionMapByNames;
			});

		this.getLatestApplicationVersionMapByDbApplication_FullName = this.selectorManager.createSelector(
			this.getLatestApplicationVersionMapByNames, (
				latestApplicationVersionMapByNames: Map<DbDomain_Name, Map<JsonApplication_Name, DbApplicationVersion>>
			) => {
			const latestApplicationVersionMapByDbApplication_FullName: Map<DbApplication_FullName, DbApplicationVersion> = new Map();

			for (const applicationVersionsForDomain_Name of latestApplicationVersionMapByNames.values()) {
				for (const applicationVersion of applicationVersionsForDomain_Name.values()) {
					latestApplicationVersionMapByDbApplication_FullName.set(applicationVersion.application.fullName, applicationVersion);
				}
			}

			return latestApplicationVersionMapByDbApplication_FullName;
		});

		this.getAllApplicationVersionsByIds = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const allApplicationVersionsByIds: DbApplicationVersion[] = [];

				for (const domain of domains) {
					for (const application of domain.applications) {
						for (const applicationVersion of application.versions) {
							allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion;
						}
					}
				}

				return allApplicationVersionsByIds;
			});

		this.getLatestApplicationVersionsByDbApplication_Indexes = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const latestApplicationVersionsByDbApplication_Indexes: DbApplicationVersion[] = [];

				for (const domain of domains) {
					for (const application of domain.applications) {
						latestApplicationVersionsByDbApplication_Indexes[application.index]
							= application.currentVersion[0].applicationVersion;
					}
				}

				return latestApplicationVersionsByDbApplication_Indexes;
			});

		this.getApplicationMapByFullName = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applicationMapByFullName);

		this.getApplications = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applications);

		this.getAllEntities = this.selectorManager.createSelector(this.getLatestApplicationVersionsByDbApplication_Indexes,
			latestApplicationVersionsByDbApplication_Indexes => {
				const allEntities: DbEntity[] = [];
				for (const latestApplicationVersion of latestApplicationVersionsByDbApplication_Indexes) {
					if (!latestApplicationVersion) {
						continue;
					}
					for (const entity of latestApplicationVersion.entities) {
						allEntities[entity._localId] = entity;
					}
				}

				return allEntities;
			});

		this.getAllColumns = this.selectorManager.createSelector(this.getAllEntities,
			allEntities => {
				const allColumns: DbColumn[] = [];

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

		this.getAllRelations = this.selectorManager.createSelector(this.getAllEntities,
			allEntities => {
				const allRelations: DbRelation[] = [];

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

		this.getQueries = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.queries)

		this.getReceiver = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.receiver)

		this.getRepositoryGUIDMapByLocalIds = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.repositoryGUIDMapByLocalIds)

		this.getRepositoryLocalIdMapByGUIDs = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.repositoryLocalIdMapByGUIDs)

		this.getSequenceGenerator = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.sequenceGenerator)

		this.getTerminal = this.selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.terminal)

		this.getTransactionManager = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.transactionManager)

		this.getWebReceiver = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.webReceiver)
	}

	tearDown() {
	}
}
