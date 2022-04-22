import { IInjectable } from '@airport/di'
import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system'
import { QueryType, SQLDataType } from '@airport/ground-control'
import { ITransactionHistory } from '@airport/holding-pattern'
import {
	ICredentials,
	IOperationContext,
	ITransaction
} from '@airport/terminal-map'
import { transactional } from '@airport/tower'
import pg from 'pg'
import pgConnectionString from 'pg-connection-string'
import { DDLManager } from './DDLManager'
import { PostgreSqlDriver } from './PostgreSqlDriver'

const Pool = pg.Pool
const parse = pgConnectionString.parse


export class PostgreTransaction
	extends SqlDriver
	implements ITransaction {

	credentials: ICredentials
	isSync = false
	pool: pg.Pool
	transactionHistory: ITransactionHistory

	constructor(
		private driver: PostgreSqlDriver,
		pool: pg.Pool,
		private client: pg.PoolClient
	) {
		super()
		this.pool = pool;
		(<IInjectable>this).__container__ = (<IInjectable>driver).__container__
	}

	async saveTransaction(transaction: ITransactionHistory): Promise<void> {
	}

	async commit(): Promise<void> {
		try {
			await this.client.query('COMMIT');
		} finally {
			this.client.release()
		}
	}

	async rollback(): Promise<void> {
		try {
			await this.client.query('ROLLBACK');
		} finally {
			this.client.release()
		}
	}

	protected async getClient(): Promise<pg.PoolClient | pg.Pool> {
		return await this.client
	}

	composeTableName(
		applicationName: string,
		tableName: string
	): string {
		return `${applicationName}.${tableName}`
	}

	async doesTableExist(
		applicationName: string,
		tableName: string
	): Promise<boolean> {
		try {
			const result = await this.pool.query(`SELECT EXISTS (
				SELECT FROM information_application.tables 
				WHERE  table_application = '${applicationName}'
				AND    table_name   = '${tableName}'
				)`)
			return result.rows && !!result.rows.length
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	async dropTable(
		applicationName: string,
		tableName: string,
		context: IOperationContext,
	): Promise<boolean> {
		await this.pool.query(`DROP TABLE  '${applicationName}'.'${tableName}'`)

		return true
	}

	async findNative(
		sqlQuery: string,
		parameters: any[],
		context: IOperationContext,
	): Promise<any[]> {
		let nativeParameters = parameters.map((value) => this.convertValueIn(value))
		return await this.query(QueryType.SELECT, sqlQuery, nativeParameters, context)
	}

	protected async executeNative(
		sql: string,
		parameters: any[],
		context: IOperationContext,
	): Promise<number> {
		return await this.query(QueryType.MUTATE, sql, parameters, context)
	}


	protected convertValueIn(
		value: any
	): number | string {
		switch (typeof value) {
			case 'boolean':
				return value ? 1 : 0
			case 'number':
			case 'string':
				return value
			case 'undefined':
				return null
			case 'object':
				if (!value) {
					return null
				} else if (value instanceof Date) {
					return value.getTime()
				} else {
					throw new Error(`Unexpected non-date object ${value}`)
				}
			default:
				throw new Error(`Unexpected typeof value: ${typeof value}`)
		}
	}

	isValueValid(
		value: any,
		sqlDataType: SQLDataType,
		context: IOperationContext,
	): boolean {
		throw new Error('Method not implemented.');
		// switch (sqlDataType) {
		// 	case SQLDataType.DATE:
		// 	case SQLDataType.NUMBER:
		// }
		// return false
	}

	async query(
		queryType: QueryType,
		query: string,
		params: any,
		context: IOperationContext,
		saveTransaction?: boolean,
	): Promise<any> {
		const client = await this.getClient()
		return await this.doQuery(queryType, query, params, client, context,
			saveTransaction);
	}

	async doQuery(
		queryType: QueryType,
		query: string,
		params: any,
		client: pg.PoolClient | pg.Pool,
		context: IOperationContext,
		saveTransaction?: boolean,
	): Promise<any> {
		let nativeParameters = params.map((value) => this.convertValueIn(value));
		console.log(query);
		console.log(nativeParameters);
		const results = await client.query(query, nativeParameters);

		return results.rows;
	}

	async initialize(
		connectionString: string,
	) {
		// TODO: make connection secure when needed
		// Number of cores will be 3*3 (or eventually 3*5) but to allow 
		// for scaling of write services
		// only 3 core per Node.js process is allocated
		let numberOfCrdbCores = 3

		// Best practice - 4 connections per core
		pg.defaults.poolSize = numberOfCrdbCores * 4

		// Expand $env:appdata environment variable in Windows connection string
		if (connectionString.includes("env:appdata")) {
			connectionString = await connectionString.replace(
				"$env:appdata",
				process.env.APPDATA
			);
		}
		// Expand $HOME environment variable in UNIX connection string
		else if (connectionString.includes("HOME")) {
			connectionString = await connectionString.replace(
				"$HOME",
				process.env.HOME
			);
		}
		var config = parse(connectionString);
		// config.port = port;
		// config.database = database;
		this.pool = new Pool(config as any);
	}
	
	async initAllTables(
		context: IOperationContext,
	): Promise<any> {
		let createOperations
		let createQueries: Promise<any>[] = []
		let createSql = DDLManager.getCreateDDL()
		await transactional(async () => {
			for (const createSqlStatement of createSql) {
				const createTablePromise = this.query(
					QueryType.DDL, createSqlStatement, [], context, false)
				createQueries.push(createTablePromise)
			}

			await this.initTables(createQueries)
		})
	}

	async initTables(
		createQueries: Promise<any>[]
	): Promise<void> {
		for (let i = 0; i < createQueries.length; i++) {
			let currentQuery = createQueries[i]
			await currentQuery
		}
	}

	isServer(): boolean {
		return true
	}

	protected getDialect(): SQLDialect {
		return SQLDialect.POSTGRESQL;
	}

}
