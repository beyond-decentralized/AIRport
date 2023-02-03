import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils
} from '@airport/air-traffic-control';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IActiveQueries, IObservableQueryAdapter
} from '@airport/flight-number';
import {
	DbApplication_Name,
	DbApplication,
	DbEntity,
	DbDomain_Name,
	DbApplication_FullName,
	IDbApplicationUtils,
	IEntityStateManager,
	InternalFragments,
	QueryDelete,
	QueryEntity,
	QueryField,
	QueryInsertValues,
	Query,
	QuerySheet,
	QueryUpdate,
	PortableQuery,
	QueryResultType,
	QueryType,
	SQLDataType,
	StoreType,
	IAppTrackerUtils,
	SyncApplicationMap,
	IApplicationUtils,
	Dictionary,
} from '@airport/ground-control';
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
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor';
import { IValidator } from '../validation/Validator';
import { ISubStatementSqlGenerator } from '../sql/core/SubStatementSqlGenerator';
import { IObjectResultParserFactory } from '../result/entity/ObjectResultParserFactory';
import { IQueryUtils, IQueryRelationManager } from '@airport/tarmaq-query';
import { doEnsureContext } from '@airport/tarmaq-dao';

/**
 * Created by Papa on 9/9/2016.
 */
@Injected()
export abstract class SqlStoreDriver
	implements IStoreDriver {

	@Inject()
	activeQueries: IActiveQueries<SQLQuery<any>>

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	objectResultParserFactory: IObjectResultParserFactory

	@Inject()
	observableQueryAdapter: IObservableQueryAdapter

	@Inject()
	qMetadataUtils: IQMetadataUtils

	@Inject()
	queryUtils: IQueryUtils

	@Inject()
	qValidator: IValidator

	@Inject()
	relationManager: IQueryRelationManager

	@Inject()
	sqlQueryAdapter: ISQLQueryAdaptor

	@Inject()
	subStatementSqlGenerator: ISubStatementSqlGenerator

	@Inject()
	transactionManager: ITransactionManager

	@Inject()
	utils: IUtils

	public type: StoreType;
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
		return this.getTableName(dbEntity.applicationVersion.application,
			dbEntity.applicationVersion.integerVersion, dbEntity, context);
	}

	abstract getSelectQuerySuffix(
		querys: Query,
		context: IFuelHydrantContext,
	): string

	getTableName(
		application: {
			domain?: DbDomain_Name | {
				name?: DbDomain_Name
			};
			name?: DbApplication_Name;
			fullName?: DbApplication_FullName;
		},
		applicationIntegerVersion: number,
		table: {
			name?: string, tableConfig?: {
				name?: string
			}
		},
		context: IFuelHydrantContext,
	): string {
		const domainName = typeof application.domain === 'string'
			? application.domain
			: application.domain.name
		const actorApplication = context.transaction.actor.application
		if (!this.appTrackerUtils.isInternalDomain(actorApplication.domain.name)) {
			const entityHasExternalAccessPermissions = this.appTrackerUtils.entityHasExternalAccessPermissions(
				domainName,
				application.name,
				applicationIntegerVersion,
				table.name
			);
			if (!entityHasExternalAccessPermissions) {
				throw new Error(`
Domain:          ${actorApplication.domain.name}
Application:     ${actorApplication.name}

has no permissions to access:

Domain:          ${domainName}
Application:     ${application.name},
Integer Version: ${applicationIntegerVersion}
Entity:          ${table.name}
`)
			}
		}
		let theTableName = table.name;
		if (table.tableConfig && table.tableConfig.name) {
			theTableName = table.tableConfig.name;
		}
		let fullDbApplication_Name;
		if ((application as DbApplication).fullName) {
			fullDbApplication_Name = (application as DbApplication).fullName;
		} else {
			fullDbApplication_Name = this.dbApplicationUtils.getDbApplication_FullName(application);
		}
		return this.composeTableName(fullDbApplication_Name, theTableName, context);
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
		let commitSucceeded = false
		try {
			await this.internalCommit(transaction)
			commitSucceeded = true
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
			if (commitSucceeded) {
				this.activeQueries.rerunQueries(transaction.fieldMap)
			} else {
				this.activeQueries.clearQueriesToRerun()
			}
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
			this.activeQueries.clearQueriesToRerun()
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
		let fieldMap: SyncApplicationMap = new globalThis.SyncApplicationMap();
		const splitValues = this.splitValues((portableQuery.query as QueryInsertValues).VALUES, context);

		let numVals = 0;
		for (const VALUES of splitValues) {
			let sqlInsertValues = new SQLInsertValues(<QueryInsertValues>{
				...portableQuery.query,
				VALUES
			}, this.getDialect(context),
				this.dictionary,
				this.airportDatabase,
				this.applicationUtils,
				this.queryUtils,
				this.entityStateManager,
				this.qMetadataUtils,
				this.qValidator,
				this.relationManager,
				this.sqlQueryAdapter,
				this,
				this.subStatementSqlGenerator,
				this.utils,
				context);
			let sql = sqlInsertValues.toSQL(fieldMap, context);
			let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap, context);

			numVals += await this.executeNative(sql, parameters, context);
		}

		this.observableQueryAdapter
			.collectAffectedFieldsAndRepositoriesToRerunQueriesBy(
				portableQuery, fieldMap, context.transaction)

		return numVals;
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IFuelHydrantContext,
	): Promise<number> {
		let fieldMap: SyncApplicationMap = new globalThis.SyncApplicationMap();
		let sqlDelete = new SQLDelete(
			<QueryDelete>portableQuery.query, this.getDialect(context),
			this.dictionary,
			this.airportDatabase,
			this.applicationUtils,
			this.queryUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.relationManager,
			this.sqlQueryAdapter,
			this,
			this.subStatementSqlGenerator,
			this.utils,
			context);
		let sql = sqlDelete.toSQL(fieldMap, context);
		let parameters = sqlDelete.getParameters(portableQuery.parameterMap, context);
		let numberOfAffectedRecords = await this.executeNative(sql, parameters, context);

		this.observableQueryAdapter
			.collectAffectedFieldsAndRepositoriesToRerunQueriesBy(
				portableQuery, fieldMap, context.transaction)

		return numberOfAffectedRecords;
	}

	async updateWhere(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): Promise<number> {
		let fieldMap: SyncApplicationMap = new globalThis.SyncApplicationMap();
		let sqlUpdate = new SQLUpdate(
			<QueryUpdate<any>>portableQuery.query, this.getDialect(context),
			this.dictionary,
			this.airportDatabase,
			this.applicationUtils,
			this.queryUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.relationManager,
			this.sqlQueryAdapter,
			this,
			this.subStatementSqlGenerator,
			this.utils,
			context);
		let sql = sqlUpdate.toSQL(internalFragments, fieldMap, context);
		let parameters = sqlUpdate.getParameters(portableQuery.parameterMap, context);

		const numAffectedRows = await this.executeNative(sql, parameters, context);

		this.observableQueryAdapter
			.collectAffectedFieldsAndRepositoriesToRerunQueriesBy(
				portableQuery, fieldMap, context.transaction)

		return numAffectedRows
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
		let query = portableQuery.query;
		let dialect = this.getDialect(context);
		let resultType = portableQuery.queryResultType;
		const QueryResType = QueryResultType;
		switch (resultType) {
			case QueryResType.ENTITY_GRAPH:
			case QueryResType.ENTITY_TREE:
				const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
					.currentVersion[0].applicationVersion.entities[portableQuery.entityIndex];
				return new EntitySQLQuery(<QueryEntity<any>>query,
					dbEntity, dialect, resultType,
					this.dictionary,
					this.airportDatabase,
					this.applicationUtils,
					this.queryUtils,
					this.entityStateManager,
					this.objectResultParserFactory,
					this.qMetadataUtils,
					this.qValidator,
					this.relationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementSqlGenerator,
					this.utils,
					context);
			case QueryResType.FIELD:
				return new FieldSQLQuery(<QueryField>query, dialect,
					this.dictionary,
					this.airportDatabase,
					this.applicationUtils,
					this.queryUtils,
					this.entityStateManager,
					this.qMetadataUtils,
					this.qValidator,
					this.relationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementSqlGenerator,
					this.utils,
					context);
			case QueryResType.SHEET:
				return new SheetSQLQuery(<QuerySheet>query, dialect,
					this.dictionary,
					this.airportDatabase,
					this.applicationUtils,
					this.queryUtils,
					this.entityStateManager,
					this.qMetadataUtils,
					this.qValidator,
					this.relationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementSqlGenerator,
					this.utils,
					context);
			case QueryResType.TREE:
				return new TreeSQLQuery(<QuerySheet>query, dialect,
					this.dictionary,
					this.airportDatabase,
					this.applicationUtils,
					this.queryUtils,
					this.entityStateManager,
					this.qMetadataUtils,
					this.qValidator,
					this.relationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementSqlGenerator,
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
