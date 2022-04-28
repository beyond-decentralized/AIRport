import {
	IAirportDatabase
} from '@airport/air-control';
import {
	ISequenceGenerator
} from '@airport/check-in';
import {
	container,
	IContext
} from '@airport/direction-indicator';
import {
	DbApplication,
	FullApplicationName,
	getFullApplicationName,
	JsonApplication
} from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/security-check';
import {
	QUERY_OBJECT_INITIALIZER
} from '@airport/takeoff';
import {
	AllDdlObjects,
	IApplicationInitializer,
	ITerminalStore
} from '@airport/terminal-map';
import {
	IApplication,
	IApplicationDao
} from '@airport/airspace';
import {
	APPLICATION_BUILDER,
	APPLICATION_CHECKER,
	APPLICATION_COMPOSER,
	APPLICATION_LOCATOR,
	APPLICATION_RECORDER
} from './tokens';

export abstract class ApplicationInitializer
	implements IApplicationInitializer {

	airportDatabase: IAirportDatabase
	applicationDao: IApplicationDao
	sequenceGenerator: ISequenceGenerator
	terminalStore: ITerminalStore

	addNewApplicationVersionsToAll(
		ddlObjects: AllDdlObjects
	) {
		for (const applicationVersion of ddlObjects.added.applicationVersions) {
			ddlObjects.allApplicationVersionsByIds[applicationVersion.id] = applicationVersion;
		}
	}

	async hydrate(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IContext,
	): Promise<void> {
		QUERY_OBJECT_INITIALIZER
		await this.stage(jsonApplications, context);
		// Hydrate all DDL objects and Sequences

		const ddlObjects = await queryObjectInitializer.initialize();

		this.addNewApplicationVersionsToAll(ddlObjects);

		this.setAirDbApplications(ddlObjects);

		await this.sequenceGenerator.initialize();
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
		loadExistingApplications: boolean
	): Promise<void> {
		const [
			queryObjectInitializer, applicationBuilder, applicationComposer,
			applicationLocator, applicationRecorder]
			= await container(this).get(
				QUERY_OBJECT_INITIALIZER, APPLICATION_BUILDER,
				APPLICATION_COMPOSER, APPLICATION_LOCATOR, APPLICATION_RECORDER);

		const applicationsWithValidDependencies = await this.
			getApplicationsWithValidDependencies(jsonApplications, checkDependencies)

		const existingApplicationMap: Map<FullApplicationName, IApplication> = new Map()
		if (loadExistingApplications) {
			const applications = await this.applicationDao.findAllWithJson()
			for (const application of applications) {
				existingApplicationMap.set(application.fullName, application)
			}
		}

		const newJsonApplicationMap: Map<string, JsonApplicationWithLastIds> = new Map()
		for (const jsonApplication of jsonApplications) {
			const existingApplication = existingApplicationMap.get(getFullApplicationName(jsonApplication))
			if (existingApplication) {
				jsonApplication.lastIds = existingApplication.versions[0].jsonApplication.lastIds
			} else {
				newJsonApplicationMap.set(getFullApplicationName(jsonApplication), jsonApplication);
			}
		}

		let checkedApplicationsWithValidDependencies = []
		for (const jsonApplication of applicationsWithValidDependencies) {
			const existingApplication = existingApplicationMap.get(getFullApplicationName(jsonApplication))
			if (!existingApplication) {
				checkedApplicationsWithValidDependencies.push(jsonApplication)
				await applicationBuilder.build(jsonApplication, existingApplicationMap, newJsonApplicationMap, context);
			}
		}

		const allDdlObjects = await applicationComposer.compose(
			checkedApplicationsWithValidDependencies, applicationLocator, {
			terminalStore: this.terminalStore
		});

		this.addNewApplicationVersionsToAll(allDdlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(allDdlObjects);

		this.setAirDbApplications(allDdlObjects);

		const newSequences = await applicationBuilder.buildAllSequences(
			applicationsWithValidDependencies, context);

		await this.sequenceGenerator.initialize(newSequences);

		await applicationRecorder.record(allDdlObjects.added, context);
	}

	async initializeForAIRportApp(
		jsonApplication: JsonApplicationWithLastIds
	): Promise<void> {
		const [
			queryObjectInitializer, applicationComposer, applicationLocator]
			= await container(this).get(
				QUERY_OBJECT_INITIALIZER,
				APPLICATION_COMPOSER, APPLICATION_LOCATOR);

		const applicationsWithValidDependencies = await this.
			getApplicationsWithValidDependencies([jsonApplication], false)

		const ddlObjects = await applicationComposer.compose(
			applicationsWithValidDependencies, applicationLocator, {
			deepTraverseReferences: true,
			terminalStore: this.terminalStore
		})

		this.addNewApplicationVersionsToAll(ddlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects);

		this.setAirDbApplications(ddlObjects);
	}

	async stage(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IContext,
	): Promise<void> {
		const [queryObjectInitializer, applicationBuilder,
			applicationComposer, applicationLocator]
			= await container(this).get(QUERY_OBJECT_INITIALIZER, APPLICATION_BUILDER,
				APPLICATION_COMPOSER, APPLICATION_LOCATOR);

		// Temporarily Initialize application DDL objects and Sequences to allow for normal hydration

		const tempDdlObjects = await applicationComposer.compose(
			jsonApplications, applicationLocator, {
			terminalStore: this.terminalStore
		});

		this.addNewApplicationVersionsToAll(tempDdlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(tempDdlObjects);

		this.setAirDbApplications(tempDdlObjects);

		const newSequences = await applicationBuilder.stageSequences(
			jsonApplications, context);

		await this.sequenceGenerator.tempInitialize(newSequences);
	}

	abstract nativeInitializeApplication(
		domain: string,
		application: string,
		fullApplicationName: string,
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
		checkDependencies: boolean
	): Promise<JsonApplicationWithLastIds[]> {
		const [applicationChecker, applicationLocator]
			= await container(this).get(APPLICATION_CHECKER, APPLICATION_LOCATOR);
		const jsonApplicationsToInstall: JsonApplication[] = [];

		for (const jsonApplication of jsonApplications) {
			await applicationChecker.check(jsonApplication);
			const existingApplication = applicationLocator.locateExistingApplicationVersionRecord(
				jsonApplication, this.terminalStore);

			if (existingApplication) {
				// Nothing needs to be done, we already have this application version
				continue;
			}
			jsonApplicationsToInstall.push(jsonApplication);
		}

		let applicationsWithValidDependencies;

		if (checkDependencies) {
			const applicationReferenceCheckResults = await applicationChecker
				.checkDependencies(jsonApplicationsToInstall);

			if (applicationReferenceCheckResults.applicationsInNeedOfAdditionalDependencies.length) {
				// const
				for (let i = 0; i < applicationReferenceCheckResults.neededDependencies.length; i++) {
					const neededDependency = applicationReferenceCheckResults.neededDependencies[i]
					const fullApplicationName = getFullApplicationName(neededDependency)

					await this.nativeInitializeApplication(neededDependency.domain, neededDependency.name,
						fullApplicationName)
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

	private setAirDbApplications(
		ddlObjects: AllDdlObjects
	) {
		for (let application of ddlObjects.all.applications) {
			this.airportDatabase.applications[application.index] = application as DbApplication;
		}
	}

}
