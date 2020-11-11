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
	DbEntity,
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
		ctx: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.addRepository(name, url, platform,
			platformConfig, distributionStrategy, ctx)
	}

	/**
	 * Creates an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records created (1 or 0)
	 */
	async create<E>(
		entity: E,
		ctx: IEntityContext,
		operationName?: OperationName
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.create(entity, ctx, operationName)
	}

	/**
	 * Creates an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records created
	 */
	async bulkCreate<E>(
		entities: E[],
		checkIfProcessed: boolean, // defaults to true
		ctx: IEntityContext,
		operationName?: OperationName,
		ensureGeneratedValues?: boolean // for internal use only, needed at initial schema
	                                  // creation
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.bulkCreate(entities, ctx, checkIfProcessed,
			operationName, ensureGeneratedValues)
	}

	async insertColumnValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>
		},
		ctx: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.insertColumnValues(rawInsertValues, ctx)
	}

	async insertValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
		ctx: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.insertValues(rawInsertValues, ctx)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>
		},
		ctx: IEntityContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.insertColumnValuesGenerateIds(rawInsertValues, ctx)
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
		ctx: IEntityContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.insertValuesGenerateIds(rawInsertValues, ctx)
	}

	/**
	 * Deletes an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records deleted (1 or 0)
	 */
	async delete<E>(
		entity: E,
		ctx: IEntityContext,
		operationName?: OperationName,
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.delete(entity, ctx)
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
		ctx: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.deleteWhere(rawDelete, ctx)
	}

	/**
	 * Ether creates or updates an entity - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records saved (1 or 0)
	 */
	async save<E>(
		entity: E,
		ctx: IEntityContext,
		operationName?: OperationName,
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.save(entity, ctx)
	}

	/**
	 * Updates an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records updated (1 or 0)
	 */
	async update<E>(
		entity: E,
		ctx: IEntityContext,
		operationName?: OperationName,
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.update(entity, ctx)
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
		ctx: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.updateColumnsWhere(rawUpdateColumns, ctx)
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
		ctx: IEntityContext
	): Promise<number> {
		const dbFacade = await container(this)
			.get(DB_FACADE)

		return await dbFacade.updateWhere(rawUpdate, ctx)
	}
}

DI.set(AIR_DB, AirportDatabase)

export function injectAirportDatabase(): void {
	console.log('Injecting AirportDatabase')
}
