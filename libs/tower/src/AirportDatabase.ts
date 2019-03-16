import {
	AIRPORT_DATABASE,
	AirportDatabaseToken,
	dbConst,
	FunctionsAndOperators,
	IAirportDatabase,
	IDatabaseFacade,
	INonEntityFind,
	INonEntityFindOne,
	INonEntitySearch,
	INonEntitySearchOne,
	QSchema
}           from '@airport/air-control'
import {DI} from '@airport/di'
import {
	DbSchema,
	JsonSchema
}           from '@airport/ground-control'

export class AirportDatabase
	implements IAirportDatabase {

	functions: FunctionsAndOperators
	F: FunctionsAndOperators

	schemas: DbSchema[]
	S: DbSchema[]
	schemaMapByName: { [name: string]: DbSchema }
	SM: { [name: string]: DbSchema }

	qSchemas: QSchema[]
	Q: QSchema[]
	qSchemaMapByName: { [name: string]: QSchema }
	QM: { [name: string]: QSchema }

	private databaseMap: { [databaseName: string]: IDatabaseFacade } = {}
	private dbNames: string[]                                        = []
	private dbNameSet: { [databaseName: string]: boolean }           = {}
	private schemaTuples: [JsonSchema, QSchema][]                    = []

	private currentDbName = dbConst.DEFAULT_DB

	registerDatabase(
		facade: IDatabaseFacade
	) {
		if (!this.dbNameSet[facade.name]) {
			this.dbNames.push(facade.name)
		}
		this.databaseMap[facade.name] = facade
		this.dbNameSet[facade.name]   = true
	}

	registerSchema(
		schema: JsonSchema,
		qSchema: QSchema
	): void {
		this.schemaTuples.push([schema, qSchema])
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

	get find(): INonEntityFind {
		return this.db.find
	}

	get findOne(): INonEntityFindOne {
		return this.db.findOne
	}

	get search(): INonEntitySearch {
		return this.db.search
	}

	get searchOne(): INonEntitySearchOne {
		return this.db.searchOne
	}

}

DI.set(AIRPORT_DATABASE, AirportDatabase)
