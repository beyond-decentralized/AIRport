import {
	IDomain,
	IApplication,
	IApplicationColumn,
	IApplicationEntity,
	IApplicationRelation,
	IApplicationVersion
} from '@airport/airspace';
import {
	IMemoizedSelector,
	ISelectorManager,
	LastIds
} from '@airport/apron';
import { ILocalAPIRequest } from '@airport/aviation-communication';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	Application_Signature,
	Domain_Name,
	ensureChildJsMap,
	JsonApplication_Name,
	Application_Name,
	FullApplication_Name
} from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { Subject } from 'rxjs';
import {
	IApplicationInitializerState,
	InternalConnectorState,
	IReceiverState,
	ITerminalState,
	ITerminalStateContainer,
	ITransactionManagerState,
	IWebReceiverState
} from './TerminalState';
import { ITransactionCredentials } from '../Credentials';
import { ISequenceGeneratorState } from '..';

export interface IMessageInRecord {
	message: ILocalAPIRequest<'FromClientRedirected'>
	reject
	resolve
}
export interface IPendingTransaction {
	context,
	credentials: ITransactionCredentials
	reject
	resolve
}

export interface ITerminalStore {

	state: Subject<ITerminalState>

	getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>

	getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>

	getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>

	getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>

	getApplications: IMemoizedSelector<IApplication[], ITerminalState>

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>

	getApplicationActorMapByDomainAndApplication_Names: IMemoizedSelector<Map<Domain_Name, Map<Application_Name, IActor[]>>, ITerminalState>

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>

	getDomainMapByName: IMemoizedSelector<Map<Domain_Name, IDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getIsServer: IMemoizedSelector<boolean, ITerminalState>

	getLastIds: IMemoizedSelector<LastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<Domain_Name, Map<JsonApplication_Name, IApplicationVersion>>, ITerminalState>

	// Application name contains the domain name as a prefix + '___'
	getLatestApplicationVersionMapByFullApplication_Name: IMemoizedSelector<Map<FullApplication_Name, IApplicationVersion>, ITerminalState>

	getLatestApplicationVersionsByApplication_Indexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>

	getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>

	getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>

	getWebReceiver: IMemoizedSelector<IWebReceiverState, ITerminalState>

	tearDown()
}

@Injected()
export class TerminalStore
	implements ITerminalStore {

	@Inject()
	selectorManager: ISelectorManager

	@Inject()
	terminalState: ITerminalStateContainer

	get state(): Subject<ITerminalState> {
		return this.terminalState.terminalState
	}

	getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;

	getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>;

	getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>;

	getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>;

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>

	getApplicationActorMapByDomainAndApplication_Names: IMemoizedSelector<Map<Domain_Name, Map<Application_Name, IActor[]>>, ITerminalState>

	getApplications: IMemoizedSelector<IApplication[], ITerminalState>;

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>;

	getDomainMapByName: IMemoizedSelector<Map<Domain_Name, IDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getIsServer: IMemoizedSelector<boolean, ITerminalState>

	getLastIds: IMemoizedSelector<LastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<Domain_Name, Map<JsonApplication_Name, IApplicationVersion>>, ITerminalState>;

	getLatestApplicationVersionMapByFullApplication_Name: IMemoizedSelector<Map<FullApplication_Name, IApplicationVersion>, ITerminalState>;

	getLatestApplicationVersionsByApplication_Indexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;

	getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>

	getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>

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
					const applicationActorMapForDomain = ensureChildJsMap(applicationActorsByDomainAndApplication_Names,
						applicationActor.application.domain.name)
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
				const domainsByName: Map<Application_Signature, IDomain> = new Map()
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
				const latestApplicationVersionMapByNames: Map<Domain_Name, Map<Application_Name, IApplicationVersion>> = new Map();

				for (const domain of domains) {
					const mapForDomain = ensureChildJsMap(latestApplicationVersionMapByNames, domain.name);
					for (const application of domain.applications) {
						mapForDomain.set(application.name, application.currentVersion[0].applicationVersion);
					}
				}

				return latestApplicationVersionMapByNames;
			});

		this.getLatestApplicationVersionMapByFullApplication_Name = this.selectorManager.createSelector(
			this.getLatestApplicationVersionMapByNames, (
				latestApplicationVersionMapByNames: Map<Domain_Name, Map<JsonApplication_Name, IApplicationVersion>>
			) => {
			const latestApplicationVersionMapByFullApplication_Name: Map<FullApplication_Name, IApplicationVersion> = new Map();

			for (const applicationVersionsForDomain_Name of latestApplicationVersionMapByNames.values()) {
				for (const applicationVersion of applicationVersionsForDomain_Name.values()) {
					latestApplicationVersionMapByFullApplication_Name.set(applicationVersion.application.fullName, applicationVersion);
				}
			}

			return latestApplicationVersionMapByFullApplication_Name;
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

		this.getApplications = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applications);

		this.getAllEntities = this.selectorManager.createSelector(this.getLatestApplicationVersionsByApplication_Indexes,
			latestApplicationVersionsByApplication_Indexes => {
				const allEntities: IApplicationEntity[] = [];
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
				const allColumns: IApplicationColumn[] = [];

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
				const allRelations: IApplicationRelation[] = [];

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

		this.getTransactionManager = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.transactionManager)

		this.getWebReceiver = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.webReceiver)
	}

	tearDown() {
	}
}
