import {
	IDomain,
	IApplication,
	IApplicationColumn,
	IApplicationEntity,
	IApplicationRelation,
	IApplicationVersion
} from '@airport/airspace';
import { ILocalAPIRequest } from '@airport/aviation-communication';
import {
	IMemoizedSelector,
	SELECTOR_MANAGER
} from '@airport/check-in';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import {
	ApplicationSignature,
	DomainName,
	ensureChildJsMap,
	JsonApplicationName,
	ApplicationName,
	FullApplicationName
} from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { Subject, Subscription } from 'rxjs';
import { TERMINAL_STORE } from '../tokens';
import { ITerminalState } from './TerminalState';
import { internalTerminalState } from './theState';
import { ITransaction } from '../transaction/ITransaction';
import { ITransactionCredentials } from '../Credentials';


export interface InternalConnectorStore {
	dbName: string
	internalCredentials: ITransactionCredentials
	serverUrl: string
}
export interface IMessageInRecord {
	message: ILocalAPIRequest<'FromClientRedirected'>
	reject
	resolve
}
export interface IPendingTransaction {
	credentials: ITransactionCredentials
	reject
	resolve
}

export interface IReceiverStore {
	initializingApps: Set<FullApplicationName>
	initializedApps: Set<FullApplicationName>
}

export interface ITransactionManagerStore {
	pendingTransactionQueue: IPendingTransaction[]
	transactionInProgressMap: Map<string, ITransaction>
	rootTransactionInProgressMap: Map<string, ITransaction>
}

export interface IWebReceiverStore {
	domainPrefix: string
	localDomain: string
	mainDomainFragments: string[]
	onClientMessageCallback: (
		message: any
	) => void
	pendingApplicationCounts: Map<string, number>
	pendingHostCounts: Map<string, number>
	pendingInterAppApiCallMessageMap: Map<string, IMessageInRecord>
	subsriptionMap: Map<string, Map<string, Subscription>>
}

export interface ITerminalStore {

	state: Subject<ITerminalState>

	getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>

	getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>

	getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>

	getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>

	getApplications: IMemoizedSelector<IApplication[], ITerminalState>

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>

	getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorStore, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>

	// Application name contains the domain name as a prefix + '___'
	getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>

	getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>

	getReceiver: IMemoizedSelector<IReceiverStore, ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getTransactionManager: IMemoizedSelector<ITransactionManagerStore, ITerminalState>

	getWebReceiver: IMemoizedSelector<IWebReceiverStore, ITerminalState>

	tearDown()
}

export class TerminalStore
	implements ITerminalStore {

	state: Subject<ITerminalState>;

	getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;

	getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>;

	getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>;

	getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>;

	getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>

	getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>

	getApplications: IMemoizedSelector<IApplication[], ITerminalState>;

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>;

	getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorStore, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;

	getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>;

	getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;

	getReceiver: IMemoizedSelector<IReceiverStore, ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getTransactionManager: IMemoizedSelector<ITransactionManagerStore, ITerminalState>

	getWebReceiver: IMemoizedSelector<IWebReceiverStore, ITerminalState>

	async init(): Promise<void> {
		const selectorManager = await DEPENDENCY_INJECTION.db().get(SELECTOR_MANAGER);
		this.state = internalTerminalState;

		this.getTerminalState = selectorManager.createRootSelector(this.state);
		this.getApplicationActors = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applicationActors)
		this.getApplicationActorMapByDomainAndApplicationNames = selectorManager.createSelector(this.getApplicationActors,
			applicationActors => {
				const applicationActorsByDomainAndApplicationNames: Map<DomainName, Map<ApplicationName, IActor[]>> = new Map()
				for (const applicationActor of applicationActors) {
					const applicationActorMapForDomain = ensureChildJsMap(applicationActorsByDomainAndApplicationNames,
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
				return applicationActorsByDomainAndApplicationNames
			})
		this.getDomains = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.domains);
		this.getDomainMapByName = selectorManager.createSelector(this.getDomains,
			domains => {
				const domainsByName: Map<ApplicationSignature, IDomain> = new Map()
				for (const domain of domains) {
					domainsByName.set(domain.name, domain)
				}
				return domainsByName
			})
		this.getFrameworkActor = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.frameworkActor)
		this.getInternalConnector = selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.internalConnector)
		this.getLatestApplicationVersionMapByNames = selectorManager.createSelector(this.getDomains,
			domains => {
				const latestApplicationVersionMapByNames: Map<DomainName, Map<ApplicationName, IApplicationVersion>> = new Map();

				for (const domain of domains) {
					const mapForDomain = ensureChildJsMap(latestApplicationVersionMapByNames, domain.name);
					for (const application of domain.applications) {
						mapForDomain.set(application.name, application.currentVersion[0].applicationVersion);
					}
				}

				return latestApplicationVersionMapByNames;
			});

		this.getLatestApplicationVersionMapByFullApplicationName = selectorManager.createSelector(
			this.getLatestApplicationVersionMapByNames, (
				latestApplicationVersionMapByNames: Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>
			) => {
			const latestApplicationVersionMapByFullApplicationName: Map<FullApplicationName, IApplicationVersion> = new Map();

			for (const applicationVersionsForDomainName of latestApplicationVersionMapByNames.values()) {
				for (const applicationVersion of applicationVersionsForDomainName.values()) {
					latestApplicationVersionMapByFullApplicationName.set(applicationVersion.application.fullName, applicationVersion);
				}
			}

			return latestApplicationVersionMapByFullApplicationName;
		});

		this.getAllApplicationVersionsByIds = selectorManager.createSelector(this.getDomains,
			domains => {
				const allApplicationVersionsByIds: IApplicationVersion[] = [];

				for (const domain of domains) {
					for (const application of domain.applications) {
						for (const applicationVersion of application.versions) {
							allApplicationVersionsByIds[applicationVersion.id] = applicationVersion;
						}
					}
				}

				return allApplicationVersionsByIds;
			});

		this.getLatestApplicationVersionsByApplicationIndexes = selectorManager.createSelector(this.getDomains,
			domains => {
				const latestApplicationVersionsByApplicationIndexes: IApplicationVersion[] = [];

				for (const domain of domains) {
					for (const application of domain.applications) {
						latestApplicationVersionsByApplicationIndexes[application.index]
							= application.currentVersion[0].applicationVersion;
					}
				}

				return latestApplicationVersionsByApplicationIndexes;
			});

		this.getApplications = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applications);

		this.getAllEntities = selectorManager.createSelector(this.getLatestApplicationVersionsByApplicationIndexes,
			latestApplicationVersionsByApplicationIndexes => {
				const allEntities: IApplicationEntity[] = [];
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

		this.getAllColumns = selectorManager.createSelector(this.getAllEntities,
			allEntities => {
				const allColumns: IApplicationColumn[] = [];

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
				const allRelations: IApplicationRelation[] = [];

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

		this.getReceiver = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.receiver)

		this.getTransactionManager = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.transactionManager)

		this.getWebReceiver = selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.webReceiver)
	}

	tearDown() {
	}
}

DEPENDENCY_INJECTION.set(TERMINAL_STORE, TerminalStore);
