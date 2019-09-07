import {
	AIR_DB,
	IAirportDatabase,
	ISchemaUtils,
	Q_METADATA_UTILS,
	SCHEMA_UTILS
}                            from '@airport/air-control'
import {DI}                  from '@airport/di'
import {
	InternalFragments,
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
	SQLDataType,
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
import {CachedSQLQuery}      from './ActiveQueries'

/**
 * Created by Papa on 9/9/2016.
 */

export abstract class SqlDriver
	implements IStoreDriver {

	// protected airDb: IAirportDatabase
	protected maxValues: number
	// public queries: ActiveQueries
	public type: StoreType

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
		(await DI.get(ACTIVE_QUERIES)).markQueriesToRerun(transaction.schemaMap)
	}

	async insertValues(
		portableQuery: PortableQuery,
		// repository?: IRepository
	): Promise<number> {
		const splitValues = this.splitValues((portableQuery.jsonQuery as JsonInsertValues).V)

		const [airDb, schemaUtils, metadataUtils] =
			      await DI.get(AIR_DB, SCHEMA_UTILS, Q_METADATA_UTILS)

		let numVals = 0
		for (const V of splitValues) {

			let sqlInsertValues = new SQLInsertValues(airDb,
				<JsonInsertValues>{
					...portableQuery.jsonQuery,
					V
				}, this.getDialect(), this)
			let sql             = sqlInsertValues.toSQL(airDb, schemaUtils, metadataUtils)
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
		const [airDb, schemaUtils, metadataUtils, activeQueries] =
			      await DI.get(AIR_DB, SCHEMA_UTILS, Q_METADATA_UTILS, ACTIVE_QUERIES)

		let fieldMap                = new SyncSchemaMap()
		let sqlDelete               = new SQLDelete(airDb,
			<JsonDelete>portableQuery.jsonQuery, this.getDialect(), this)
		let sql                     = sqlDelete.toSQL(airDb, schemaUtils, metadataUtils)
		let parameters              = sqlDelete.getParameters(portableQuery.parameterMap)
		let numberOfAffectedRecords = await this.executeNative(sql, parameters)
		activeQueries.markQueriesToRerun(fieldMap)

		return numberOfAffectedRecords
	}

	async updateWhere(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments
	): Promise<number> {
		const [airDb, schemaUtils, metadataUtils] =
			      await DI.get(AIR_DB, SCHEMA_UTILS, Q_METADATA_UTILS)

		let sqlUpdate  = new SQLUpdate(airDb,
			<JsonUpdate<any>>portableQuery.jsonQuery, this.getDialect(), this)
		let sql        = sqlUpdate.toSQL(internalFragments, airDb, schemaUtils, metadataUtils)
		let parameters = sqlUpdate.getParameters(portableQuery.parameterMap)

		return await this.executeNative(sql, parameters)
	}

	protected abstract async executeNative(
		sql: string,
		parameters: any[]
	): Promise<number>;

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		const [airDb, schemaUtils, metadataUtils] =
			      await DI.get(AIR_DB, SCHEMA_UTILS, Q_METADATA_UTILS)

		const sqlQuery   = this.getSQLQuery(portableQuery, airDb, schemaUtils)
		const sql        = sqlQuery.toSQL(internalFragments, airDb, schemaUtils, metadataUtils)
		const parameters = sqlQuery.getParameters(portableQuery.parameterMap)

		let results = await this.findNative(sql, parameters)
		results     = sqlQuery.parseQueryResults(
			airDb, schemaUtils, results, internalFragments, portableQuery.queryResultType)

		// FIXME: convert to MappedEntityArray if needed
		return <EntityArray>results
	}

	getSQLQuery(
		portableQuery: PortableQuery,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils
	): SQLQuery<any> {
		let jsonQuery      = portableQuery.jsonQuery
		let dialect        = this.getDialect()
		let resultType     = portableQuery.queryResultType
		const QueryResType = QueryResultType
		switch (resultType) {
			case QueryResType.ENTITY_GRAPH:
			case QueryResType.ENTITY_TREE:
			case QueryResType.MAPPED_ENTITY_GRAPH:
			case QueryResType.MAPPED_ENTITY_TREE:
				const dbEntity = airDb.schemas[portableQuery.schemaIndex]
					.currentVersion.entities[portableQuery.tableIndex]
				return new EntitySQLQuery(<JsonEntityQuery<any>>jsonQuery,
					dbEntity, dialect, resultType, schemaUtils, this)
			case QueryResType.FIELD:
				return new FieldSQLQuery(<JsonFieldQuery>jsonQuery, dialect, this)
			case QueryResType.SHEET:
				return new SheetSQLQuery(<JsonSheetQuery>jsonQuery, dialect, this)
			case QueryResType.TREE:
				return new TreeSQLQuery(<JsonSheetQuery>jsonQuery, dialect, this)
			case QueryResType.RAW:
			default:
				throw new Error(`Unknown QueryResultType: ${resultType}`)
		}
	}

	abstract isValueValid(
		value: any,
		sqlDataType: SQLDataType
	): boolean

	abstract async findNative(
		sqlQuery: string,
		parameters: any[]
	): Promise<any[]>;

	async findOne<E>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number,
	): Promise<E> {
		let results = await this.find(portableQuery, internalFragments)

		if (results.length > 1) {
			throw new Error(`Expecting a single result, got ${results.length}`)
		}
		if (results.length == 1) {
			return <E>results[0]
		}
		return null
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number,
	): IObservable<EntityArray> {
		let resultsSubject                 = new Subject<EntityArray>(() => {
			if (resultsSubject.subscriptions.length < 1) {
				DI.get(ACTIVE_QUERIES).then(
					activeQueries =>
						// Remove the query for the list of cached queries, that are checked every
						// time a mutation operation is run
						activeQueries.remove(portableQuery)
				)
			}
		})
		let cachedSqlQuery: CachedSQLQuery = <CachedSQLQuery><any>{
			resultsSubject: resultsSubject,
			runQuery: () => {
				this.find(portableQuery, internalFragments).then((results: E[]) => {
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
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number,
	): IObservable<E> {
		let resultsSubject                 = new Subject<E>(() => {
			if (resultsSubject.subscriptions.length < 1) {
				DI.get(ACTIVE_QUERIES).then(
					activeQueries =>
						// Remove the query for the list of cached queries, that are checked every
						// time a mutation operation is run
						activeQueries.remove(portableQuery)
				)
			}
		})
		let cachedSqlQuery: CachedSQLQuery = <CachedSQLQuery><any>{
			resultsSubject: resultsSubject,
			runQuery: () => {
				this.findOne(portableQuery, internalFragments).then((result: E) => {
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

	protected abstract getDialect(): SQLDialect;

}
