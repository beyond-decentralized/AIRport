import {
	AllDdlObjects,
	IDdlObjectLinker,
	IQueryEntityClassCreator,
	IQueryObjectInitializer,
	ITerminalStore
} from '@airport/terminal-map';
import { IDdlObjectRetriever } from './DdlObjectRetriever';
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { DbApplication, DbDomain } from '@airport/ground-control';

@Injected()
export class QueryObjectInitializer
	implements IQueryObjectInitializer {

	@Inject()
	ddlObjectLinker: IDdlObjectLinker

	@Inject()
	ddlObjectRetriever: IDdlObjectRetriever

	@Inject()
	queryEntityClassCreator: IQueryEntityClassCreator

	@Inject()
	terminalStore: ITerminalStore

	generateQObjectsAndPopulateStore(
		allDdlObjects: AllDdlObjects
	): void {
		this.ddlObjectLinker.link(allDdlObjects);
		this.queryEntityClassCreator.createAll(allDdlObjects.all.applications);
		const lastTerminalState = this.terminalStore.getTerminalState();

		const existingDomainMap = {};
		for (const domain of lastTerminalState.domains) {
			existingDomainMap[domain.name] = domain;
		}
		for (const domain of allDdlObjects.added.domains) {
			delete existingDomainMap[domain.name];
		}
		const unmodifiedDomains: DbDomain[] = [];
		for (const domainName in existingDomainMap) {
			unmodifiedDomains.push(existingDomainMap[domainName]);
		}

		const existingApplicationMap = {};
		for (const application of lastTerminalState.applications) {
			existingApplicationMap[application.fullName] = application;
		}
		for (const application of allDdlObjects.added.applications) {
			delete existingApplicationMap[application.fullName];
			lastTerminalState.applicationMapByFullName
				.set(application.fullName, application)
		}
		const unmodifiedApplications: DbApplication[] = [];
		for (const applicationName in existingApplicationMap) {
			unmodifiedApplications.push(existingApplicationMap[applicationName]);
		}

		this.terminalStore.state.next({
			...lastTerminalState,
			domains: [
				...unmodifiedDomains,
				...allDdlObjects.added.domains
			],
			applicationMapByFullName: lastTerminalState.applicationMapByFullName,
			applications: [
				...unmodifiedApplications,
				...allDdlObjects.added.applications
			]
		});
	}

	async initialize(
		context: IContext
	): Promise<AllDdlObjects> {
		const ddlObjects = await this.ddlObjectRetriever.retrieveDdlObjects(context);

		const allApplicationVersionsByIds = []

		for (const applicationVersion of ddlObjects.applicationVersions) {
			allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion
		}

		let allDdlObjects: AllDdlObjects = {
			all: ddlObjects,
			allApplicationVersionsByIds,
			added: ddlObjects
		}

		this.generateQObjectsAndPopulateStore(allDdlObjects);

		return allDdlObjects;
	}

}
