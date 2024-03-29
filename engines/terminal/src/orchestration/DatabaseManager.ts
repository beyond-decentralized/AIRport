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
	Application_FullName, IApplication, IApplicationNameUtils, JsonApplication,
} from '@airport/ground-control';
import {
	Actor,
} from '@airport/holding-pattern/dist/app/bundle';
import { IDdlApplicationDao } from '@airport/airspace/dist/app/bundle';
import {
	IApplicationInitializer,
	IDatabaseManager,
	IStoreDriver,
	ITransactionalServer,
	ITransactionManager
} from '@airport/terminal-map';
import { BLUEPRINT } from '@airport/blueprint';
import { IInternalRecordManager } from '../data/InternalRecordManager';

@Injected()
export class DatabaseManager
	implements IDatabaseManager {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	ddlApplicationDao: IDdlApplicationDao

	@Inject()
	applicationInitializer: IApplicationInitializer

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	internalRecordManager: IInternalRecordManager

	@Inject()
	storeDriver: IStoreDriver

	@Inject()
	transactionalServer: ITransactionalServer

	@Inject()
	transactionManager: ITransactionManager

	private initialized = false;

	async initNoDb(
		context: IContext,
		...applications: JsonApplicationWithLastIds[]
	): Promise<void> {
		this.airportDatabase.load();

		(this.transactionalServer as any).tempActor = new Actor();

		await this.installStarterApplication(true, false, context);

		await this.applicationInitializer.stage(applications, context);
		(this.transactionalServer as any).tempActor = null;
		this.initialized = true;
	}

	async initWithDb(
		domainName: string,
		context: IContext
	): Promise<void> {
		this.airportDatabase.load();

		(this.transactionalServer as any).tempActor = new Actor();

		await this.transactionManager.transactInternal(async (
			_transaction,
			context
		) => {
			const firstApp: JsonApplication = BLUEPRINT[0] as any
			const hydrate = await this.storeDriver.doesTableExist(this.applicationNameUtils
				.getApplication_FullName(firstApp),
				'PACKAGES', context);

			await this.installStarterApplication(false, hydrate, context);

			if (!hydrate) {
				await this.internalRecordManager.initTerminal(firstApp, context)
			}

			(this.transactionalServer as any).tempActor = null;
			this.initialized = true;
		}, null, {
			...context,
			doNotRecordHistory: true
		})
	}

	isInitialized(): boolean {
		return this.initialized;
	}

	async initFeatureApplications(
		context: IContext,
		jsonApplications?: JsonApplicationWithLastIds[]
	): Promise<void> {
		let applications: IApplication[] = []
		await this.transactionManager.transactInternal(async (
			_transaction,
			context
		) => {
			applications = await this.ddlApplicationDao.findAllWithJson(context)
		}, null, context)

		const existingApplicationMap: Map<Application_FullName, IApplication> = new Map()
		for (const application of applications) {
			existingApplicationMap.set(application.fullName, application)
		}

		const applicationsToCreate: JsonApplicationWithLastIds[] = []
		for (const jsonApplication of jsonApplications) {
			const existingApplication = existingApplicationMap.get(this.applicationNameUtils
				.getApplication_FullName(jsonApplication))
			if (existingApplication) {
				jsonApplication.lastIds =
					(existingApplication.versions[0].jsonApplication as JsonApplicationWithLastIds).lastIds
			} else {
				applicationsToCreate.push(jsonApplication)
			}
		}

		(this.transactionalServer as any).tempActor = new Actor();
		await this.applicationInitializer.initialize(
			applicationsToCreate, context, true, true, true);

		(this.transactionalServer as any).tempActor = null;
	}

	private async installStarterApplication(
		stage: boolean,
		hydrate: boolean,
		context: IContext,
	) {
		const schemasDefinitions = await import('@airport/blueprint')
		const schemas = schemasDefinitions.BLUEPRINT as any
		if (stage) {
			await this.applicationInitializer.stage(schemas, context);
		} else if (hydrate) {
			await this.applicationInitializer.hydrate(schemas, context);
		} else {
			await this.applicationInitializer.initialize(schemas,
				context, false, false, false);
		}
	}
}
