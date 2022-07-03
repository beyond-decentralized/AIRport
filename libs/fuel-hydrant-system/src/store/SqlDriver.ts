import { doEnsureContext, IAirportDatabase, IApplicationUtils, IQMetadataUtils, IRelationManager, IUtils } from '@airport/air-traffic-control';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	Application_Name,
	DbApplication,
	DbEntity,
	Domain_Name,
	FullApplication_Name,
	IDbApplicationUtils,
	IEntityStateManager,
	InternalFragments,
	JsonDelete,
	JsonEntityQuery,
	JsonFieldQuery,
	JsonInsertValues,
	JsonQuery,
	JsonSheetQuery,
	JsonUpdate,
	PortableQuery,
	QueryResultType,
	QueryType,
	SQLDataType,
	StoreType,
	SyncApplicationMap,
} from '@airport/ground-control';
import {
	Observable,
	Subject
} from 'rxjs';
import {
	IStoreDriver,
	ITransaction,
	ITransactionContext,
	ITransactionManager
} from '@airport/terminal-map';
import { SQLDelete } from '../sql/core/SQLDelete';
import { SQLInsertValues } from '../sql/core/SQLInsertValues';
import {
	SQLDialect,
	SQLQuery
} from '../sql/core/SQLQuery';
import { SQLUpdate } from '../sql/core/SQLUpdate';
import { EntitySQLQuery } from '../sql/EntitySQLQuery';
import { FieldSQLQuery } from '../sql/FieldSQLQuery';
import { SheetSQLQuery } from '../sql/SheetSQLQuery';
import { TreeSQLQuery } from '../sql/TreeSQLQuery';
import { CachedSQLQuery, IActiveQueries } from './ActiveQueries';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor';
import { IValidator } from '../validation/Validator';
import { ISubStatementSqlGenerator } from '../sql/core/SubStatementSqlGenerator';
import { IObjectResultParserFactory } from '../result/entity/ObjectResultParserFactory';

/**
 * Created by Papa on 9/9/2016.
 */
@Injected()
export abstract class SqlDriver
	implements IStoreDriver {

	@Inject()
	activeQueries: IActiveQueries

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	objectResultParserFactory: IObjectResultParserFactory

	@Inject()
	qMetadataUtils: IQMetadataUtils

	@Inject()
	qValidator: IValidator

	@Inject()
	relationManager: IRelationManager

	@Inject()
	transactionManager: ITransactionManager

	@Inject()
	sqlQueryAdapter: ISQLQueryAdaptor

	@Inject()
	subStatementQueryGenerator: ISubStatementSqlGenerator

	@Inject()
	utils: IUtils

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
		return this.getTableName(dbEntity.applicationVersion.application, dbEntity, context);
	}

	abstract getSelectQuerySuffix(
		jsonQuery: JsonQuery,
		context: IFuelHydrantContext,
	): string

	getTableName(
		application: {
			domain: Domain_Name | {
				name: Domain_Name
			};
			name: Application_Name;
			fullName?: FullApplication_Name;
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
		let fullApplication_Name;
		if ((application as DbApplication).fullName) {
			fullApplication_Name = (application as DbApplication).fullName;
		} else {
			fullApplication_Name = this.dbApplicationUtils.getFullApplication_Name(application);
		}
		return this.composeTableName(fullApplication_Name, theTableName, context);
	}

	abstract composeTableName(
		applicationName: string,
		tableName: string,
		context: IFuelHydrantContext,
	): string;

	abstract initialize(
		dbName: string,
		context: IFuelHydrantContext,
	): Promise<any>;

	abstract setupTransaction(
		context: ITransactionContext,
		parentTransaction?: ITransaction,
	): Promise<ITransaction>

	protected async internalSetupTransaction(
		transaction: ITransaction,
		context: IFuelHydrantContext,
	): Promise<void> {
		await this.ensureContext(context)
	}

	async tearDownTransaction(
		transaction: ITransaction,
		context: ITransactionContext,
	): Promise<void> {
		if (transaction.childTransaction) {
			this.tearDownTransaction(transaction.childTransaction, context)
		}
		if (transaction.parentTransaction) {
			transaction.parentTransaction.childTransaction = null
			transaction.parentTransaction = null
		}
	}

	async startTransaction(
		transaction: ITransaction,
		context?: IFuelHydrantContext,
	): Promise<void> {
		await this.ensureContext(context)
		try {
			await this.internalStartTransaction(transaction)
		} catch (e) {
			await this.tearDownTransaction(transaction, context)
			console.error(e)
			throw e
		}
	}

	abstract internalStartTransaction(
		transaction: ITransaction,
		context?: IFuelHydrantContext,
	): Promise<void>

	async commit(
		transaction: ITransaction,
		context?: IFuelHydrantContext,
	): Promise<void> {
		await this.ensureContext(context)
		try {
			await this.internalCommit(transaction)
		} catch (e) {
			console.error(e)
			try {
				await this.internalRollback(transaction)
			} catch (rollbackError) {
				console.error(rollbackError)
			}
			throw e
		} finally {
			await this.tearDownTransaction(transaction, context)
		}
	}

	abstract internalCommit(
		transaction: ITransaction,
		context?: ITransactionContext,
	): Promise<void>

	async rollback(
		transaction: ITransaction,
		context?: IFuelHydrantContext,
	): Promise<void> {
		await this.ensureContext(context)
		try {
			await this.internalRollback(transaction)
		} catch (e) {
			console.error(e)
			// Do not re-throw the exception, rollback is final (at least for now)
		} finally {
			await this.tearDownTransaction(transaction, context)
		}
	}

	abstract internalRollback(
		transaction: ITransaction,
		context?: IFuelHydrantContext,
	): Promise<void>

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
			}, this.getDialect(context),
				this.airportDatabase,
				this.applicationUtils,
				this.entityStateManager,
				this.qMetadataUtils,
				this.qValidator,
				this.relationManager,
				this.sqlQueryAdapter,
				this,
				this.subStatementQueryGenerator,
				this.utils,
				context);
			let sql = sqlInsertValues.toSQL(context);
			let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap, context);

			numVals += await this.executeNative(sql, parameters, context);
		}

		return numVals;
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IFuelHydrantContext,
	): Promise<number> {
		let fieldMap = new SyncApplicationMap();
		let sqlDelete = new SQLDelete(
			<JsonDelete>portableQuery.jsonQuery, this.getDialect(context),
			this.airportDatabase,
			this.applicationUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.relationManager,
			this.sqlQueryAdapter,
			this,
			this.subStatementQueryGenerator,
			this.utils,
			context);
		let sql = sqlDelete.toSQL(context);
		let parameters = sqlDelete.getParameters(portableQuery.parameterMap, context);
		let numberOfAffectedRecords = await this.executeNative(sql, parameters, context);
		this.activeQueries.markQueriesToRerun(fieldMap);

		return numberOfAffectedRecords;
	}

	async updateWhere(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): Promise<number> {
		let sqlUpdate = new SQLUpdate(
			<JsonUpdate<any>>portableQuery.jsonQuery, this.getDialect(context),
			this.airportDatabase,
			this.applicationUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.relationManager,
			this.sqlQueryAdapter,
			this,
			this.subStatementQueryGenerator,
			this.utils,
			context);
		let sql = sqlUpdate.toSQL(internalFragments, context);
		let parameters = sqlUpdate.getParameters(portableQuery.parameterMap, context);

		return await this.executeNative(sql, parameters, context);
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		context = await this.ensureContext(context);
		const sqlQuery = this.getSQLQuery(portableQuery, context);
		const sql = sqlQuery.toSQL(internalFragments, context);
		const parameters = sqlQuery.getParameters(portableQuery.parameterMap, context);

		let results = await this.findNative(sql, parameters, context);
		results = await sqlQuery.parseQueryResults(
			results, internalFragments, portableQuery.queryResultType, context);

		return <EntityArray>results;
	}

	getSQLQuery(
		portableQuery: PortableQuery,
		context: IFuelHydrantContext,
	): SQLQuery<any> {
		let jsonQuery = portableQuery.jsonQuery;
		let dialect = this.getDialect(context);
		let resultType = portableQuery.queryResultType;
		const QueryResType = QueryResultType;
		switch (resultType) {
			case QueryResType.ENTITY_GRAPH:
			case QueryResType.ENTITY_TREE:
				const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
					.currentVersion[0].applicationVersion.entities[portableQuery.tableIndex];
				return new EntitySQLQuery(<JsonEntityQuery<any>>jsonQuery,
					dbEntity, dialect, resultType,
					this.airportDatabase,
					this.applicationUtils,
					this.entityStateManager,
					this.objectResultParserFactory,
					this.qMetadataUtils,
					this.qValidator,
					this.relationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementQueryGenerator,
					this.utils,
					context);
			case QueryResType.FIELD:
				return new FieldSQLQuery(<JsonFieldQuery>jsonQuery, dialect,
					this.airportDatabase,
					this.applicationUtils,
					this.entityStateManager,
					this.qMetadataUtils,
					this.qValidator,
					this.relationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementQueryGenerator,
					this.utils,
					context);
			case QueryResType.SHEET:
				return new SheetSQLQuery(<JsonSheetQuery>jsonQuery, dialect,
					this.airportDatabase,
					this.applicationUtils,
					this.entityStateManager,
					this.qMetadataUtils,
					this.qValidator,
					this.relationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementQueryGenerator,
					this.utils,
					context);
			case QueryResType.TREE:
				return new TreeSQLQuery(<JsonSheetQuery>jsonQuery, dialect,
					this.airportDatabase,
					this.applicationUtils,
					this.entityStateManager,
					this.qMetadataUtils,
					this.qValidator,
					this.relationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementQueryGenerator,
					this.utils,
					context);
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
		// 					// Remove the query for the list of cached queries, that are checked every
		// 					// time a mutation operation is run
		// 					this.activeQueries.remove(portableQuery)
		// 	}
		// })
		let cachedSqlQuery: CachedSQLQuery = <CachedSQLQuery><any>{
			resultsSubject: resultsSubject,
			runQuery: () => {
				this.find(portableQuery, internalFragments, context)
					.then((results: E[]) => {
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
		// 					// Remove the query for the list of cached queries, that are checked every
		// 					// time a mutation operation is run
		// 					this.activeQueries.remove(portableQuery)
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
		applicationName: string,
		tableName: string,
		context: IFuelHydrantContext,
	): Promise<boolean>

	abstract dropTable(
		applicationName: string,
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
		const numValues = values.length * valuesInRow;

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
		return <IFuelHydrantContext>doEnsureContext(context);
	}

}
