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
	ISelectorManager
} from '@airport/check-in';
import {
	ApplicationSignature,
	DomainName,
	ensureChildJsMap,
	JsonApplicationName,
	ApplicationName,
	FullApplicationName
} from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { Subject } from 'rxjs';
import { IApplicationInitializerState, InternalConnectorState, IReceiverState, ITerminalState, ITerminalStateContainer, ITransactionManagerState, IWebReceiverState } from './TerminalState';
import { ITransactionCredentials } from '../Credentials';
import { LastIds } from '@airport/apron';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
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

	getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>

	getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getLastIds: IMemoizedSelector<LastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>

	// Application name contains the domain name as a prefix + '___'
	getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>

	getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>

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

	getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>

	getApplications: IMemoizedSelector<IApplication[], ITerminalState>;

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>;

	getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>

	getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>

	getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>

	getLastIds: IMemoizedSelector<LastIds, ITerminalState>

	getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;

	getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>;

	getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;

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
		this.getApplicationActorMapByDomainAndApplicationNames = this.selectorManager.createSelector(this.getApplicationActors,
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
		this.getDomains = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.domains);
		this.getDomainMapByName = this.selectorManager.createSelector(this.getDomains,
			domains => {
				const domainsByName: Map<ApplicationSignature, IDomain> = new Map()
				for (const domain of domains) {
					domainsByName.set(domain.name, domain)
				}
				return domainsByName
			})
		this.getFrameworkActor = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.frameworkActor)
		this.getInternalConnector = this.selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.internalConnector)
		this.getLastIds = this.selectorManager.createSelector(this.getTerminalState,
			terminalState => terminalState.lastIds)
		this.getLatestApplicationVersionMapByNames = this.selectorManager.createSelector(this.getDomains,
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

		this.getLatestApplicationVersionMapByFullApplicationName = this.selectorManager.createSelector(
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

		this.getAllApplicationVersionsByIds = this.selectorManager.createSelector(this.getDomains,
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

		this.getLatestApplicationVersionsByApplicationIndexes = this.selectorManager.createSelector(this.getDomains,
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

		this.getApplications = this.selectorManager.createSelector(this.getTerminalState,
			terminal => terminal.applications);

		this.getAllEntities = this.selectorManager.createSelector(this.getLatestApplicationVersionsByApplicationIndexes,
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

		this.getAllColumns = this.selectorManager.createSelector(this.getAllEntities,
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

		this.getAllRelations = this.selectorManager.createSelector(this.getAllEntities,
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
