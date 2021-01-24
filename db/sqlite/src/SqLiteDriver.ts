import {
	QueryType,
	SQLDataType
}                            from '@airport/ground-control'
import {SqlDriver}           from '@airport/fuel-hydrant-system'
import { IOperationContext } from '@airport/tower';

/**
 * Created by Papa on 11/27/2016.
 */

export abstract class SqLiteDriver
	extends SqlDriver {

	constructor() {
		super()
		this.maxValues = 999
	}

	composeTableName(
		schemaName: string,
		tableName: string
	): string {
		return `${schemaName}__${tableName}`
	}

	async doesTableExist(
		schemaName: string,
		tableName: string,
		context: IOperationContext<any, any>,
	): Promise<boolean> {
		const matchingTableNames = await this.findNative(
			// ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
			`SELECT
	tbl_name
from
	sqlite_master
WHERE
	type = 'table'
	AND tbl_name = '${schemaName}__${tableName}'`,
			[], context
		)

		return matchingTableNames.length === 1
	}

	async dropTable(
		schemaName: string,
		tableName: string,
		context: IOperationContext<any, any>,
	): Promise<boolean> {
		const matchingTableNames = await this.findNative(
			`DROP TABLE '${schemaName}__${tableName}'`,
			[], context
		)

		return matchingTableNames.length === 1
	}

	async findNative(
		sqlQuery: string,
		parameters: any[],
		context: IOperationContext<any, any>,
	): Promise<any[]> {
		let nativeParameters = parameters.map((value) => this.convertValueIn(value))
		return await this.query(QueryType.SELECT, sqlQuery, nativeParameters, context)
	}

	protected async executeNative(
		sql: string,
		parameters: any[],
		context: IOperationContext<any, any>,
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
		sqlDataType: SQLDataType
	): boolean {
		switch (sqlDataType) {
			case SQLDataType.DATE:
			case SQLDataType.NUMBER:
		}
		return false
	}

	abstract query(
		queryType: QueryType,
		query: string,
		params,
		context: IOperationContext<any, any>,
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
