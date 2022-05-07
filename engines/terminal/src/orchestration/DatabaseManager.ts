import {
	AIRPORT_DATABASE
} from '@airport/air-traffic-control';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	container,
	IContext
} from '@airport/direction-indicator';
import {
	FullApplicationName, IDbApplicationUtils,
} from '@airport/ground-control';
import {
	Actor,
} from '@airport/holding-pattern-runtime';
import { IApplication, IApplicationDao } from '@airport/airspace';
import {
	IApplicationInitializer,
	IDatabaseManager,
	IStoreDriver,
	ITransactionalServer
} from '@airport/terminal-map';
import { JsonApplicationWithLastIds } from '@airport/apron';
import { BLUEPRINT } from '@airport/blueprint';
import { IInternalRecordManager } from '../data/InternalRecordManager';

@Injected()
export class DatabaseManager
	implements IDatabaseManager {

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

	private initialized = false;

	async initNoDb(
		context: IContext,
		...applications: JsonApplicationWithLastIds[]
	): Promise<void> {
		await container(this).get(AIRPORT_DATABASE);

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
		await container(this).get(AIRPORT_DATABASE);

		(this.transactionalServer as any).tempActor = new Actor();

		const hydrate = await this.storeDriver.doesTableExist(this.dbApplicationUtils
			.getFullApplicationName(BLUEPRINT[0]),
			'PACKAGES', context);

		await this.installStarterApplication(false, hydrate, context);

		if (!hydrate) {
			await this.internalRecordManager.initTerminal(domainName, context)
		}

		(this.transactionalServer as any).tempActor = null;
		this.initialized = true;
	}

	isInitialized(): boolean {
		return this.initialized;
	}

	async initFeatureApplications(
		context: IContext,
		jsonApplications?: JsonApplicationWithLastIds[]
	): Promise<void> {
		const applications = await this.applicationDao.findAllWithJson()
		const existingApplicationMap: Map<FullApplicationName, IApplication> = new Map()
		for (const application of applications) {
			existingApplicationMap.set(application.fullName, application)
		}

		const applicationsToCreate: JsonApplicationWithLastIds[] = []
		for (const jsonApplication of jsonApplications) {
			const existingApplication = existingApplicationMap.get(this.dbApplicationUtils
				.getFullApplicationName(jsonApplication))
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

	/*
	static async addDataStore(
		storeType: StoreType,
		terminalName: string
	): Promise<void> {
		if (this.isInitialized(terminalName)) {
			throw new Error(
			`Database '${terminalName}' is already initialized`);
		}
		const newDataStore = await QDataStore.db(dbConst.DEFAULT_DB).save({
			name: terminalName,
			storeType: storeType
		});
		await TQ.init(storeType, terminalName);
	}

	private doEnsureInitialized(
		terminalName: string,
		resolve,
		reject,
		remainingTimeout: number
	): void {
		if (this.isInitialized(terminalName)) {
			resolve()
		}
		if (remainingTimeout <= 0) {
			reject(`Timeout out waiting for initialization of DB: [${terminalName}]`)
		}
		remainingTimeout -= 100
		setTimeout(() => {
			this.doEnsureInitialized(terminalName, resolve, reject, remainingTimeout)
		}, 100)
	}
	*/

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
