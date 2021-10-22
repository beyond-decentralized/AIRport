import {
	SQLDialect,
	SqlDriver
} from '@airport/fuel-hydrant-system'
import {
	QueryType,
	StoreType
} from '@airport/ground-control'
import {
	IOperationContext,
	ITransaction
} from '@airport/terminal-map'

/**
 * Created by Papa on 8/30/2016.
 */
export class CockroachdbDriver
	extends SqlDriver {

	constructor() {
		super()
		this.type = StoreType.COCKROACHDB
	}

	async doesTableExist(
		schemaName: string,
		tableName: string,
		context: IOperationContext,
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

		return this.getNumberOfRows(matchingTableNames) === 1
	}

	composeTableName(
		schemaName: string,
		tableName: string,
		context: IOperationContext,
	): string {
		throw new Error('Not implemented')
	}

	async initialize(
		dbName: string,
		context: IOperationContext,
	): Promise<any> {
		throw new Error('Not implemented')
	}

	// TODO: refactor to work with callbacks
	async transact(
		callback: {
			(
				transaction: ITransaction
			): Promise<void>
		},
		context: IOperationContext,
	): Promise<any> {
		throw new Error('Not implemented')
	}

	async query(
		queryType: QueryType,
		query: string,
		params                   = [],
		context: IOperationContext,
		saveTransaction: boolean = false
	): Promise<any> {
		throw new Error('Not implemented')
	}

	handleError(error: any) {
		throw error
	}

	protected getDialect(
		context: IOperationContext,
	): SQLDialect {
		return SQLDialect.POSTGRESQL
	}
}
