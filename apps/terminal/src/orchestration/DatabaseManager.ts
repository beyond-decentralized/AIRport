import {
	AIR_DB,
	IAirportDatabase,
	IDao,
	IDatabaseFacade,
}                                 from '@airport/air-control'
import {DI}                       from '@airport/di'
import {
	SEQUENCE_GENERATOR,
	setStoreDriver
}                                 from '@airport/fuel-hydrant-system'
import {
	DomainName,
	STORE_DRIVER,
	TRANS_CONNECTOR
}                                 from '@airport/ground-control'
import {
	Actor,
	ACTOR_DAO
}                                 from '@airport/holding-pattern'
import {SCHEMA_INITIALIZER}       from '@airport/landing'
import {QUERY_OBJECT_INITIALIZER} from '@airport/takeoff'
import {StoreType}                from '@airport/terminal-map'
import {
	TRANS_SERVER,
	transactional
}                                 from '@airport/tower'
import {
	Terminal,
	TERMINAL_DAO,
	User,
	USER_DAO
}                                 from '@airport/travel-document-checkpoint'
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
		domainName: string,
		storeType: StoreType
	): Promise<void>;

}

export class DatabaseManager
	implements IDatabaseManager {

	private airDb: IAirportDatabase

	// constructor() {
	// }

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
		domainName: string,
		storeType: StoreType
	): Promise<void> {
		await setStoreDriver(storeType)
		const airDb = await DI.getP(AIR_DB)
		this.airDb  = airDb

		const connector = await DI.getP(TRANS_CONNECTOR)
		await connector.init()

		const storeDriver = await DI.getP(STORE_DRIVER)

		await storeDriver.dropTable('github_com___airport__airport_code__SEQUENCES')
		await storeDriver.dropTable('github_com___airport__airport_code__SEQUENCE_BLOCKS')
		await storeDriver.dropTable('github_com___airport__airport_code__SEQUENCE_CONSUMERS')
		await storeDriver.dropTable('github_com___airport__holding_pattern__ACTOR_APPLICATION')
		await storeDriver.dropTable('github_com___airport__holding_pattern__Actor')
		await storeDriver.dropTable('github_com___airport__holding_pattern__Application')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_ACTORS')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_APPLICATION')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_OPERATION_HISTORY')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_RECORD_HISTORY')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_RECORD_HISTORY_NEW_VALUES')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_RECORD_HISTORY_OLD_VALUES')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_SCHEMAS')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_TRANSACTION_HISTORY')
		await storeDriver.dropTable('github_com___airport__holding_pattern__REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS')
		await storeDriver.dropTable('github_com___airport__holding_pattern__TRANSACTION_HISTORY')
		await storeDriver.dropTable('github_com___airport__territory__APPLICATIONS')
		await storeDriver.dropTable('github_com___airport__territory__APPLICATION_PACKAGES')
		await storeDriver.dropTable('github_com___airport__territory__DOMAINS')
		await storeDriver.dropTable('github_com___airport__territory__PACKAGED_UNITS')
		await storeDriver.dropTable('github_com___airport__territory__PACKAGES')
		await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMAS')
		await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_COLUMNS')
		await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_COLUMN_PROPERTIES')
		await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_ENTITIES')
		await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_PROPERTIES')
		await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_REFERENCES')
		await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_RELATIONS')
		await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_RELATION_COLUMNS')
		await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_VERSIONS')
		await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__Agt')
		await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__TERMINAL_AGTS')
		await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__Terminal')
		await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__USER_TERMINAL')
		await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__USER_TERMINAL_AGT')
		await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__User')

		if (await storeDriver.doesTableExist('github_com___airport_territory__PACKAGES')) {
			const queryObjectInitializer = await DI.getP(QUERY_OBJECT_INITIALIZER)
			await queryObjectInitializer.initialize()
		} else {
			const server              = await DI.getP(TRANS_SERVER);
			(server as any).tempActor = new Actor()

			await this.installAirportSchema()
			await this.initTerminal(domainName);

			(server as any).tempActor = null
		}
		await (await DI.getP(SEQUENCE_GENERATOR)).init()
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

	private async initTerminal(
		domainName: DomainName
	): Promise<void> {
		await transactional(async () => {
			const user    = new User()
			user.uniqueId = domainName
			const userDao = await DI.getP(USER_DAO)
			await userDao.save(user)

			const terminal    = new Terminal()
			terminal.name     = domainName
			terminal.owner    = user
			const terminalDao = await DI.getP(TERMINAL_DAO)
			await terminalDao.save(terminal)

			const actor    = new Actor()
			actor.user     = user
			actor.terminal = terminal
			actor.randomId = Math.random()
			const actorDao = await DI.getP(ACTOR_DAO)
			await actorDao.save(actor)
		})
	}

	private async bulkCreate(
		dao: IDao<any, any, any, any, any, any, any>,
		entities: any[]
	) {
		const entityDbFacade            = (dao as any).db
		const dbFacade: IDatabaseFacade = entityDbFacade.common

		await dbFacade.bulkCreate(entityDbFacade.dbEntity, entities, false, false, false)
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
