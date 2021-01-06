import {
	AIR_DB,
	IAirportDatabase,
}                             from '@airport/air-control';
import {
	container,
	DI,
	IContext
}                             from '@airport/di';
import {
	DomainName,
	getSchemaName,
	JsonSchema,
	SchemaName,
	STORE_DRIVER,
	TRANS_CONNECTOR,
}                             from '@airport/ground-control';
import {
	Actor,
	ACTOR_DAO,
}                             from '@airport/holding-pattern';
import { SCHEMA_INITIALIZER } from '@airport/landing';

import {
	TRANS_SERVER,
	transactional,
}                           from '@airport/tower';
import { SCHEMA_DAO }       from '@airport/traffic-pattern';
import {
	Terminal,
	TERMINAL_DAO,
	User,
	USER_DAO,
}                           from '@airport/travel-document-checkpoint';
import { DATABASE_MANAGER } from '../tokens';

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
		context: IContext,
		...schemas: JsonSchema[]
	): Promise<void>;

	initNoDb(
		domainName: string,
		context: IContext,
		...schemas: JsonSchema[]
	): Promise<void>

}

export class DatabaseManager
	implements IDatabaseManager {

	private airDb: IAirportDatabase;

	// constructor() {
	// }

	async init(
		domainName: string,
		context: IContext,
		...schemas: JsonSchema[]
	): Promise<void> {
		const airDb = await container(this).get(AIR_DB);
		this.airDb  = airDb;

		const connector = await container(this).get(TRANS_CONNECTOR);
		await connector.init();

		const storeDriver = await container(this).get(STORE_DRIVER);
		/*
				await storeDriver.dropTable('air__airport_code', 'SEQUENCES')
				await storeDriver.dropTable('air__airport_code', 'TERMINAL_RUNS')
				await storeDriver.dropTable('air__holding_pattern', 'ACTOR_APPLICATION')
				await storeDriver.dropTable('air__holding_pattern', 'Actor')
				await storeDriver.dropTable('air__holding_pattern', 'Application')
				await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY')
				await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_ACTORS')
				await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_APPLICATION')
				await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_OPERATION_HISTORY')
				await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_RECORD_HISTORY')
				await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_RECORD_HISTORY_NEW_VALUES')
				await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_RECORD_HISTORY_OLD_VALUES')
				await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_SCHEMAS')
				await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_TRANSACTION_HISTORY')
				await storeDriver.dropTable('air__holding_pattern', 'REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS')
				await storeDriver.dropTable('air__holding_pattern', 'TRANSACTION_HISTORY')
				await storeDriver.dropTable('air__territory', 'APPLICATIONS')
				await storeDriver.dropTable('air__territory', 'APPLICATION_PACKAGES')
				await storeDriver.dropTable('air__territory', 'DOMAINS')
				await storeDriver.dropTable('air__territory', 'PACKAGED_UNITS')
				await storeDriver.dropTable('air__territory', 'PACKAGES')
				await storeDriver.dropTable('air__traffic_pattern', 'SCHEMAS')
				await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_COLUMNS')
				await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_ENTITIES')
				await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_PROPERTIES')
				await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_PROPERTY_COLUMNS')
				await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_REFERENCES')
				await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_RELATIONS')
				await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_RELATION_COLUMNS')
				await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_VERSIONS')
				await storeDriver.dropTable('air__travel_document_checkpoint', 'Agt')
				await storeDriver.dropTable('air__travel_document_checkpoint', 'TERMINAL_AGTS')
				await storeDriver.dropTable('air__travel_document_checkpoint', 'Terminal')
				await storeDriver.dropTable('air__travel_document_checkpoint', 'USER_TERMINAL')
				await storeDriver.dropTable('air__travel_document_checkpoint', 'USER_TERMINAL_AGT')
				await storeDriver.dropTable('air__travel_document_checkpoint', 'User')
				*/
		/*
				await storeDriver.dropTable('votecube_com__ecclesia', 'CONTINENTS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'COUNTIES')
				await storeDriver.dropTable('votecube_com__ecclesia', 'COUNTRIES')
				await storeDriver.dropTable('votecube_com__ecclesia', 'FACTORS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'FACTOR_POSITIONS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'LABELS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POLLS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_CONTINENTS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_COUNTIES')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_COUNTRIES')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_FACTOR_POSITIONS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_LABELS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_STATES')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_TOWNS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_TYPES')
				await storeDriver.dropTable('votecube_com__ecclesia', 'POSITIONS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'STATES')
				await storeDriver.dropTable('votecube_com__ecclesia', 'THEMES')
				await storeDriver.dropTable('votecube_com__ecclesia', 'TOWNS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'VOTES')
				await storeDriver.dropTable('votecube_com__ecclesia', 'VOTE_FACTORS')
				await storeDriver.dropTable('votecube_com__ecclesia', 'VOTE_FACTOR_TYPES')
		*/

		const server              = await container(this).get(TRANS_SERVER);
		(server as any).tempActor = new Actor();

		const hydrate = await storeDriver.doesTableExist('air___airport__territory',
			'packages', context);

		await this.installAirportSchema(hydrate, false, context);

		if (!hydrate) {
			await this.initTerminal(domainName);
		}

		if (schemas && schemas.length) {
			// FIXME: add ability to build feature schemas in the future
			await this.initFeatureSchemas(schemas, context, false);
		}

		// (server as any).tempActor = null

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

	async initNoDb(
		domainName: string,
		context: IContext,
		...schemas: JsonSchema[]
	): Promise<void> {
		this.airDb = await container(this).get(AIR_DB);

		const connector = await container(this).get(TRANS_CONNECTOR);
		await connector.init();

		const server              = await container(this).get(TRANS_SERVER);
		(server as any).tempActor = new Actor();

		await this.installAirportSchema(false, true, context);

		const schemaInitializer = await container(this).get(SCHEMA_INITIALIZER);
		await schemaInitializer.stage(schemas, context);
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
		return !!this.airDb;
	}

	private async initFeatureSchemas(
		schemas: JsonSchema[],
		context: IContext,
		buildSchemas: boolean,
	) {
		const schemaDao = await container(this).get(SCHEMA_DAO);

		const schemaNames: SchemaName[] = [];
		for (const jsonSchema of schemas) {
			const schemaName = getSchemaName(jsonSchema);
			schemaNames.push(schemaName);
		}

		const existingSchemaMap = await schemaDao.findMapByNames(schemaNames);

		const schemasToInitialize: JsonSchema[] = [];
		for (const jsonSchema of schemas) {
			const schemaName = getSchemaName(jsonSchema);
			if (!existingSchemaMap.has(schemaName)) {
				schemasToInitialize.push(jsonSchema);
			}
		}

		if (schemasToInitialize.length) {
			const schemaInitializer = await container(this).get(SCHEMA_INITIALIZER);
			await schemaInitializer.initialize(schemas, context, buildSchemas);
		}
	}

	private async initTerminal(
		domainName: DomainName,
	): Promise<void> {
		await transactional(async () => {
			const user    = new User();
			user.uniqueId = domainName;
			const userDao = await container(this).get(USER_DAO);
			await userDao.save(user);

			const terminal    = new Terminal();
			terminal.name     = domainName;
			terminal.owner    = user;
			const terminalDao = await container(this).get(TERMINAL_DAO);
			await terminalDao.save(terminal);

			const actor    = new Actor();
			actor.user     = user;
			actor.terminal = terminal;
			actor.randomId = Math.random();
			const actorDao = await container(this).get(ACTOR_DAO);
			await actorDao.save(actor);
		});
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

	private async installAirportSchema(
		stage: boolean,
		hydrate: boolean,
		context: IContext,
	) {
		const blueprintFile     = await import('@airport/blueprint');
		const schemaInitializer = await container(this).get(SCHEMA_INITIALIZER);
		if (stage) {
			await schemaInitializer.stage(blueprintFile.BLUEPRINT as any, context);
		} else if (hydrate) {
			await schemaInitializer.hydrate(blueprintFile.BLUEPRINT as any, context);
		} else {
			await schemaInitializer.initialize(blueprintFile.BLUEPRINT as any,
				context, false);
		}
	}
}

DI.set(DATABASE_MANAGER, DatabaseManager);
