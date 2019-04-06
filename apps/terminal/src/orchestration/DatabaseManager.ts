import {
	AIR_DB,
	IAirportDatabase,
}                                 from '@airport/air-control'
import {DI}                       from '@airport/di'
import {setStoreDriver}           from '@airport/fuel-hydrant-system'
import {STORE_DRIVER}             from '@airport/ground-control'
import {SCHEMA_INITIALIZER}       from '@airport/landing'
import {QUERY_OBJECT_INITIALIZER} from '@airport/takeoff'
import {
	StoreType,
	TRANSACTION_MANAGER
}                                 from '@airport/terminal-map'
import {DATABASE_MANAGER}         from '../diTokens'

export interface IDatabaseManager {
	/*
		ensureInitialized(
			terminalName: string,
			timeout: number
		): Promise<void>;

		initializeAll(
			defaultStoreType: StoreType
		): Promise<void>;
	*/

	isInitialized(): boolean;

	init(
		storeType: StoreType
	): Promise<void>;

}

export class DatabaseManager
	implements IDatabaseManager {

	private airDb: IAirportDatabase

	constructor() {
	}

	/*
		async ensureInitialized(
			terminalName: string = dbConst.DEFAULT_DB,
			timeout: number      = 5000
		): Promise<void> {
			return new Promise((
				resolve,
				reject
			) => {
				this.doEnsureInitialized(terminalName, resolve, reject, timeout)
			})
		}


		async initializeAll(
			defaultStoreType: StoreType
		): Promise<void> {
			AIR_DB
			throw `Implement!`
					const db = TQ.db(dbConst.DEFAULT_DB);
					if (!TQ.isInitialized(dbConst.DEFAULT_DB)) {
						await TQ.addDataStore(defaultStoreType, dbConst.DEFAULT_DB);
						await db.entityManager.goOnline();
					}

					const dataStores = await db.dao.dataStore.findAsGraph();
					for (let dataStore of dataStores) {
						if (!TQ.isInitialized(dataStore.name)) {
							await TQ.init(dataStore.storeType, dataStore.name);
							await TQ.db(dataStore.name).entityManager.goOnline();
						}
					}
	}
*/
	isInitialized(): boolean {
		return !!this.airDb
	}

	async init(
		storeType: StoreType
	): Promise<void> {
		await setStoreDriver(storeType)
		const airDb = await DI.getP(AIR_DB)
		this.airDb  = airDb

		const transManager = await DI.getP(TRANSACTION_MANAGER)
		await transManager.initialize('airport')

		const storeDriver = await DI.getP(STORE_DRIVER)
			.findNative(
				// ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
				`SELECT tbl_name from sqlite_master WHERE type = '${tableName}'`,
				[]
			)
		if (await storeDriver.doesTableExist('github_com___airport_territory__Package')) {
			const queryObjectInitializer = await DI.getP(QUERY_OBJECT_INITIALIZER)
			await queryObjectInitializer.initialize()
		} else {
			await this.installAirportSchema()
		}
		/*
				throw `Implement!`
				let dbFacade: IDatabaseFacade = this.databaseMap[terminalName]
				if (!dbFacade) {
					dbFacade                       = new DatabaseFacade(terminalName)
					this.databaseMap[terminalName] = dbFacade
					this.dbNames.push(terminalName)
					this.dbNameSet[terminalName] = true
				}
				if (this.isInitialized(terminalName)) {
					throw `Database '${terminalName}' is already initialized`
				}
				this.allDbsEntityData.forEach(
					entityData => {
						let entityName = MetadataStore.getEntityName(entityData.entityConstructor)
						if (!dbFacade.qEntityMap[entityName]) {
							let qEntity                     = new entityData.qEntityConstructor(entityData.qEntityConstructor, entityData.entityConstructor, entityName)
							dbFacade.qEntityMap[entityName] = qEntity
						}
					})
				await dbFacade.init(storeType)
				*/
	}

	private async installAirportSchema() {
		const blueprintFile     = await import('@airport/blueprint')
		const schemaInitializer = await DI.getP(SCHEMA_INITIALIZER)
		await schemaInitializer.initialize(blueprintFile.BLUEPRINT as any, false)
	}

	/*
	static async addDataStore(
		storeType: StoreType,
		terminalName: string
	): Promise<void> {
		if (this.isInitialized(terminalName)) {
			throw `Database '${terminalName}' is already initialized`;
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
}

DI.set(DATABASE_MANAGER, DatabaseManager)
