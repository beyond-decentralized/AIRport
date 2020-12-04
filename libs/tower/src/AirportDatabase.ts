import {
	AIR_DB,
	DB_FACADE,
	FunctionsAndOperators,
	IAirportDatabase,
	IDatabaseFacade,
	IEntityContext,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	INonEntityFind,
	INonEntityFindOne,
	INonEntitySearch,
	INonEntitySearchOne,
	IQEntity,
	NonEntityFind,
	NonEntityFindOne,
	NonEntitySearch,
	NonEntitySearchOne,
	OperationName,
	QSchema,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns
} from '@airport/air-control'
import {
	container,
	DI
} from '@airport/di'
import {
	DbSchema,
	DistributionStrategy,
	PlatformType
} from '@airport/ground-control'

export class AirportDatabase
	implements IAirportDatabase {

	db: IDatabaseFacade

	F: FunctionsAndOperators
	functions: FunctionsAndOperators

	S: DbSchema[]
	schemas: DbSchema[] = []

	qSchemas: QSchema[] = []
	Q: QSchema[]

	QM: { [name: string]: QSchema } = {}

	find: INonEntityFind
	findOne: INonEntityFindOne
	search: INonEntitySearch
	searchOne: INonEntitySearchOne

	// private databaseMap: { [databaseName: string]: IDatabaseFacade } = {}
	// private dbNames: string[]                                        = []
	// private dbNameSet: { [databaseName: string]: boolean }           = {}

	// private currentDbName = dbConst.DEFAULT_DB

	constructor() {
		this.S = this.schemas
		this.Q = this.qSchemas

		this.find      = new NonEntityFind()
		this.findOne   = new NonEntityFindOne()
		this.search    = new NonEntitySearch()
		this.searchOne = new NonEntitySearchOne()
	}

	/*
		registerDatabase(
			facade: IDatabaseFacade
		) {
			if (!this.dbNameSet[facade.name]) {
				this.dbNames.push(facade.name)
			}
			this.databaseMap[facade.name] = facade
			this.dbNameSet[facade.name]   = true
		}

		async registerQSchemas(
			qSchemas: QSchema[]
		) {
			for (const qSchema of qSchemas) {
				const schemaName    = getSchemaName(qSchema)
				this.QM[schemaName] = qSchema
			}
		}

		setCurrentDb(
			dbName: string = dbConst.DEFAULT_DB
		): void {
			this.currentDbName = dbName
		}

		getDbNames(): string[] {
			return this.dbNames
		}

		getDbNameSet(): { [databaseName: string]: boolean } {
			return this.dbNameSet
		}

		get db(): IDatabaseFacade {
			let database = this.databaseMap[this.currentDbName]
			if (!database) {
				throw new Error(`Did not find database '${this.currentDbName}'`)
			}
			return database
		}
	*/

	async addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
		context?: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.addRepository(name, url, platform,
			platformConfig, distributionStrategy, context)
	}

	async insertColumnValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>
		},
		context?: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.insertColumnValues(rawInsertValues, context)
	}

	async insertValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
		context?: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.insertValues(rawInsertValues, context)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>
		},
		context?: IEntityContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.insertColumnValuesGenerateIds(rawInsertValues, context)
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
		context?: IEntityContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.insertValuesGenerateIds(rawInsertValues, context)
	}

	/**
	 * Creates an entity with a where clause - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records deleted
	 */
	async deleteWhere<IQE extends IQEntity>(
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		},
		context?: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.deleteWhere(rawDelete, context)
	}

	/**
	 * Ether creates or updates an entity - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records saved (1 or 0)
	 */
	async save<E>(
		entity: E,
		context?: IEntityContext,
		operationName?: OperationName,
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.save(entity, context)
	}

	/**
	 * Updates an entity with a where clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(
		rawUpdateColumns: RawUpdateColumns<IEUC, IQE>
			| {
			(...args: any[]): RawUpdateColumns<IEUC, IQE>
		},
		context?: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.updateColumnsWhere(rawUpdateColumns, context)
	}

	/**
	 * Updates an entity with a where clause, using a property based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(
		rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
			(...args: any[]): RawUpdate<IEUP, IQE>
		},
		context?: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.updateWhere(rawUpdate, context)
	}
}

DI.set(AIR_DB, AirportDatabase)

export function injectAirportDatabase(): void {
	console.log('Injecting AirportDatabase')
}
