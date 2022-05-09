import {
	IAirportDatabase
} from '@airport/air-traffic-control';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ISequenceGenerator
} from '@airport/check-in';
import {
	IContext
} from '@airport/direction-indicator';
import {
	DbApplication,
	FullApplicationName,
	IDbApplicationUtils,
	JsonApplication
} from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/apron';
import {
	AllDdlObjects,
	IApplicationInitializer,
	IQueryObjectInitializer,
	ITerminalStore,
	ITransactionManager
} from '@airport/terminal-map';
import {
	IApplication,
	IApplicationDao
} from '@airport/airspace';
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
	applicationBuilder: ISchemaBuilder

	@Inject()
	applicationChecker: IApplicationChecker

	@Inject()
	applicationComposer: IApplicationComposer

	@Inject()
	applicationDao: IApplicationDao

	@Inject()
	applicationLocator: IApplicationLocator

	@Inject()
	applicationRecorder: IApplicationRecorder

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	queryObjectInitializer: IQueryObjectInitializer

	@Inject()
	sequenceGenerator: ISequenceGenerator

	@Inject()
	terminalStore: ITerminalStore

	@Inject()
	transactionManager: ITransactionManager

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
		await this.stage(jsonApplications, context);
		// Hydrate all DDL objects and Sequences

		const ddlObjects = await this.queryObjectInitializer.initialize();

		this.addNewApplicationVersionsToAll(ddlObjects);

		this.setAirDbApplications(ddlObjects);

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
		loadExistingApplications: boolean
	): Promise<void> {
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
			const existingApplication = existingApplicationMap.get(this.dbApplicationUtils.
				getFullApplicationName(jsonApplication))
			if (existingApplication) {
				jsonApplication.lastIds = existingApplication.versions[0].jsonApplication.lastIds
			} else {
				newJsonApplicationMap.set(this.dbApplicationUtils.
					getFullApplicationName(jsonApplication), jsonApplication);
			}
		}

		let checkedApplicationsWithValidDependencies = []
		for (const jsonApplication of applicationsWithValidDependencies) {
			const existingApplication = existingApplicationMap.get(this.dbApplicationUtils.
				getFullApplicationName(jsonApplication))
			if (!existingApplication) {
				checkedApplicationsWithValidDependencies.push(jsonApplication)
				await this.applicationBuilder.build(
					jsonApplication, existingApplicationMap, newJsonApplicationMap, context);
			}
		}

		const allDdlObjects = await this.applicationComposer.compose(
			checkedApplicationsWithValidDependencies, {
			terminalStore: this.terminalStore
		});

		this.addNewApplicationVersionsToAll(allDdlObjects);

		this.queryObjectInitializer.generateQObjectsAndPopulateStore(allDdlObjects);

		this.setAirDbApplications(allDdlObjects);

		await this.transactionManager.transactInternal(async (
			_transaction,
			context
		) => {
			const newSequences = await this.applicationBuilder.buildAllSequences(
				applicationsWithValidDependencies, context);

			await this.sequenceGenerator.initialize(context, newSequences);

			await this.applicationRecorder.record(allDdlObjects.added, context);
		}, context)

	}

	async initializeForAIRportApp(
		jsonApplication: JsonApplicationWithLastIds
	): Promise<void> {
		const applicationsWithValidDependencies = await this.
			getApplicationsWithValidDependencies([jsonApplication], false)

		const ddlObjects = await this.applicationComposer.compose(
			applicationsWithValidDependencies, {
			deepTraverseReferences: true,
			terminalStore: this.terminalStore
		})

		this.addNewApplicationVersionsToAll(ddlObjects);

		this.queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects);

		this.setAirDbApplications(ddlObjects);
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

		this.setAirDbApplications(tempDdlObjects);

		const newSequences = await this.applicationBuilder.stageSequences(
			jsonApplications, context);

		await this.sequenceGenerator.tempInitialize(context, newSequences);
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
				.checkDependencies(jsonApplicationsToInstall);

			if (applicationReferenceCheckResults.applicationsInNeedOfAdditionalDependencies.length) {
				// const
				for (let i = 0; i < applicationReferenceCheckResults.neededDependencies.length; i++) {
					const neededDependency = applicationReferenceCheckResults.neededDependencies[i]
					const fullApplicationName = this.dbApplicationUtils.
						getFullApplicationName(neededDependency)

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
