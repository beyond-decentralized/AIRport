import {
	AIR_DB,
	FunctionsAndOperators,
	IAirportDatabase,
	IDatabaseFacade,
	INonEntityFind,
	INonEntityFindOne,
	INonEntitySearch,
	INonEntitySearchOne,
	NonEntityFind,
	NonEntityFindOne,
	NonEntitySearch,
	NonEntitySearchOne,
	QSchema
}                 from '@airport/air-control'
import {DI}       from '@airport/di'
import {DbSchema} from '@airport/ground-control'

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
}

DI.set(AIR_DB, AirportDatabase)
