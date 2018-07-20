import {
	AirportDatabaseToken,
	dbConst,
	IAirportDatabase,
}                             from "@airport/air-control";
import {StoreType}            from "@airport/terminal-map";
import {
	Inject,
	Service
}                             from "typedi";
import {DatabaseManagerToken} from "../InjectionTokens";

export interface IDatabaseManager {

	ensureInitialized(
		terminalName: string,
		timeout: number
	): Promise<void>;

	initializeAll(
		defaultStoreType: StoreType
	): void;

	isInitialized(
		terminalName: string
	): boolean;

	init(
		storeType: StoreType,
		terminalName: string
	): Promise<void>;

}

@Service(DatabaseManagerToken)
export class DatabaseManager
	implements IDatabaseManager {

	constructor(
		@Inject(
			_ => AirportDatabaseToken)
		private airportDb: IAirportDatabase
	) {
	}

	async ensureInitialized(
		terminalName: string = dbConst.DEFAULT_DB,
		timeout: number = 5000
	): Promise<void> {
		return new Promise((
			resolve,
			reject
		) => {
			this.doEnsureInitialized(terminalName, resolve, reject, timeout);
		});
	}


	async initializeAll(
		defaultStoreType: StoreType
	): void {
		throw `Implement!`;
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
		throw `Implement!`;
		/*		let database = this.databaseMap[terminalName];
				if (!database) {
					return false;
				}
				return !!database.entityManager;*/
	}

	async init(
		storeType: StoreType,
		terminalName: string
	): Promise<void> {
		throw `Implement!`;
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
			resolve();
		}
		if (remainingTimeout <= 0) {
			reject(`Timeout out waiting for initialization of DB: [${terminalName}]`);
		}
		remainingTimeout -= 100;
		setTimeout(() => {
			this.doEnsureInitialized(terminalName, resolve, reject, remainingTimeout);
		}, 100);
	}
}