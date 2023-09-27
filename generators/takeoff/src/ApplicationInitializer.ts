import {
	IAirportDatabase, JsonApplicationWithLastIds
} from '@airport/air-traffic-control';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IContext
} from '@airport/direction-indicator';
import {
	IApplication,
	Application_FullName,
	IApplicationNameUtils,
	ISequenceGenerator,
	JsonApplication,
	IAppTrackerUtils
} from '@airport/ground-control';
import {
	AllDdlObjects,
	IApplicationInitializer,
	IQueryObjectInitializer,
	ITerminalStore,
	ITransactionManager
} from '@airport/terminal-map';
import {
	IDdlApplicationDao
} from '@airport/airspace/dist/app/bundle';
import { ISchemaBuilder } from './builder/ISchemaBuilder';
import { IApplicationChecker } from './checker/ApplicationChecker';
import { IApplicationComposer } from './recorder/ApplicationComposer';
import { IApplicationLocator } from './locator/ApplicationLocator';
import { IApplicationRecorder } from './recorder/ApplicationRecorder';

@Injected()
export abstract class ApplicationInitializer
	implements IApplicationInitializer {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationChecker: IApplicationChecker

	@Inject()
	applicationComposer: IApplicationComposer

	@Inject()
	ddlApplicationDao: IDdlApplicationDao

	@Inject()
	applicationLocator: IApplicationLocator

	@Inject()
	applicationRecorder: IApplicationRecorder

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	queryObjectInitializer: IQueryObjectInitializer

	@Inject()
	schemaBuilder: ISchemaBuilder

	@Inject()
	sequenceGenerator: ISequenceGenerator

	@Inject()
	terminalStore: ITerminalStore

	@Inject()
	transactionManager: ITransactionManager

	addNewApplicationVersionsToAll(
		ddlObjects: AllDdlObjects
	): void {
		for (const applicationVersion of ddlObjects.added.applicationVersions) {
			ddlObjects.allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion;
		}
	}

	async hydrate(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IContext,
	): Promise<void> {
		await this.stage(jsonApplications, context);
		// Hydrate all DDL objects and Sequences

		const ddlObjects = await this.queryObjectInitializer.initialize(context);

		this.addNewApplicationVersionsToAll(ddlObjects);

		this.setAirIApplications(ddlObjects);

		await this.sequenceGenerator.initialize(context);
	}

	/*
	 * Initialization scenarios:
	 *
	 * Brand new install - initialize BLUEPRINT applications
	 * Install new App - initialize New application (and any new dependency applications)
	 * Reload existing install - hydrate all applications
	 * Reload exiting App - nothing to do
	 */

	async initialize(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IContext,
		checkDependencies: boolean,
		loadExistingApplications: boolean,
		areFeatureApps: boolean
	): Promise<void> {
		const applicationsWithValidDependencies = await this.
			getApplicationsWithValidDependencies(
				jsonApplications, checkDependencies, context)

		const existingApplicationMap: Map<Application_FullName, IApplication> = new Map()
		if (loadExistingApplications) {
			await this.transactionManager.transactInternal(async (
				_transaction,
				context
			) => {
				const applications = await this.ddlApplicationDao.findAllWithJson(context)
				for (const application of applications) {
					existingApplicationMap.set(application.fullName, application)
				}
			}, null, context)
		}

		const newJsonApplicationMap: Map<string, JsonApplicationWithLastIds> = new Map()
		for (const jsonApplication of jsonApplications) {
			const existingApplication = existingApplicationMap.get(this.applicationNameUtils.
				getApplication_FullName(jsonApplication))
			if (existingApplication) {
				jsonApplication.lastIds = (existingApplication.versions[0].jsonApplication as JsonApplicationWithLastIds).lastIds
			} else {
				newJsonApplicationMap.set(this.applicationNameUtils.
					getApplication_FullName(jsonApplication), jsonApplication);
			}
		}

		let checkedApplicationsWithValidDependencies = []

		await this.transactionManager.transactInternal(async (
			_transaction,
			context
		) => {
			for (const jsonApplication of applicationsWithValidDependencies) {
				const existingApplication = existingApplicationMap.get(this.applicationNameUtils.
					getApplication_FullName(jsonApplication))
				if (!existingApplication) {
					checkedApplicationsWithValidDependencies.push(jsonApplication)
					await this.schemaBuilder.build(
						jsonApplication, existingApplicationMap, newJsonApplicationMap,
						areFeatureApps, context);
				}
			}
		}, null, context)

		const allDdlObjects = await this.applicationComposer.compose(
			checkedApplicationsWithValidDependencies, {
			terminalStore: this.terminalStore
		});

		this.addNewApplicationVersionsToAll(allDdlObjects);

		this.queryObjectInitializer.generateQObjectsAndPopulateStore(allDdlObjects);

		this.setAirIApplications(allDdlObjects);

		await this.transactionManager.transactInternal(async (
			_transaction,
			context
		) => {
			const newSequences = await this.schemaBuilder.buildAllSequences(
				applicationsWithValidDependencies, context);

			await this.sequenceGenerator.initialize(context, newSequences);

			await this.applicationRecorder.record(allDdlObjects.added, context);
		}, null, context)

	}

	async isApplicationIsInstalled(
		domain: string,
		fullApplication_Name: string
	): Promise<boolean> {
		if (!fullApplication_Name) {
			return false
		}

		if (this.appTrackerUtils.isInternalDomain(domain)) {
			return true
		}

		return !!this.terminalStore.getApplicationInitializer()
			.applicationWindowMap.get(fullApplication_Name)
	}

	async ensureApplicationIsInstalled(
		domainName: string,
		applicationName: string
	): Promise<boolean> {
		const isInternalDomain = await this.appTrackerUtils
			.isInternalDomain(domainName)
		if (isInternalDomain) {
			return true
		}

		const fullApplication_Name = this.applicationNameUtils.
			getApplication_FullNameFromDomainAndName(
				domainName, applicationName)

		const applicationInitializing = this.terminalStore.getApplicationInitializer()
			.initializingApplicationMap.get(fullApplication_Name)
		if (applicationInitializing) {
			return false
		}

		const isApplicationLoaded = await this.isAppLoaded(fullApplication_Name)

		if (!isApplicationLoaded) {
			this.terminalStore.getApplicationInitializer()
				.initializingApplicationMap.set(fullApplication_Name, true)
			await this.nativeInitializeApplication(domainName,
				applicationName, fullApplication_Name)
		}

		return true
	}

	async installApplication(
		domainName: string,
		applicationName: string
	): Promise<void> {
		let appIsInstalled = false
		do {
			appIsInstalled = await this.ensureApplicationIsInstalled(
				domainName, applicationName)
			if (!appIsInstalled) {
				await new Promise<void>(resolve => {
					setTimeout(_ => {
						resolve()
					}, 100)
				})
			}
		} while (!appIsInstalled)
	}

	protected abstract isAppLoaded(
		fullApplication_Name: string
	): Promise<boolean>

	async initializeForAIRportApp(
		jsonApplication: JsonApplicationWithLastIds
	): Promise<void> {
		const applicationsWithValidDependencies = await this.
			getApplicationsWithValidDependencies(
				[jsonApplication], false, null)

		const ddlObjects = await this.applicationComposer.compose(
			applicationsWithValidDependencies, {
			deepTraverseReferences: true,
			terminalStore: this.terminalStore
		})

		this.addNewApplicationVersionsToAll(ddlObjects);

		this.queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects);

		this.setAirIApplications(ddlObjects);
	}

	async stage(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IContext,
	): Promise<void> {
		// Temporarily Initialize application DDL objects and Sequences to allow for normal hydration

		const tempDdlObjects = await this.applicationComposer.compose(
			jsonApplications, {
			terminalStore: this.terminalStore
		});

		this.addNewApplicationVersionsToAll(tempDdlObjects);

		this.queryObjectInitializer.generateQObjectsAndPopulateStore(tempDdlObjects);

		this.setAirIApplications(tempDdlObjects);

		const newSequences = await this.schemaBuilder.stageSequences(
			jsonApplications, context);

		await this.sequenceGenerator.tempInitialize(context, newSequences);
	}

	abstract nativeInitializeApplication(
		domain: string,
		application: string,
		fullApplication_Name: string,
	): Promise<void>

	protected async wait(
		milliseconds: number
	): Promise<void> {
		return new Promise((resolve, _reject) => {
			setTimeout(() => {
				resolve()
			}, milliseconds)
		})
	}

	private async getApplicationsWithValidDependencies(
		jsonApplications: JsonApplicationWithLastIds[],
		checkDependencies: boolean,
		context: IContext
	): Promise<JsonApplicationWithLastIds[]> {
		const jsonApplicationsToInstall: JsonApplication[] = [];

		for (const jsonApplication of jsonApplications) {
			await this.applicationChecker.check(jsonApplication);
			const existingApplication = this.applicationLocator.locateExistingApplicationVersionRecord(
				jsonApplication, this.terminalStore);

			if (existingApplication) {
				// Nothing needs to be done, we already have this application version
				continue;
			}
			jsonApplicationsToInstall.push(jsonApplication);
		}

		let applicationsWithValidDependencies;

		if (checkDependencies) {
			const applicationReferenceCheckResults = await this.applicationChecker
				.checkDependencies(jsonApplicationsToInstall, context);

			if (applicationReferenceCheckResults.applicationsInNeedOfAdditionalDependencies.length) {
				// const
				for (let i = 0; i < applicationReferenceCheckResults.neededDependencies.length; i++) {
					const neededDependency = applicationReferenceCheckResults.neededDependencies[i]
					const fullApplication_Name = this.applicationNameUtils.
						getApplication_FullName(neededDependency)

					await this.nativeInitializeApplication(neededDependency.domain, neededDependency.name,
						fullApplication_Name)
				}
			}
			applicationsWithValidDependencies = [
				...applicationReferenceCheckResults.applicationsWithValidDependencies,
				...applicationReferenceCheckResults.applicationsInNeedOfAdditionalDependencies
			];
		} else {
			applicationsWithValidDependencies = jsonApplicationsToInstall;
		}

		return applicationsWithValidDependencies
	}

	private setAirIApplications(
		ddlObjects: AllDdlObjects
	): void {
		for (let application of ddlObjects.all.applications) {
			this.airportDatabase.applications[application.index] = application as IApplication;
		}
	}

}
