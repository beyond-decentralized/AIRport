import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	Application_Name,
	IApplication,
	DbEntity,
	Domain_Name,
	Application_FullName,
	IApplicationNameUtils,
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
	IApplicationUtils,
	Dictionary,
} from '@airport/ground-control'
import {
	IQueryOperationContext,
	IStoreDriver,
	ITransaction,
	ITransactionContext,
	ITransactionManager
} from '@airport/terminal-map'
import { SQLDelete } from '../sql/core/SQLDelete'
import { SQLInsertValues } from '../sql/core/SQLInsertValues'
import {
	SQLDialect,
	SQLQuery
} from '../sql/core/SQLQuery'
import { SQLUpdate } from '../sql/core/SQLUpdate'
import { EntitySQLQuery } from '../sql/EntitySQLQuery'
import { FieldSQLQuery } from '../sql/FieldSQLQuery'
import { SheetSQLQuery } from '../sql/SheetSQLQuery'
import { TreeSQLQuery } from '../sql/TreeSQLQuery'
import { IFuelHydrantContext } from '../FuelHydrantContext'
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor'
import { IValidator } from '../validation/Validator'
import { ISubStatementSqlGenerator } from '../sql/core/SubStatementSqlGenerator'
import { IObjectResultParserFactory } from '../result/entity/ObjectResultParserFactory'
import { IQueryUtils, IQueryRelationManager } from '@airport/tarmaq-query'
import { ILookup } from '@airport/tarmaq-dao'

/**
 * Created by Papa on 9/9/2016.
 */
@Injected()
export abstract class SqlStoreDriver
	implements IStoreDriver {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	lookup: ILookup

	@Inject()
	objectResultParserFactory: IObjectResultParserFactory

	@Inject()
	qMetadataUtils: IQMetadataUtils

	@Inject()
	queryRelationManager: IQueryRelationManager

	@Inject()
	queryUtils: IQueryUtils

	@Inject()
	qValidator: IValidator

	@Inject()
	sqlQueryAdapter: ISQLQueryAdaptor

	@Inject()
	subStatementSqlGenerator: ISubStatementSqlGenerator

	@Inject()
	transactionManager: ITransactionManager

	@Inject()
	utils: IUtils

	public type: StoreType
	protected maxValues: number

	supportsLocalTransactions(
		context: IFuelHydrantContext,
	): boolean {
		return true
	}

	getEntityTableName(
		dbEntity: DbEntity,
		context: IFuelHydrantContext,
	): string {
		return this.getTableName(dbEntity.applicationVersion.application,
			dbEntity.applicationVersion.integerVersion, dbEntity, context)
	}

	abstract getSelectQuerySuffix(
		querys: Query,
		context: IFuelHydrantContext,
	): string

	getTableName(
		application: {
			domain?: Domain_Name | {
				name?: Domain_Name
			};
			name?: Application_Name;
			fullName?: Application_FullName;
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
		const transaction = context.transaction

		let actorDomainName, credentialsDomain
		if (!context.internal) {
			if (context.isObservableApiCall) {
				actorDomainName = context.credentials.domain
				credentialsDomain = actorDomainName
			} else {
				actorDomainName = transaction.actor.application.domain.name
				credentialsDomain = transaction.credentials.domain
			}
		}

		if (!context.internal && !this.appTrackerUtils.isInternalDomain(credentialsDomain)
			&& !this.appTrackerUtils.isInternalDomain(actorDomainName)
			&& this.appTrackerUtils.isInternalDomain(domainName)) {
			const entityHasExternalAccessPermissions = this.appTrackerUtils.entityHasExternalAccessPermissions(
				domainName,
				application.name,
				applicationIntegerVersion,
				table.name
			);
			if (!entityHasExternalAccessPermissions) {
				const applicationName = transaction
					? transaction.actor.application.name
					: context.credentials.application
				const domainName = transaction
					? transaction.actor.application.domain.name
					: context.credentials.domain
				throw new Error(`
Domain:          ${domainName}
Application:     ${applicationName}

has no permissions to access:

Domain:          ${domainName}
Application:     ${application.name},
Integer Version: ${applicationIntegerVersion}
Entity:          ${table.name}
`)
			}
		}
		let theTableName = table.name
		if (table.tableConfig && table.tableConfig.name) {
			theTableName = table.tableConfig.name
		}
		let fullApplication_Name
		if ((application as IApplication).fullName) {
			fullApplication_Name = (application as IApplication).fullName
		} else {
			fullApplication_Name = this.applicationNameUtils.getApplication_FullName(application)
		}
		return this.composeTableName(fullApplication_Name, theTableName, context)
	}

	abstract composeTableName(
		applicationName: string,
		tableName: string,
		context: IFuelHydrantContext,
	): string

	abstract initialize(
		dbName: string,
		context: IFuelHydrantContext,
	): Promise<any>

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
		const query = portableQuery.query as QueryInsertValues
		if (!query || !query.VALUES || !query.VALUES.length) {
			return 0
		}
		const splitValues = this.splitValues(query.VALUES, context)

		let numVals = 0
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
				this.queryRelationManager,
				this.sqlQueryAdapter,
				this,
				this.subStatementSqlGenerator,
				this.utils,
				context);
			let sql = sqlInsertValues.toSQL(context)
			let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap, context)

			numVals += await this.executeNative(sql, parameters, context)
		}

		return numVals
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IFuelHydrantContext,
	): Promise<number> {
		let sqlDelete = new SQLDelete(
			<QueryDelete>portableQuery.query, this.getDialect(context),
			this.dictionary,
			this.airportDatabase,
			this.applicationUtils,
			this.queryUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.queryRelationManager,
			this.sqlQueryAdapter,
			this,
			this.subStatementSqlGenerator,
			this.utils,
			context);
		let sql = sqlDelete.toSQL(context)
		let parameters = sqlDelete.getParameters(portableQuery.parameterMap, context)
		let numberOfAffectedRecords = await this.executeNative(sql, parameters, context)

		return numberOfAffectedRecords
	}

	async updateWhere(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): Promise<number> {
		let sqlUpdate = new SQLUpdate(
			<QueryUpdate<any>>portableQuery.query, this.getDialect(context),
			this.dictionary,
			this.airportDatabase,
			this.applicationUtils,
			this.queryUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.queryRelationManager,
			this.sqlQueryAdapter,
			this,
			this.subStatementSqlGenerator,
			this.utils,
			context)
		let sql = sqlUpdate.toSQL(internalFragments, context)
		let parameters = sqlUpdate.getParameters(portableQuery.parameterMap, context)

		const numAffectedRows = await this.executeNative(sql, parameters, context)

		return numAffectedRows
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext & IQueryOperationContext
	): Promise<EntityArray> {
		context = await this.ensureContext(context)
		let sql: string
		let sqlQuery: SQLQuery<any>
		if (!context.cachedSqlQueries || !context.cachedSqlQuery.sql) {
			sqlQuery = this.getSQLQuery(portableQuery, context)
			sql = sqlQuery.toSQL(internalFragments, context)
			if (context.cachedSqlQuery) {
				context.cachedSqlQuery.sql = sql
				context.cachedSqlQuery.sqlQuery = sqlQuery
			}
		} else {
			sql = context.cachedSqlQuery.sql
			sqlQuery = context.cachedSqlQuery.sqlQuery
		}
		const parameters = sqlQuery.getParameters(portableQuery.parameterMap, context)

		let results = await this.findNative(sql, parameters, context)
		results = await sqlQuery.parseQueryResults(
			results, internalFragments, portableQuery.queryResultType, context)

		return <EntityArray>results
	}

	getSQLQuery(
		portableQuery: PortableQuery,
		context: IFuelHydrantContext,
	): SQLQuery<any> {
		let query = portableQuery.query
		let dialect = this.getDialect(context)
		let resultType = portableQuery.queryResultType
		const QueryResType = QueryResultType
		switch (resultType) {
			case QueryResType.ENTITY_GRAPH:
			case QueryResType.ENTITY_TREE:
				const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
					.currentVersion[0].applicationVersion.entities[portableQuery.entityIndex]
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
					this.queryRelationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementSqlGenerator,
					this.utils,
					context)
			case QueryResType.FIELD:
				return new FieldSQLQuery(<QueryField>query, dialect,
					this.dictionary,
					this.airportDatabase,
					this.applicationUtils,
					this.queryUtils,
					this.entityStateManager,
					this.qMetadataUtils,
					this.qValidator,
					this.queryRelationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementSqlGenerator,
					this.utils,
					context)
			case QueryResType.SHEET:
				return new SheetSQLQuery(<QuerySheet>query, dialect,
					this.dictionary,
					this.airportDatabase,
					this.applicationUtils,
					this.queryUtils,
					this.entityStateManager,
					this.qMetadataUtils,
					this.qValidator,
					this.queryRelationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementSqlGenerator,
					this.utils,
					context)
			case QueryResType.TREE:
				return new TreeSQLQuery(<QuerySheet>query, dialect,
					this.dictionary,
					this.airportDatabase,
					this.applicationUtils,
					this.queryUtils,
					this.entityStateManager,
					this.qMetadataUtils,
					this.qValidator,
					this.queryRelationManager,
					this.sqlQueryAdapter,
					this,
					this.subStatementSqlGenerator,
					this.utils,
					context)
			case QueryResType.RAW:
			default:
				throw new Error(`Unknown QueryResultType: ${resultType}`)
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
	): Promise<any[]>

	async findOne<E>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext & IQueryOperationContext
	): Promise<E> {
		let results = await this.find(portableQuery, internalFragments, context)

		if (results.length > 1) {
			throw new Error(`Expecting a single result, got ${results.length}`)
		}
		if (results.length == 1) {
			return <E>results[0]
		}
		return null
	}

	warn(message: string) {
		console.warn(message)
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
	): Promise<number>

	protected abstract getDialect(
		context: IFuelHydrantContext,
	): SQLDialect

	protected splitValues(
		values: any[][],
		context: IFuelHydrantContext,
	): any[][][] {
		const valuesInRow = values[0].length
		const numValues = values.length * valuesInRow

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

	protected async ensureContext(
		context: IFuelHydrantContext
	): Promise<IFuelHydrantContext & IQueryOperationContext> {
		return <IFuelHydrantContext & IQueryOperationContext>this
			.lookup.ensureContext(context)
	}

}
