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
}                            from '@airport/air-control'
import {
	IQOrderableField,
	NON_ENTITY_FIND,
	RawFieldQuery
}                            from '@airport/air-control'
import {NON_ENTITY_FIND_ONE} from '@airport/air-control'
import {
	ITreeEntity,
	RawSheetQuery,
	RawTreeQuery
} from '@airport/air-control/lib/src'
import {DI}                  from '@airport/di'
import {
	DbSchema,
	getSchemaName
}                            from '@airport/ground-control'

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

	async findAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): Promise<any[]> {
		const nonEntityFind = await DI.get(NON_ENTITY_FIND)

		return await nonEntityFind.field(rawFieldQuery)
	}

	findOneAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	) {
		const nonEntityFindOne = await DI.get(NON_ENTITY_FIND_ONE)

		return await nonEntityFindOne.field(rawFieldQuery)
	}

	findAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
	): Promise<any[][]> {
		const nonEntityFind = await DI.get(NON_ENTITY_FIND)

		return await nonEntityFind.sheet(rawSheetQuery)
	}

	findOneAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
	): Promise<any[]> {
		const nonEntityFindOne = await DI.get(NON_ENTITY_FIND_ONE)

		return await nonEntityFindOne.sheet(rawSheetQuery)
	}

	findAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<ITE[]> {
		const nonEntityFind = await DI.get(NON_ENTITY_FIND)

		return await nonEntityFind.tree(rawTreeQuery)
	}

	findOneAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<ITE> {
		const nonEntityFindOne = await DI.get(NON_ENTITY_FIND_ONE)

		return await nonEntityFindOne.tree(rawTreeQuery)
	}

}

DI.set(AIR_DB, AirportDatabase)
