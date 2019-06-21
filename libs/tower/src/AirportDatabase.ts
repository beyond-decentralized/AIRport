import {
	AIR_DB,
	DistinguishableQuery,
	ENTITY_UTILS,
	FIELD_UTILS,
	FieldQuery,
	FunctionsAndOperators,
	IAirportDatabase,
	IQOrderableField,
	ITreeEntity,
	QSchema,
	QUERY_FACADE,
	QUERY_UTILS,
	RawFieldQuery,
	RawNonEntityQuery,
	RawSheetQuery,
	RawTreeQuery,
	SCHEMA_UTILS,
	SheetQuery,
	TreeQuery
}                     from '@airport/air-control'
import {DI}           from '@airport/di'
import {
	DbSchema,
	QueryResultType,
	TRANS_CONNECTOR
}                     from '@airport/ground-control'
import {
	IObservable,
	Observable
}                     from '@airport/observe'
import {UPDATE_CACHE} from './diTokens'

export class AirportDatabase
	implements IAirportDatabase {

	functions: FunctionsAndOperators
	F: FunctionsAndOperators

	schemas: DbSchema[] = []
	S: DbSchema[]

	qSchemas: QSchema[] = []
	Q: QSchema[]

	QM: { [name: string]: QSchema } = {}

	// private databaseMap: { [databaseName: string]: IDatabaseFacade } = {}
	// private dbNames: string[]                                        = []
	// private dbNameSet: { [databaseName: string]: boolean }           = {}

	// private currentDbName = dbConst.DEFAULT_DB

	constructor() {
		this.S = this.schemas
		this.Q = this.qSchemas
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

	async findAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): Promise<any[]> {
		return await this.find(
			rawFieldQuery, SheetQuery, QueryResultType.FIELD, false)
	}

	async findOneAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	) {
		return await this.find(
			rawFieldQuery, SheetQuery, QueryResultType.FIELD, true)
	}

	async findAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
	): Promise<any[][]> {
		if (cursorSize || callback) {
			throw `Implement!`
		}
		return await this.find(
			rawSheetQuery, SheetQuery, QueryResultType.SHEET, false)
	}

	async findOneAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
	): Promise<any[]> {
		if (cursorSize || callback) {
			throw `Implement!`
		}
		return await this.find(
			rawSheetQuery, SheetQuery, QueryResultType.SHEET, true)
	}

	async findAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<ITE[]> {
		return await this.find(
			rawTreeQuery, TreeQuery, QueryResultType.TREE, false)
	}

	async findOneAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<ITE> {
		return await this.find(
			rawTreeQuery, TreeQuery, QueryResultType.TREE, true)
	}

	searchAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): IObservable<any[]> {
		return Observable.from(this.search(
			rawFieldQuery, FieldQuery, QueryResultType.FIELD, false))
	}

	searchOneAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): IObservable<any> {
		return Observable.from(this.search(
			rawFieldQuery, FieldQuery, QueryResultType.FIELD, true))
	}

	searchAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
	): IObservable<any[][]> {
		if (cursorSize || callback) {
			throw `Implement!`
		}
		return Observable.from(this.search(
			rawSheetQuery, SheetQuery, QueryResultType.SHEET, false))
	}

	searchOneAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
	): IObservable<any[]> {
		if (cursorSize || callback) {
			throw `Implement!`
		}
		return Observable.from(this.search(
			rawSheetQuery, SheetQuery, QueryResultType.SHEET, true))
	}

	searchAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): IObservable<ITE[]> {
		return Observable.from(this.search(
			rawTreeQuery, TreeQuery, QueryResultType.TREE, false))
	}

	searchOneAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): IObservable<ITE> {
		return Observable.from(this.search(
			rawTreeQuery, TreeQuery, QueryResultType.TREE, true))
	}

	private async find<RQ extends RawNonEntityQuery, Q extends DistinguishableQuery>(
		rawQuery: RQ | { (...args: any[]): RQ },
		NonEntityQuery: new (rawQuery: RQ) => Q,
		queryResultType: QueryResultType,
		findOne: boolean
	): Promise<any> {
		const [entityUtils, fieldUtils, queryFacade, queryUtils,
			      schemaUtils, transConnector, updateCache] = await DI.get(
			ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS,
			SCHEMA_UTILS, TRANS_CONNECTOR, UPDATE_CACHE)
		rawQuery                                          = entityUtils.getQuery(rawQuery)
		const nonEntityQuery                              = new NonEntityQuery(rawQuery)

		if (findOne) {
			return await queryFacade.findOne(null, nonEntityQuery,
				queryResultType, fieldUtils, queryUtils, schemaUtils,
				transConnector, updateCache)
		}
		return await queryFacade.find(null, nonEntityQuery,
			queryResultType, fieldUtils, queryUtils, schemaUtils,
			transConnector, updateCache)
	}

	private async search<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		queryResultType: QueryResultType,
		searchOne: boolean
	): Promise<IObservable<any>> {
		const [entityUtils, fieldUtils, queryFacade, queryUtils,
			      schemaUtils, transConnector, updateCache] = await DI.get(
			ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS,
			SCHEMA_UTILS, TRANS_CONNECTOR, UPDATE_CACHE)
		const rawQuery                                    = entityUtils.getQuery(rawNonEntityQuery)
		const query: DistinguishableQuery                 = new QueryClass(rawQuery)
		if (searchOne) {
			return await queryFacade.searchOne<any>(null, query,
				queryResultType, fieldUtils, queryUtils, schemaUtils,
				transConnector, updateCache)
		}
		return await queryFacade.search<any, any[]>(null, query,
			queryResultType, fieldUtils, queryUtils, schemaUtils,
			transConnector, updateCache)
	}

}

DI.set(AIR_DB, AirportDatabase)
