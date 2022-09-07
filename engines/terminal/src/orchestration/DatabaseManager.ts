import {
	IAirportDatabase
} from '@airport/air-traffic-control';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IContext
} from '@airport/direction-indicator';
import {
	FullApplication_Name, IDbApplicationUtils,
} from '@airport/ground-control';
import {
	Actor,
} from '@airport/holding-pattern/dist/app/bundle';
import { IApplication, IApplicationDao } from '@airport/airspace/dist/app/bundle';
import {
	IApplicationInitializer,
	IDatabaseManager,
	IStoreDriver,
	ITerminalState,
	ITerminalStore,
	ITransactionalServer,
	ITransactionManager
} from '@airport/terminal-map';
import { JsonApplicationWithLastIds } from '@airport/apron';
import { BLUEPRINT } from '@airport/blueprint';
import { IInternalRecordManager } from '../data/InternalRecordManager';

@Injected()
export class DatabaseManager
	implements IDatabaseManager {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationDao: IApplicationDao

	@Inject()
	applicationInitializer: IApplicationInitializer

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

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
			const hydrate = await this.storeDriver.doesTableExist(this.dbApplicationUtils
				.getFullApplication_Name(BLUEPRINT[0]),
				'PACKAGES', context);

			await this.installStarterApplication(false, hydrate, context);

			if (!hydrate) {
				await this.internalRecordManager.initTerminal(domainName, context)
			}

			(this.transactionalServer as any).tempActor = null;
			this.initialized = true;
		}, {
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
		const applications = await this.applicationDao.findAllWithJson()
		const existingApplicationMap: Map<FullApplication_Name, IApplication> = new Map()
		for (const application of applications) {
			existingApplicationMap.set(application.fullName, application)
		}

		const applicationsToCreate: JsonApplicationWithLastIds[] = []
		for (const jsonApplication of jsonApplications) {
			const existingApplication = existingApplicationMap.get(this.dbApplicationUtils
				.getFullApplication_Name(jsonApplication))
			if (existingApplication) {
				jsonApplication.lastIds = existingApplication.versions[0].jsonApplication.lastIds
			} else {
				applicationsToCreate.push(jsonApplication)
			}
		}

		(this.transactionalServer as any).tempActor = new Actor();
		await this.applicationInitializer.initialize(
			applicationsToCreate, context, true, true);

		(this.transactionalServer as any).tempActor = null;
	}

	private async installStarterApplication(
		stage: boolean,
		hydrate: boolean,
		context: IContext,
	) {
		const blueprintFile = await import('@airport/blueprint');
		if (stage) {
			await this.applicationInitializer.stage(blueprintFile.BLUEPRINT as any, context);
		} else if (hydrate) {
			await this.applicationInitializer.hydrate(blueprintFile.BLUEPRINT as any, context);
		} else {
			await this.applicationInitializer.initialize(blueprintFile.BLUEPRINT as any,
				context, false, false);
		}
	}
}
