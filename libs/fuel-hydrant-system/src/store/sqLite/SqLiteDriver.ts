import {QueryType} from '@airport/ground-control'
import {SqlDriver} from '../SqlDriver'

/**
 * Created by Papa on 11/27/2016.
 */

export abstract class SqLiteDriver
	extends SqlDriver {

	constructor() {
		super()
		this.maxValues = 999
	}

	async doesTableExist(
		tableName: string
	): Promise<boolean> {
		const matchingTableNames = await this.findNative(
			// ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
			`SELECT tbl_name from sqlite_master WHERE type = '${tableName}'`,
			[]
		)

		return matchingTableNames.length === 1
	}

	async dropTable(
		tableName: string
	): Promise<boolean> {
		const matchingTableNames = await this.findNative(
			`DROP TABLE '${tableName}'`,
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
					throw `Unexpected non-date object ${value}`
				}
			default:
				throw `Unexpected typeof value: ${typeof value}`
		}
	}

	abstract async query(
		queryType: QueryType,
		query: string,
		params,
		saveTransaction?: boolean
	): Promise<any>;

	async initTables(
		createQueries: Promise<any>[]
	): Promise<void> {
		for (let i = 0; i < createQueries.length; i++) {
			let currentQuery = createQueries[i]
			await currentQuery
		}
	}

}
