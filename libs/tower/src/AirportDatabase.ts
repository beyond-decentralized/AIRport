import {
	AIR_DB,
	DB_FACADE,
	FunctionsAndOperators,
	IAirportDatabase,
	IDatabaseFacade,
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
	QSchema,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns
}           from '@airport/air-control'
import {DI} from '@airport/di'
import {
	CascadeOverwrite,
	DbEntity,
	DbSchema,
	DistributionStrategy,
	PlatformType
}           from '@airport/ground-control'

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
				throw `Did not find database '${this.currentDbName}'`
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
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.addRepository(name, url, platform,
			platformConfig, distributionStrategy)
	}

	/**
	 * Creates an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records created (1 or 0)
	 */
	async create<E>(
		dbEntity: DbEntity,
		entity: E,
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.create(dbEntity, entity)
	}

	/**
	 * Creates an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records created
	 */
	async bulkCreate<E>(
		dbEntity: DbEntity,
		entities: E[],
		checkIfProcessed: boolean, // defaults to true
		cascadeOverwrite: CascadeOverwrite, // defaults to false
		ensureGeneratedValues?: boolean // for internal use only, needed at initial schema
	                                  // creation
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.bulkCreate(dbEntity, entities, checkIfProcessed,
					cascadeOverwrite, ensureGeneratedValues)
	}

	async insertColumnValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>
		},
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.insertColumnValues(dbEntity, rawInsertValues)
	}

	async insertValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.insertValues(dbEntity, rawInsertValues)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>
		},
	): Promise<number[] | string[] | number[][] | string[][]> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.insertColumnValuesGenerateIds(dbEntity, rawInsertValues)
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
	): Promise<number[] | string[] | number[][] | string[][]> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.insertValuesGenerateIds(dbEntity, rawInsertValues)
	}

	/**
	 * Deletes an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records deleted (1 or 0)
	 */
	async delete<E>(
		dbEntity: DbEntity,
		entity: E,
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.delete(dbEntity, entity)
	}

	/**
	 * Creates an entity with a where clause - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records deleted
	 */
	async deleteWhere<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		},
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.deleteWhere(dbEntity, rawDelete)
	}

	/**
	 * Ether creates or updates an entity - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records saved (1 or 0)
	 */
	async save<E>(
		dbEntity: DbEntity,
		entity: E,
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.save(dbEntity, entity)
	}

	/**
	 * Updates an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records updated (1 or 0)
	 */
	async update<E>(
		dbEntity: DbEntity,
		entity: E,
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.update(dbEntity, entity)
	}

	/**
	 * Updates an entity with a where clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawUpdateColumns: RawUpdateColumns<IEUC, IQE>
			| {
			(...args: any[]): RawUpdateColumns<IEUC, IQE>
		},
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.updateColumnsWhere(dbEntity, rawUpdateColumns)
	}

	/**
	 * Updates an entity with a where clause, using a property based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
			(...args: any[]): RawUpdate<IEUP, IQE>
		},
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)

		return await dbFacade.updateWhere(dbEntity, rawUpdate)
	}
}

DI.set(AIR_DB, AirportDatabase)
