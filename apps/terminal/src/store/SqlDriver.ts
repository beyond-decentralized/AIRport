import {
	AirportDatabaseToken,
	IAirportDatabase, IUtils,
	Utils,
	UtilsToken
} from "@airport/air-control";
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
	StoreType
}                            from "@airport/ground-control";
import {ITransactionHistory} from "@airport/holding-pattern";
import {
	QuerySubject,
	SyncSchemaMap
}                            from "@airport/terminal-map";
import {Observable}          from "rxjs";
import {
	Inject,
	Service
}                            from "typedi";
import {
	ActiveQueriesToken,
	StoreDriverToken
}                            from "../InjectionTokens";
import {SQLDelete}           from "../query/sql/core/SQLDelete";
import {SQLInsertValues}     from "../query/sql/core/SQLInsertValues";
import {
	SQLDialect,
	SQLQuery
}                            from "../query/sql/core/SQLQuery";
import {SQLUpdate}           from "../query/sql/core/SQLUpdate";
import {EntitySQLQuery}      from "../query/sql/EntitySQLQuery";
import {FieldSQLQuery}       from "../query/sql/FieldSQLQuery";
import {SheetSQLQuery}       from "../query/sql/SheetSQLQuery";
import {TreeSQLQuery}        from "../query/sql/TreeSQLQuery";
import {
	ActiveQueries,
	CachedSQLQuery
}                            from "./ActiveQueries";

/**
 * Created by Papa on 9/9/2016.
 */

@Service(StoreDriverToken)
export abstract class SqlDriver
	implements IStoreDriver {

	public type: StoreType;

	constructor(
		@Inject(
			_ => AirportDatabaseToken)
		protected airportDb: IAirportDatabase,
		@Inject(
			_ => UtilsToken)
		protected utils: IUtils,
		@Inject(
			_ => ActiveQueriesToken)
		public queries: ActiveQueries
	) {
	}

	supportsLocalTransactions(): boolean {
		return true;
	}

	async abstract initialize(
		dbName: string
	): Promise<any>;

	async abstract startTransaction(): Promise<void>;

	async abstract commitTransaction(): Promise<void>;

	async abstract rollbackTransaction(): Promise<void>;

	async saveTransaction(transaction: ITransactionHistory): Promise<any> {
		this.queries.markQueriesToRerun(transaction.schemaMap);
	}

	async insertValues(
		portableQuery: PortableQuery,
		// repository?: IRepository
	): Promise<number> {
		let sqlInsertValues = new SQLInsertValues(this.airportDb, this.utils,
			<JsonInsertValues>portableQuery.jsonQuery, this.getDialect());
		let sql = sqlInsertValues.toSQL();
		let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap);

		return await this.executeNative(sql, parameters);
	}

	async deleteWhere(
		portableQuery: PortableQuery,
	): Promise<number> {
		let fieldMap = new SyncSchemaMap();
		let sqlDelete = new SQLDelete(this.airportDb, this.utils, <JsonDelete>portableQuery.jsonQuery, this.getDialect());
		let sql = sqlDelete.toSQL();
		let parameters = sqlDelete.getParameters(portableQuery.parameterMap);
		let numberOfAffectedRecords = await this.executeNative(sql, parameters);
		this.queries.markQueriesToRerun(fieldMap);

		return numberOfAffectedRecords;
	}

	async updateWhere(
		portableQuery: PortableQuery,
	): Promise<number> {
		let sqlUpdate = new SQLUpdate(this.airportDb, this.utils,
			<JsonUpdate<any>>portableQuery.jsonQuery, this.getDialect());
		let sql = sqlUpdate.toSQL();
		let parameters = sqlUpdate.getParameters(portableQuery.parameterMap);

		return await this.executeNative(sql, parameters);
	}

	protected abstract async executeNative(
		sql: string,
		parameters: any[]
	): Promise<number>;

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		const sqlQuery = this.getSQLQuery(portableQuery);
		const sql = sqlQuery.toSQL();
		const parameters = sqlQuery.getParameters(portableQuery.parameterMap);

		let results = await this.findNative(sql, parameters);
		results = sqlQuery.parseQueryResults(results, portableQuery.queryResultType);

		// FIXME: convert to MappedEntityArray if needed
		return <EntityArray>results;
	}

	getSQLQuery(portableQuery: PortableQuery): SQLQuery<any> {
		let jsonQuery = portableQuery.jsonQuery;
		let dialect = this.getDialect();
		let resultType = portableQuery.queryResultType;
		switch (resultType) {
			case QueryResultType.ENTITY_GRAPH:
			case QueryResultType.ENTITY_TREE:
				const dbEntity = this.airportDb.schemas[portableQuery.schemaIndex].entities[portableQuery.tableIndex];
				return new EntitySQLQuery(this.airportDb, this.utils,
					<JsonEntityQuery<any>>jsonQuery, dbEntity, dialect, resultType);
			case QueryResultType.FIELD:
				return new FieldSQLQuery(this.airportDb, this.utils,
					<JsonFieldQuery>jsonQuery, dialect);
			case QueryResultType.SHEET:
				return new SheetSQLQuery(this.airportDb, this.utils,
					<JsonSheetQuery>jsonQuery, dialect);
			case QueryResultType.TREE:
				return new TreeSQLQuery(this.airportDb, this.utils,
					<JsonSheetQuery>jsonQuery, dialect);
			default:
				throw `Unknown QueryResultType: ${resultType}`;
		}
	}

	protected abstract getDialect(): SQLDialect;

	protected abstract async findNative(
		sqlQuery: string,
		parameters: any[]
	): Promise<any[]>;

	async findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<E> {
		let results = await this.find(portableQuery);

		if (results.length > 1) {
			throw `Expecting a single result, got ${results.length}`;
		}
		if (results.length == 1) {
			return <E>results[0];
		}
		return null;
	}


	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		let resultsSubject = new QuerySubject<EntityArray>(() => {
			if (resultsSubject.observers.length < 1) {
				// Remove the query for the list of cached queries, that are checked every time a
				// mutation operation is run
				this.queries.remove(portableQuery);
			}
		});
		let cachedSqlQuery: CachedSQLQuery = <CachedSQLQuery><any> {
			resultsSubject: resultsSubject,
			runQuery: () => {
				this.find(portableQuery).then((results: E[]) => {
					// FIXME: convert to MappedEntityArray if needed
					resultsSubject.next(<EntityArray>results);
				});
			}
		};
		// this.queries.add(portableQuery, cachedSqlQuery);
		cachedSqlQuery.runQuery();

		return resultsSubject;
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Observable<E> {
		let resultsSubject = new QuerySubject<E>(() => {
			if (resultsSubject.observers.length < 1) {
				// Remove the query for the list of cached queries, that are checked every time a
				// mutation operation is run
				this.queries.remove(portableQuery);
			}
		});
		let cachedSqlQuery: CachedSQLQuery = <CachedSQLQuery><any> {
			resultsSubject: resultsSubject,
			runQuery: () => {
				this.findOne(portableQuery).then((result: E) => {
					resultsSubject.next(result);
				});
			}
		};
		// this.queries.add(portableQuery, cachedSqlQuery);
		cachedSqlQuery.runQuery();

		return resultsSubject;
	}

	warn(message: string) {
		console.log(message);
	}

}