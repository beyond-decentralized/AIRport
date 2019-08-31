import {
	AIR_DB,
	IAirportDatabase,
}                           from '@airport/air-control'
import {DI}                 from '@airport/di'
import {setStoreDriver}     from '@airport/fuel-hydrant-system'
import {
	DomainName,
	getSchemaName,
	JsonSchema,
	SchemaName,
	STORE_DRIVER,
	TRANS_CONNECTOR
}                           from '@airport/ground-control'
import {
	Actor,
	ACTOR_DAO
}                           from '@airport/holding-pattern'
import {SCHEMA_INITIALIZER} from '@airport/landing'
import {StoreType}          from '@airport/terminal-map'
import {
	TRANS_SERVER,
	transactional
}                           from '@airport/tower'
import {SCHEMA_DAO}         from '@airport/traffic-pattern'
import {
	Terminal,
	TERMINAL_DAO,
	User,
	USER_DAO
}                           from '@airport/travel-document-checkpoint'
import {DATABASE_MANAGER}   from '../diTokens'

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
			throw new Error(`Implement!`)
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
		storeType: StoreType,
		...schemas: JsonSchema[]
	): Promise<void> {
		await setStoreDriver(storeType)
		const airDb = await DI.get(AIR_DB)
		this.airDb  = airDb

		const connector = await DI.get(TRANS_CONNECTOR)
		await connector.init()

		const storeDriver = await DI.get(STORE_DRIVER)
		/*
				await storeDriver.dropTable('npmjs_org___airport__airport_code__SEQUENCES')
				await storeDriver.dropTable('npmjs_org___airport__airport_code__TERMINAL_RUNS')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__ACTOR_APPLICATION')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__Actor')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__Application')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPOSITORY')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPOSITORY_ACTORS')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPOSITORY_APPLICATION')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPOSITORY_OPERATION_HISTORY')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPOSITORY_RECORD_HISTORY')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPOSITORY_RECORD_HISTORY_NEW_VALUES')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPOSITORY_RECORD_HISTORY_OLD_VALUES')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPOSITORY_SCHEMAS')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPOSITORY_TRANSACTION_HISTORY')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS')
				await storeDriver.dropTable('npmjs_org___airport__holding_pattern__TRANSACTION_HISTORY')
				await storeDriver.dropTable('npmjs_org___airport__territory__APPLICATIONS')
				await storeDriver.dropTable('npmjs_org___airport__territory__APPLICATION_PACKAGES')
				await storeDriver.dropTable('npmjs_org___airport__territory__DOMAINS')
				await storeDriver.dropTable('npmjs_org___airport__territory__PACKAGED_UNITS')
				await storeDriver.dropTable('npmjs_org___airport__territory__PACKAGES')
				await storeDriver.dropTable('npmjs_org___airport__traffic_pattern__SCHEMAS')
				await storeDriver.dropTable('npmjs_org___airport__traffic_pattern__SCHEMA_COLUMNS')
				await storeDriver.dropTable('npmjs_org___airport__traffic_pattern__SCHEMA_ENTITIES')
				await storeDriver.dropTable('npmjs_org___airport__traffic_pattern__SCHEMA_PROPERTIES')
				await storeDriver.dropTable('npmjs_org___airport__traffic_pattern__SCHEMA_PROPERTY_COLUMNS')
				await storeDriver.dropTable('npmjs_org___airport__traffic_pattern__SCHEMA_REFERENCES')
				await storeDriver.dropTable('npmjs_org___airport__traffic_pattern__SCHEMA_RELATIONS')
				await storeDriver.dropTable('npmjs_org___airport__traffic_pattern__SCHEMA_RELATION_COLUMNS')
				await storeDriver.dropTable('npmjs_org___airport__traffic_pattern__SCHEMA_VERSIONS')
				await storeDriver.dropTable('npmjs_org___airport__travel_document_checkpoint__Agt')
				await storeDriver.dropTable('npmjs_org___airport__travel_document_checkpoint__TERMINAL_AGTS')
				await storeDriver.dropTable('npmjs_org___airport__travel_document_checkpoint__Terminal')
				await storeDriver.dropTable('npmjs_org___airport__travel_document_checkpoint__USER_TERMINAL')
				await storeDriver.dropTable('npmjs_org___airport__travel_document_checkpoint__USER_TERMINAL_AGT')
				await storeDriver.dropTable('npmjs_org___airport__travel_document_checkpoint__User')
				*/
		/*
				await storeDriver.dropTable('public___votecube__public_db__CONTINENTS')
				await storeDriver.dropTable('public___votecube__public_db__COUNTIES')
				await storeDriver.dropTable('public___votecube__public_db__COUNTRIES')
				await storeDriver.dropTable('public___votecube__public_db__FACTORS')
				await storeDriver.dropTable('public___votecube__public_db__FACTOR_POSITIONS')
				await storeDriver.dropTable('public___votecube__public_db__LABELS')
				await storeDriver.dropTable('public___votecube__public_db__POLLS')
				await storeDriver.dropTable('public___votecube__public_db__POLL_CONTINENTS')
				await storeDriver.dropTable('public___votecube__public_db__POLL_COUNTIES')
				await storeDriver.dropTable('public___votecube__public_db__POLL_COUNTRIES')
				await storeDriver.dropTable('public___votecube__public_db__POLL_FACTOR_POSITIONS')
				await storeDriver.dropTable('public___votecube__public_db__POLL_LABELS')
				await storeDriver.dropTable('public___votecube__public_db__POLL_STATES')
				await storeDriver.dropTable('public___votecube__public_db__POLL_TOWNS')
				await storeDriver.dropTable('public___votecube__public_db__POLL_TYPES')
				await storeDriver.dropTable('public___votecube__public_db__POSITIONS')
				await storeDriver.dropTable('public___votecube__public_db__STATES')
				await storeDriver.dropTable('public___votecube__public_db__THEMES')
				await storeDriver.dropTable('public___votecube__public_db__TOWNS')
				await storeDriver.dropTable('public___votecube__public_db__VOTES')
				await storeDriver.dropTable('public___votecube__public_db__VOTE_FACTORS')
				await storeDriver.dropTable('public___votecube__public_db__VOTE_FACTOR_TYPES')
		*/

		const server              = await DI.get(TRANS_SERVER);
		(server as any).tempActor = new Actor()

		const hydrate = await storeDriver.doesTableExist('npmjs_org___airport__territory__PACKAGES')

		await this.installAirportSchema(hydrate)

		if (!hydrate) {
			await this.initTerminal(domainName)
		}

		if (schemas && schemas.length) {

			const schemaDao = await DI.get(SCHEMA_DAO)

			const schemaNames: SchemaName[] = []
			for (const jsonSchema of schemas) {
				const schemaName = getSchemaName(jsonSchema)
				schemaNames.push(schemaName)
			}

			const existingSchemaMap = await schemaDao.findMapByNames(schemaNames)

			const schemasToInitialize: JsonSchema[] = []
			for (const jsonSchema of schemas) {
				const schemaName = getSchemaName(jsonSchema)
				if (!existingSchemaMap.has(schemaName)) {
					schemasToInitialize.push(jsonSchema)
				}
			}

			if (schemasToInitialize.length) {
				const schemaInitializer = await DI.get(SCHEMA_INITIALIZER)
				await schemaInitializer.initialize(schemas)
			}
		}

		(server as any).tempActor = null

		/*
				throw new Error(`Implement!`)
				let dbFacade: IDatabaseFacade = this.databaseMap[terminalName]
				if (!dbFacade) {
					dbFacade                       = new DatabaseFacade(terminalName)
					this.databaseMap[terminalName] = dbFacade
					this.dbNames.push(terminalName)
					this.dbNameSet[terminalName] = true
				}
				if (this.isInitialized(terminalName)) {
					throw new Error(
					`Database '${terminalName}' is already initialized`)
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

	private async initTerminal(domainName: DomainName): Promise<void> {
		await transactional(async () => {
			const user    = new User()
			user.uniqueId = domainName
			const userDao = await DI.get(USER_DAO)
			await userDao.save(user)

			const terminal    = new Terminal()
			terminal.name     = domainName
			terminal.owner    = user
			const terminalDao = await DI.get(TERMINAL_DAO)
			await terminalDao.save(terminal)

			const actor    = new Actor()
			actor.user     = user
			actor.terminal = terminal
			actor.randomId = Math.random()
			const actorDao = await DI.get(ACTOR_DAO)
			await actorDao.save(actor)
		})
	}

	private async installAirportSchema(hydrate: boolean) {
		const blueprintFile     = await import('@airport/blueprint')
		const schemaInitializer = await DI.get(SCHEMA_INITIALIZER)
		if (hydrate) {
			await schemaInitializer.hydrate(blueprintFile.BLUEPRINT as any)
		} else {
			await schemaInitializer.initialize(blueprintFile.BLUEPRINT as any, false)
		}
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
}

DI.set(DATABASE_MANAGER, DatabaseManager)
