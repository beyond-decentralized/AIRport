import {
	AIR_DB,
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
	DB_SCHEMA_UTILS,
	DbSchema
}           from '@airport/ground-control'

export class AirportDatabase
	implements IAirportDatabase {

	functions: FunctionsAndOperators
	F: FunctionsAndOperators

	schemas: DbSchema[] = []
	S: DbSchema[]

	qSchemas: QSchema[] = []
	Q: QSchema[]

	QM: { [name: string]: QSchema } = {}

	private databaseMap: { [databaseName: string]: IDatabaseFacade } = {}
	private dbNames: string[]                                        = []
	private dbNameSet: { [databaseName: string]: boolean }           = {}

	private currentDbName = dbConst.DEFAULT_DB

	constructor() {
		this.S = this.schemas
		this.Q = this.qSchemas
	}

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
			const schemaName = (await DI.getP(DB_SCHEMA_UTILS)).getSchemaNameFromDomainAndJsonSchemaNames(
				qSchema.domain, qSchema.name
			)
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

DI.set(AIR_DB, AirportDatabase)
