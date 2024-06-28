import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	Domain_Name,
	JsonApplication_Name,
	Application_Name,
	Application_FullName,
	IDatastructureUtils,
	IApplicationVersion,
	DbColumn,
	DbEntity,
	DbRelation,
	IActor,
	IApplication,
	IDomain,
	ITerminal,
	Repository_LocalId,
	Repository_GUID
} from '@airport/ground-control';
import { Subject, Subscription } from 'rxjs';
import {
	IApplicationInitializerState,
	InternalConnectorState,
	IReceiverState,
	ISequenceGeneratorState,
	ITerminalState,
	ITerminalStateContainer,
	ITransactionManagerState,
	IUIState,
	IWebReceiverState
} from './TerminalState';
import { IApiCredentials } from '../ICredentials';
import { IMemoizedSelector, ISelectorManager } from './SelectorManager';
import { ILastIds } from '@airport/air-traffic-control';
import { ITransaction } from '../transaction/ITransaction';
import { CachedSQLQuery, IFieldMapped, SerializedJSONQuery } from '../processing/IActiveQueries';

export interface IPendingTransaction {
	context,
	credentials: IApiCredentials
	parentTransaction: ITransaction,
	reject
	resolve
}

export interface ITerminalStore<FM extends IFieldMapped = IFieldMapped> {

	state: Subject<ITerminalState<FM>>

	getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>

	getAllColumns: IMemoizedSelector<DbColumn[], ITerminalState>

	getAllEntities: IMemoizedSelector<DbEntity[], ITerminalState>

	getAllRelations: IMemoizedSelector<DbRelation[], ITerminalState>

	getApiSubscriptionMap: IMemoizedSelector<Map<string, Subscription>, ITerminalState>

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationMapByFullName: IMemoizedSelector<Map<Application_FullName, IApplication>, ITerminalState>

	getApplications: IMemoizedSelector<IApplication[], ITerminalState>

	getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>

	getApplicationActorMapByDomainAndApplication_Names: IMemoizedSelector<Map<Domain_Name, Map<Application_Name, IActor[]>>, ITerminalState>

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>

	getDomainMapByName: IMemoizedSelector<Map<Domain_Name, IDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getIsSyncNode: IMemoizedSelector<boolean, ITerminalState>

	getLastIds: IMemoizedSelector<ILastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<Domain_Name, Map<JsonApplication_Name, IApplicationVersion>>, ITerminalState>

	// Application name contains the domain name as a prefix + '___'
	getLatestApplicationVersionMapByApplication_FullName: IMemoizedSelector<Map<Application_FullName, IApplicationVersion>, ITerminalState>

	getLatestApplicationVersionsByApplication_Indexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>

	getQueries: IMemoizedSelector<Map<SerializedJSONQuery, CachedSQLQuery<FM>>, ITerminalState>

	getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>

	getRepositoryGUIDMapByLocalIds: IMemoizedSelector<Map<Repository_LocalId, Repository_GUID>, ITerminalState>

	getRepositoryLocalIdMapByGUIDs: IMemoizedSelector<Map<Repository_GUID, Repository_LocalId>, ITerminalState>

	getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>

	getTerminal: IMemoizedSelector<ITerminal, ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>

	getUI: IMemoizedSelector<IUIState, ITerminalState>

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

	getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;

	getAllColumns: IMemoizedSelector<DbColumn[], ITerminalState>;

	getAllEntities: IMemoizedSelector<DbEntity[], ITerminalState>;

	getAllRelations: IMemoizedSelector<DbRelation[], ITerminalState>;

	getApiSubscriptionMap: IMemoizedSelector<Map<string, Subscription>, ITerminalState>

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>

	getApplicationActorMapByDomainAndApplication_Names: IMemoizedSelector<Map<Domain_Name, Map<Application_Name, IActor[]>>, ITerminalState>

	getApplicationMapByFullName: IMemoizedSelector<Map<Application_FullName, IApplication>, ITerminalState>

	getApplications: IMemoizedSelector<IApplication[], ITerminalState>;

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>;

	getDomainMapByName: IMemoizedSelector<Map<Domain_Name, IDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getIsSyncNode: IMemoizedSelector<boolean, ITerminalState>

	getLastIds: IMemoizedSelector<ILastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<Domain_Name, Map<JsonApplication_Name, IApplicationVersion>>, ITerminalState>;

	getLatestApplicationVersionMapByApplication_FullName: IMemoizedSelector<Map<Application_FullName, IApplicationVersion>, ITerminalState>;

	getLatestApplicationVersionsByApplication_Indexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;

	getQueries: IMemoizedSelector<Map<SerializedJSONQuery, CachedSQLQuery<FM>>, ITerminalState>

	getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>

	getRepositoryGUIDMapByLocalIds: IMemoizedSelector<Map<Repository_LocalId, Repository_GUID>, ITerminalState>

	getRepositoryLocalIdMapByGUIDs: IMemoizedSelector<Map<Repository_GUID, Repository_LocalId>, ITerminalState>

	getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>

	getTerminal: IMemoizedSelector<ITerminal, ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState<FM>, ITerminalState<FM>>

	getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>

	getUI: IMemoizedSelector<IUIState, ITerminalState>

	getWebReceiver: IMemoizedSelector<IWebReceiverState, ITerminalState>

	init(): void {
		this.getTerminalState = this.selectorManager.createRootSelector(this.state);
		this.getApiSubscriptionMap = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.apiSubscriptionMap)
		this.getApplicationActors = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applicationActors)
		this.getApplicationInitializer = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applicationInitializer)
		this.getApplicationActorMapByDomainAndApplication_Names = this.selectorManager.createSelector(this.getApplicationActors,
			applicationActors => {
				const applicationActorsByDomainAndApplication_Names: Map<Domain_Name, Map<Application_Name, IActor[]>> = new Map()
				for (const applicationActor of applicationActors) {
					const applicationActorMapForDomain = this.datastructureUtils.ensureChildJsMap(
						applicationActorsByDomainAndApplication_Names, applicationActor.application.domain.name)
					let actorsForApplication = applicationActorMapForDomain
						.get(applicationActor.application.name)
					if (!actorsForApplication) {
						actorsForApplication = []
						applicationActorMapForDomain.set(
							applicationActor.application.name, actorsForApplication)
					}
					actorsForApplication.push(applicationActor)
				}
				return applicationActorsByDomainAndApplication_Names
			})
		this.getDomains = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.domains);
		this.getDomainMapByName = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const domainsByName: Map<Domain_Name, IDomain> = new Map()
				for (const domain of domains) {
					domainsByName.set(domain.name, domain)
				}
				return domainsByName
			})
		this.getFrameworkActor = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.frameworkActor)
		this.getInternalConnector = this.selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.internalConnector)
		this.getIsSyncNode = this.selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.isSyncNode)
		this.getLastIds = this.selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.lastIds)
		this.getLatestApplicationVersionMapByNames = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const latestApplicationVersionMapByNames: Map<Domain_Name, Map<Application_Name, IApplicationVersion>> = new Map();

				for (const domain of domains) {
					const mapForDomain = this.datastructureUtils.ensureChildJsMap(
						latestApplicationVersionMapByNames, domain.name);
					for (const application of domain.applications) {
						mapForDomain.set(application.name, application.currentVersion[0].applicationVersion);
					}
				}

				return latestApplicationVersionMapByNames;
			});

		this.getLatestApplicationVersionMapByApplication_FullName = this.selectorManager.createSelector(
			this.getLatestApplicationVersionMapByNames, (
				latestApplicationVersionMapByNames: Map<Domain_Name, Map<JsonApplication_Name, IApplicationVersion>>
			) => {
			const latestApplicationVersionMapByApplication_FullName: Map<Application_FullName, IApplicationVersion> = new Map();

			for (const applicationVersionsForDomain_Name of latestApplicationVersionMapByNames.values()) {
				for (const applicationVersion of applicationVersionsForDomain_Name.values()) {
					latestApplicationVersionMapByApplication_FullName.set(applicationVersion.application.fullName, applicationVersion);
				}
			}

			return latestApplicationVersionMapByApplication_FullName;
		});

		this.getAllApplicationVersionsByIds = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const allApplicationVersionsByIds: IApplicationVersion[] = [];

				for (const domain of domains) {
					for (const application of domain.applications) {
						for (const applicationVersion of application.versions) {
							allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion;
						}
					}
				}

				return allApplicationVersionsByIds;
			});

		this.getLatestApplicationVersionsByApplication_Indexes = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const latestApplicationVersionsByApplication_Indexes: IApplicationVersion[] = [];

				for (const domain of domains) {
					for (const application of domain.applications) {
						latestApplicationVersionsByApplication_Indexes[application.index]
							= application.currentVersion[0].applicationVersion;
					}
				}

				return latestApplicationVersionsByApplication_Indexes;
			});

		this.getApplicationMapByFullName = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applicationMapByFullName);

		this.getApplications = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applications);

		this.getAllEntities = this.selectorManager.createSelector(this.getLatestApplicationVersionsByApplication_Indexes,
			latestApplicationVersionsByApplication_Indexes => {
				const allEntities: DbEntity[] = [];
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

		this.getUI = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.ui)

		this.getWebReceiver = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.webReceiver)
	}

	tearDown() {
	}
}
