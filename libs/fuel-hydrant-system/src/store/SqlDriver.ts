import {
	AIR_DB,
	IAirportDatabase,
	IUtils,
	UTILS,
}                            from '@airport/air-control'
import {DI}                  from '@airport/di'
import {
	IStoreDriver,
	JsonDelete,
	JsonEntityQuery,
	JsonFieldQuery,
	JsonInsertValues,
	JsonSheetQuery,
	JsonUpdate,
	PortableQuery,
	QueryResultType,
	QueryType,
	StoreType,
	SyncSchemaMap
}                            from '@airport/ground-control'
import {ITransactionHistory} from '@airport/holding-pattern'
import {
	IObservable,
	Subject
}                            from '@airport/observe'
import {ACTIVE_QUERIES}      from '../diTokens'
import {SQLDelete}           from '../sql/core/SQLDelete'
import {SQLInsertValues}     from '../sql/core/SQLInsertValues'
import {
	SQLDialect,
	SQLQuery
}                            from '../sql/core/SQLQuery'
import {SQLUpdate}           from '../sql/core/SQLUpdate'
import {EntitySQLQuery}      from '../sql/EntitySQLQuery'
import {FieldSQLQuery}       from '../sql/FieldSQLQuery'
import {SheetSQLQuery}       from '../sql/SheetSQLQuery'
import {TreeSQLQuery}        from '../sql/TreeSQLQuery'
import {
	ActiveQueries,
	CachedSQLQuery
}                            from './ActiveQueries'

/**
 * Created by Papa on 9/9/2016.
 */

export abstract class SqlDriver
	implements IStoreDriver {

	protected airDb: IAirportDatabase
	protected maxValues: number
	public queries: ActiveQueries
	public type: StoreType
	protected utils: IUtils

	constructor() {
		DI.get((
			airportDatabase,
			activeQueries,
			utils
		) => {
			this.airDb   = airportDatabase
			this.queries = activeQueries
			this.utils   = utils
		}, AIR_DB, ACTIVE_QUERIES, UTILS)
	}

	supportsLocalTransactions(): boolean {
		return true
	}

	async abstract initialize(
		dbName: string
	): Promise<any>;

	async abstract transact(keepAlive?: boolean): Promise<void>;

	async abstract commit(): Promise<void>;

	async abstract rollback(): Promise<void>;

	async saveTransaction(transaction: ITransactionHistory): Promise<any> {
		this.queries.markQueriesToRerun(transaction.schemaMap)
	}

	async insertValues(
		portableQuery: PortableQuery,
		// repository?: IRepository
	): Promise<number> {
		const splitValues = this.splitValues((portableQuery.jsonQuery as JsonInsertValues).V)

		let numVals = 0
		for (const V of splitValues) {

			let sqlInsertValues = new SQLInsertValues(this.airDb, this.utils,
				<JsonInsertValues>{
					...portableQuery.jsonQuery,
					V
				}, this.getDialect())
			let sql             = sqlInsertValues.toSQL()
			let parameters      = sqlInsertValues.getParameters(portableQuery.parameterMap)

			numVals += await this.executeNative(sql, parameters)
		}

		return numVals
	}

	private splitValues(
		values: any[][]
	): any[][][] {
		const valuesInRow = values[0].length
		const numValues   = values.length * valuesInRow

		if (numValues <= this.maxValues) {
			return [values]
		}

		let numRowsPerBatch = Math.floor(this.maxValues / valuesInRow)

		const splitValues = []
		for (let i = 0; i < values.length; i += numRowsPerBatch) {
			const aSplitValues = values.slice(i, i + numRowsPerBatch)
			splitValues.push(aSplitValues)
		}

		return splitValues
	}

	async deleteWhere(
		portableQuery: PortableQuery,
	): Promise<number> {
		let fieldMap                = new SyncSchemaMap()
		let sqlDelete               = new SQLDelete(this.airDb, this.utils, <JsonDelete>portableQuery.jsonQuery, this.getDialect())
		let sql                     = sqlDelete.toSQL()
		let parameters              = sqlDelete.getParameters(portableQuery.parameterMap)
		let numberOfAffectedRecords = await this.executeNative(sql, parameters)
		this.queries.markQueriesToRerun(fieldMap)

		return numberOfAffectedRecords
	}

	async updateWhere(
		portableQuery: PortableQuery,
	): Promise<number> {
		let sqlUpdate  = new SQLUpdate(this.airDb, this.utils,
			<JsonUpdate<any>>portableQuery.jsonQuery, this.getDialect())
		let sql        = sqlUpdate.toSQL()
		let parameters = sqlUpdate.getParameters(portableQuery.parameterMap)

		return await this.executeNative(sql, parameters)
	}

	protected abstract async executeNative(
		sql: string,
		parameters: any[]
	): Promise<number>;

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		const sqlQuery   = this.getSQLQuery(portableQuery)
		const sql        = sqlQuery.toSQL()
		const parameters = sqlQuery.getParameters(portableQuery.parameterMap)

		let results = await this.findNative(sql, parameters)
		results     = sqlQuery.parseQueryResults(results, portableQuery.queryResultType)

		// FIXME: convert to MappedEntityArray if needed
		return <EntityArray>results
	}

	getSQLQuery(portableQuery: PortableQuery): SQLQuery<any> {
		let jsonQuery  = portableQuery.jsonQuery
		let dialect    = this.getDialect()
		let resultType = portableQuery.queryResultType
		const QueryResType = QueryResultType
		switch (resultType) {
			case QueryResType.ENTITY_GRAPH:
			case QueryResType.ENTITY_TREE:
			case QueryResType.MAPPED_ENTITY_GRAPH:
			case QueryResType.MAPPED_ENTITY_TREE:
				const dbEntity = this.airDb.schemas[portableQuery.schemaIndex]
					.currentVersion.entities[portableQuery.tableIndex]
				return new EntitySQLQuery(this.airDb, this.utils,
					<JsonEntityQuery<any>>jsonQuery, dbEntity, dialect, resultType)
			case QueryResType.FIELD:
				return new FieldSQLQuery(this.airDb, this.utils,
					<JsonFieldQuery>jsonQuery, dialect)
			case QueryResType.SHEET:
				return new SheetSQLQuery(this.airDb, this.utils,
					<JsonSheetQuery>jsonQuery, dialect)
			case QueryResType.TREE:
				return new TreeSQLQuery(this.airDb, this.utils,
					<JsonSheetQuery>jsonQuery, dialect)
			case QueryResType.RAW:
			default:
				throw `Unknown QueryResultType: ${resultType}`
		}
	}

	protected abstract getDialect(): SQLDialect;

	abstract async findNative(
		sqlQuery: string,
		parameters: any[]
	): Promise<any[]>;

	async findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<E> {
		let results = await this.find(portableQuery)

		if (results.length > 1) {
			throw `Expecting a single result, got ${results.length}`
		}
		if (results.length == 1) {
			return <E>results[0]
		}
		return null
	}


	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<EntityArray> {
		let resultsSubject                 = new Subject<EntityArray>(() => {
			if (resultsSubject.subscriptions.length < 1) {
				// Remove the query for the list of cached queries, that are checked every time a
				// mutation operation is run
				this.queries.remove(portableQuery)
			}
		})
		let cachedSqlQuery: CachedSQLQuery = <CachedSQLQuery><any>{
			resultsSubject: resultsSubject,
			runQuery: () => {
				this.find(portableQuery).then((results: E[]) => {
					// FIXME: convert to MappedEntityArray if needed
					resultsSubject.next(<EntityArray>results)
				})
			}
		}
		// this.queries.add(portableQuery, cachedSqlQuery);
		cachedSqlQuery.runQuery()

		return resultsSubject
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<E> {
		let resultsSubject                 = new Subject<E>(() => {
			if (resultsSubject.subscriptions.length < 1) {
				// Remove the query for the list of cached queries, that are checked every time a
				// mutation operation is run
				this.queries.remove(portableQuery)
			}
		})
		let cachedSqlQuery: CachedSQLQuery = <CachedSQLQuery><any>{
			resultsSubject: resultsSubject,
			runQuery: () => {
				this.findOne(portableQuery).then((result: E) => {
					resultsSubject.next(result)
				})
			}
		}
		// this.queries.add(portableQuery, cachedSqlQuery);
		cachedSqlQuery.runQuery()

		return resultsSubject
	}

	warn(message: string) {
		console.log(message)
	}

	abstract doesTableExist(tableName: string): Promise<boolean>

	abstract dropTable(
		tableName: string
	): Promise<boolean>

	abstract query(
		queryType: QueryType,
		query: string,
		params: any,
		saveTransaction?: boolean
	): Promise<any>;

}
