import { doEnsureContext } from '@airport/air-control';
import {
	container
}                          from '@airport/di';
import {
	DbEntity,
	DomainName,
	getSchemaName,
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
	SchemaName,
	SchemaStatus,
	SQLDataType,
	StoreType,
	SyncSchemaMap
}                          from '@airport/ground-control';
import {
	Observable,
	Subject
}                          from 'rxjs';
import {
	OPERATION_CONTEXT_LOADER
}                          from '@airport/ground-control';
import {
	ITransaction
}                          from '@airport/terminal-map';
import { SQLDelete }       from '../sql/core/SQLDelete';
import { SQLInsertValues } from '../sql/core/SQLInsertValues';
import {
	SQLDialect,
	SQLQuery
}                          from '../sql/core/SQLQuery';
import { SQLUpdate }       from '../sql/core/SQLUpdate';
import { EntitySQLQuery }  from '../sql/EntitySQLQuery';
import { FieldSQLQuery }   from '../sql/FieldSQLQuery';
import { SheetSQLQuery }   from '../sql/SheetSQLQuery';
import { TreeSQLQuery }    from '../sql/TreeSQLQuery';
import { ACTIVE_QUERIES }  from '../tokens';
import { CachedSQLQuery }  from './ActiveQueries';
import { IFuelHydrantContext } from '../FuelHydrantContext';

/**
 * Created by Papa on 9/9/2016.
 */

export abstract class SqlDriver
	implements IStoreDriver {

	// public queries: ActiveQueries
	public type: StoreType;
	// protected airDb: IAirportDatabase
	protected maxValues: number;

	supportsLocalTransactions(
		context: IFuelHydrantContext,
	): boolean {
		return true;
	}

	getEntityTableName(
		dbEntity: DbEntity,
		context: IFuelHydrantContext,
	): string {
		return this.getTableName(dbEntity.schemaVersion.schema, dbEntity, context);
	}

	getTableName(
		schema: {
			domain: DomainName | {
				name: DomainName
			}; name: SchemaName; status?: SchemaStatus;
		},
		table: {
			name: string, tableConfig?: {
				name?: string
			}
		},
		context: IFuelHydrantContext,
	): string {
		let theTableName = table.name;
		if (table.tableConfig && table.tableConfig.name) {
			theTableName = table.tableConfig.name;
		}
		let schemaName;
		if (schema.status) {
			schemaName = schema.name;
		} else {
			schemaName = getSchemaName(schema);
		}
		return this.composeTableName(schemaName, theTableName, context);
	}

	abstract composeTableName(
		schemaName: string,
		tableName: string,
		context: IFuelHydrantContext,
	): string;

	abstract initialize(
		dbName: string,
		context: IFuelHydrantContext,
	): Promise<any>;

	abstract transact(
		callback: {
			(
				transaction: ITransaction
			): Promise<void>
		},
		context: IFuelHydrantContext,
	): Promise<void>;

	async insertValues(
		portableQuery: PortableQuery,
		context: IFuelHydrantContext,
		cachedSqlQueryId?: number,
		// repository?: IRepository
	): Promise<number> {
		const splitValues = this.splitValues((portableQuery.jsonQuery as JsonInsertValues).V, context);

		let numVals = 0;
		for (const V of splitValues) {

			let sqlInsertValues = new SQLInsertValues(<JsonInsertValues>{
				...portableQuery.jsonQuery,
				V
			}, this.getDialect(context), context);
			let sql             = sqlInsertValues.toSQL(context);
			let parameters      = sqlInsertValues.getParameters(portableQuery.parameterMap, context);

			numVals += await this.executeNative(sql, parameters, context);
		}

		return numVals;
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IFuelHydrantContext,
	): Promise<number> {
		const activeQueries = await container(this)
			.get(ACTIVE_QUERIES);

		let fieldMap                = new SyncSchemaMap();
		let sqlDelete               = new SQLDelete(
			<JsonDelete>portableQuery.jsonQuery, this.getDialect(context), context);
		let sql                     = sqlDelete.toSQL(context);
		let parameters              = sqlDelete.getParameters(portableQuery.parameterMap, context);
		let numberOfAffectedRecords = await this.executeNative(sql, parameters, context);
		activeQueries.markQueriesToRerun(fieldMap);

		return numberOfAffectedRecords;
	}

	async updateWhere(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): Promise<number> {
		let sqlUpdate  = new SQLUpdate(
			<JsonUpdate<any>>portableQuery.jsonQuery, this.getDialect(context), context);
		let sql        = sqlUpdate.toSQL(internalFragments, context);
		let parameters = sqlUpdate.getParameters(portableQuery.parameterMap, context);

		return await this.executeNative(sql, parameters, context);
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		context          = await this.ensureContext(context);
		const sqlQuery   = this.getSQLQuery(portableQuery, context);
		const sql        = sqlQuery.toSQL(internalFragments, context);
		const parameters = sqlQuery.getParameters(portableQuery.parameterMap, context);

		let results = await this.findNative(sql, parameters, context);
		results     = await sqlQuery.parseQueryResults(
			results, internalFragments, portableQuery.queryResultType, context);

		// FIXME: convert to MappedEntityArray if needed
		return <EntityArray>results;
	}

	getSQLQuery(
		portableQuery: PortableQuery,
		context: IFuelHydrantContext,
	): SQLQuery<any> {
		let jsonQuery      = portableQuery.jsonQuery;
		let dialect        = this.getDialect(context);
		let resultType     = portableQuery.queryResultType;
		const QueryResType = QueryResultType;
		switch (resultType) {
			case QueryResType.ENTITY_GRAPH:
			case QueryResType.ENTITY_TREE:
			case QueryResType.MAPPED_ENTITY_GRAPH:
			case QueryResType.MAPPED_ENTITY_TREE:
				const dbEntity = context.ioc.airDb.schemas[portableQuery.schemaIndex]
					.currentVersion[0].schemaVersion.entities[portableQuery.tableIndex];
				return new EntitySQLQuery(<JsonEntityQuery<any>>jsonQuery,
					dbEntity, dialect, resultType, context);
			case QueryResType.FIELD:
				return new FieldSQLQuery(<JsonFieldQuery>jsonQuery, dialect, context);
			case QueryResType.SHEET:
				return new SheetSQLQuery(<JsonSheetQuery>jsonQuery, dialect, context);
			case QueryResType.TREE:
				return new TreeSQLQuery(<JsonSheetQuery>jsonQuery, dialect, context);
			case QueryResType.RAW:
			default:
				throw new Error(`Unknown QueryResultType: ${resultType}`);
		}
	}

	abstract isValueValid(
		value: any,
		sqlDataType: SQLDataType,
		context: IFuelHydrantContext,
	): boolean

	abstract findNative(
		sqlQuery: string,
		parameters: any[],
		context: IFuelHydrantContext,
	): Promise<any[]>;

	async findOne<E>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
		cachedSqlQueryId?: number,
	): Promise<E> {
		let results = await this.find(portableQuery, internalFragments, context);

		if (results.length > 1) {
			throw new Error(`Expecting a single result, got ${results.length}`);
		}
		if (results.length == 1) {
			return <E>results[0];
		}
		return null;
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		let resultsSubject = new Subject<EntityArray>();

		// TODO: Remove the query for the list of cached queries, that are checked every
		//    time a mutation operation is run

		// let resultsSubject                 = new Subject<EntityArray>(() => {
		// 	if (resultsSubject.subscriptions.length < 1) {
		// 		container(this)
		// 			.get(ACTIVE_QUERIES)
		// 			.then(
		// 				activeQueries =>
		// 					// Remove the query for the list of cached queries, that are checked every
		// 					// time a mutation operation is run
		// 					activeQueries.remove(portableQuery)
		// 			)
		// 	}
		// })
		let cachedSqlQuery: CachedSQLQuery = <CachedSQLQuery><any>{
			resultsSubject: resultsSubject,
			runQuery: () => {
				this.find(portableQuery, internalFragments, context)
					.then((results: E[]) => {
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
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
		cachedSqlQueryId?: number,
	): Observable<E> {
		let resultsSubject = new Subject<E>();
		// TODO: Remove the query for the list of cached queries, that are checked every
		//       time a mutation operation is run
		// let resultsSubject                 = new Subject<E>(() => {
		// 	if (resultsSubject.subscriptions.length < 1) {
		// 		container(this)
		// 			.get(ACTIVE_QUERIES)
		// 			.then(
		// 				activeQueries =>
		// 					// Remove the query for the list of cached queries, that are checked every
		// 					// time a mutation operation is run
		// 					activeQueries.remove(portableQuery)
		// 			);
		// 	}
		// });
		let cachedSqlQuery: CachedSQLQuery = <CachedSQLQuery><any>{
			resultsSubject: resultsSubject,
			runQuery: () => {
				this.findOne(portableQuery, internalFragments, context)
					.then((result: E) => {
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

	abstract doesTableExist(
		schemaName: string,
		tableName: string,
		context: IFuelHydrantContext,
	): Promise<boolean>

	abstract dropTable(
		schemaName: string,
		tableName: string,
		context: IFuelHydrantContext,
	): Promise<boolean>

	abstract query(
		queryType: QueryType,
		query: string,
		params: any,
		context: IFuelHydrantContext,
		saveTransaction?: boolean
	): Promise<any>

	abstract isServer(
		context: IFuelHydrantContext,
	): boolean

	protected abstract executeNative(
		sql: string,
		parameters: any[],
		context: IFuelHydrantContext,
	): Promise<number>;

	protected abstract getDialect(
		context: IFuelHydrantContext,
	): SQLDialect;

	protected splitValues(
		values: any[][],
		context: IFuelHydrantContext,
	): any[][][] {
		const valuesInRow = values[0].length;
		const numValues   = values.length * valuesInRow;

		if (numValues <= this.maxValues) {
			return [values];
		}

		let numRowsPerBatch = Math.floor(this.maxValues / valuesInRow);

		const splitValues = [];
		for (let i = 0; i < values.length; i += numRowsPerBatch) {
			const aSplitValues = values.slice(i, i + numRowsPerBatch);
			splitValues.push(aSplitValues);
		}

		return splitValues;
	}

	protected async ensureContext(
		context: IFuelHydrantContext
	): Promise<IFuelHydrantContext> {
		context = <IFuelHydrantContext>doEnsureContext(context);
		await this.ensureIocContext(context);

		return context;
	}

	protected async ensureIocContext(
		context: IFuelHydrantContext
	): Promise<void> {
		const operationContextLoader = await container(this)
			.get(OPERATION_CONTEXT_LOADER);
		await operationContextLoader.ensure(context);
	}

}
