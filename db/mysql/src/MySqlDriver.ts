import {QueryType}     from '@airport/ground-control'
import {transactional} from '@airport/tower'
import {SqlDriver}     from '@airport/fuel-hydrant-system'
import {DDLManager}    from './DDLManager'

/**
 * Created by Papa on 11/27/2016.
 */

export abstract class MySqlDriver
	extends SqlDriver {

	async doesTableExist(
		schemaName: string,
		tableName: string
	): Promise<boolean> {
		const matchingTableNames = await this.findNative(
			// ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
				`select * from information_schema.TABLES
where TABLE_SCHEMA = '${schemaName}'
and TABLE_NAME = '${tableName}';`,
			[]
		)

		return matchingTableNames.length === 1
	}

	async findNative(
		sqlQuery: string,
		parameters: any[]
	): Promise<any[]> {
		let nativeParameters = parameters.map((value) => this.convertValueIn(value))
		return await this.query(QueryType.SELECT, sqlQuery, nativeParameters)
	}

	abstract async query(
		queryType: QueryType,
		query: string,
		params,
		saveTransaction?: boolean
	): Promise<any>;

	async initAllTables(): Promise<any> {
		let createOperations
		let createQueries: Promise<any>[] = []
		let createSql                     = DDLManager.getCreateDDL()
		await transactional(async () => {
			for (const createSqlStatement of createSql) {
				const createTablePromise = this.query(QueryType.DDL, createSqlStatement, [], false)
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

	protected async executeNative(
		sql: string,
		parameters: any[]
	): Promise<number> {
		return await this.query(QueryType.MUTATE, sql, parameters)
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

}
