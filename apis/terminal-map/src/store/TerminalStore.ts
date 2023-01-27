import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	Application_Signature,
	Domain_Name,
	JsonApplication_Name,
	Application_Name,
	Application_FullName,
	IDatastructureUtils,
	DbApplicationVersion,
	DbColumn,
	DbEntity,
	DbRelation,
	IActor,
	DbApplication,
	DbDomain,
	ITerminal
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
import { ITransactionCredentials } from '../Credentials';
import { IMemoizedSelector, ISelectorManager } from './Selector';
import { LastIds } from '@airport/air-traffic-control';

export interface IPendingTransaction {
	context,
	credentials: ITransactionCredentials
	reject
	resolve
}

export interface ITerminalStore {

	state: Subject<ITerminalState>

	getAllApplicationVersionsByIds: IMemoizedSelector<DbApplicationVersion[], ITerminalState>

	getAllColumns: IMemoizedSelector<DbColumn[], ITerminalState>

	getAllEntities: IMemoizedSelector<DbEntity[], ITerminalState>

	getAllRelations: IMemoizedSelector<DbRelation[], ITerminalState>

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationMapByFullName: IMemoizedSelector<Map<Application_FullName, DbApplication>, ITerminalState>

	getApplications: IMemoizedSelector<DbApplication[], ITerminalState>

	getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>

	getApplicationActorMapByDomainAndApplication_Names: IMemoizedSelector<Map<Domain_Name, Map<Application_Name, IActor[]>>, ITerminalState>

	getDomains: IMemoizedSelector<DbDomain[], ITerminalState>

	getDomainMapByName: IMemoizedSelector<Map<Domain_Name, DbDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getIsServer: IMemoizedSelector<boolean, ITerminalState>

	getLastIds: IMemoizedSelector<LastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<Domain_Name, Map<JsonApplication_Name, DbApplicationVersion>>, ITerminalState>

	// Application name contains the domain name as a prefix + '___'
	getLatestApplicationVersionMapByApplication_FullName: IMemoizedSelector<Map<Application_FullName, DbApplicationVersion>, ITerminalState>

	getLatestApplicationVersionsByApplication_Indexes: IMemoizedSelector<DbApplicationVersion[], ITerminalState>

	getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>

	getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>

	getTerminal: IMemoizedSelector<ITerminal, ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>

	getWebReceiver: IMemoizedSelector<IWebReceiverState, ITerminalState>

	tearDown()
}

@Injected()
export class TerminalStore
	implements ITerminalStore {

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	selectorManager: ISelectorManager

	@Inject()
	terminalState: ITerminalStateContainer

	get state(): Subject<ITerminalState> {
		return this.terminalState.terminalState
	}

	getAllApplicationVersionsByIds: IMemoizedSelector<DbApplicationVersion[], ITerminalState>;

	getAllColumns: IMemoizedSelector<DbColumn[], ITerminalState>;

	getAllEntities: IMemoizedSelector<DbEntity[], ITerminalState>;

	getAllRelations: IMemoizedSelector<DbRelation[], ITerminalState>;

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>

	getApplicationActorMapByDomainAndApplication_Names: IMemoizedSelector<Map<Domain_Name, Map<Application_Name, IActor[]>>, ITerminalState>

	getApplicationMapByFullName: IMemoizedSelector<Map<Application_FullName, DbApplication>, ITerminalState>

	getApplications: IMemoizedSelector<DbApplication[], ITerminalState>;

	getDomains: IMemoizedSelector<DbDomain[], ITerminalState>;

	getDomainMapByName: IMemoizedSelector<Map<Domain_Name, DbDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getIsServer: IMemoizedSelector<boolean, ITerminalState>

	getLastIds: IMemoizedSelector<LastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<Domain_Name, Map<JsonApplication_Name, DbApplicationVersion>>, ITerminalState>;

	getLatestApplicationVersionMapByApplication_FullName: IMemoizedSelector<Map<Application_FullName, DbApplicationVersion>, ITerminalState>;

	getLatestApplicationVersionsByApplication_Indexes: IMemoizedSelector<DbApplicationVersion[], ITerminalState>;

	getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>

	getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>

	getTerminal: IMemoizedSelector<ITerminal, ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>

	getWebReceiver: IMemoizedSelector<IWebReceiverState, ITerminalState>

	async init(): Promise<void> {
		this.getTerminalState = this.selectorManager.createRootSelector(this.state);
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
				const domainsByName: Map<Application_Signature, DbDomain> = new Map()
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
				const latestApplicationVersionMapByNames: Map<Domain_Name, Map<Application_Name, DbApplicationVersion>> = new Map();

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
				latestApplicationVersionMapByNames: Map<Domain_Name, Map<JsonApplication_Name, DbApplicationVersion>>
			) => {
			const latestApplicationVersionMapByApplication_FullName: Map<Application_FullName, DbApplicationVersion> = new Map();

			for (const applicationVersionsForDomain_Name of latestApplicationVersionMapByNames.values()) {
				for (const applicationVersion of applicationVersionsForDomain_Name.values()) {
					latestApplicationVersionMapByApplication_FullName.set(applicationVersion.application.fullName, applicationVersion);
				}
			}

			return latestApplicationVersionMapByApplication_FullName;
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

		this.getLatestApplicationVersionsByApplication_Indexes = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const latestApplicationVersionsByApplication_Indexes: DbApplicationVersion[] = [];

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

		this.getReceiver = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.receiver)

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
