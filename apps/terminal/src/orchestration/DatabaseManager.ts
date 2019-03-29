import {
	AIR_DB,
	dbConst,
	IAirportDatabase,
}                         from '@airport/air-control'
import {DI}               from '@airport/di'
import {StoreType}        from '@airport/terminal-map'
import {DATABASE_MANAGER} from '../diTokens'

export interface IDatabaseManager {

	ensureInitialized(
		terminalName: string,
		timeout: number
	): Promise<void>;

	initializeAll(
		defaultStoreType: StoreType
	): Promise<void>;

	isInitialized(
		terminalName: string
	): boolean;

	init(
		storeType: StoreType,
		terminalName: string
	): Promise<void>;

}

export class DatabaseManager
	implements IDatabaseManager {

	private airDb: IAirportDatabase

	constructor() {
		DI.get((
			airportDatabase
		) => {
			this.airDb = airportDatabase
		}, AIR_DB)
	}

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
		throw `Implement!`
		/*		const db = TQ.db(dbConst.DEFAULT_DB);
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
				}*/
	}

	isInitialized(
		terminalName: string
	): boolean {
		throw `Implement!`
		/*		let terminal = this.databaseMap[terminalName];
				if (!terminal) {
					return false;
				}
				return !!terminal.entityManager;*/
	}

	async init(
		storeType: StoreType,
		terminalName: string
	): Promise<void> {
		throw `Implement!`
		/*		let dbFacade: IDatabaseFacadeInternal = this.databaseMap[terminalName];
				if (!dbFacade) {
					dbFacade = new DatabaseFacade(terminalName);
					this.databaseMap[terminalName] = dbFacade;
					this.dbNames.push(terminalName);
					this.dbNameSet[terminalName] = true;
				}
				if (this.isInitialized(terminalName)) {
					throw `Database '${terminalName}' is already initialized`;
				}
				this.allDbsEntityData.forEach(
					entityData => {
						let entityName = MetadataStore.getEntityName(entityData.entityConstructor);
						if (!dbFacade.qEntityMap[entityName]) {
							let qEntity = new entityData.qEntityConstructor(entityData.qEntityConstructor, entityData.entityConstructor, entityName);
							dbFacade.qEntityMap[entityName] = qEntity;
						}
					});
				await dbFacade.init(storeType);*/
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
	*/

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
}

DI.set(DATABASE_MANAGER, DatabaseManager)
