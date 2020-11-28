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
} from '@airport/tower'

/**
 * Created by Papa on 8/30/2016.
 */
export class CockroachdbDriver
	extends SqlDriver {

	constructor() {
		super()
		this.type = StoreType.COCKROACHDB
	}

	composeTableName(
		schemaName: string,
		tableName: string,
		context: IOperationContext<any, any>,
	): string {
		throw new Error('Not implemented')
	}

	async initialize(
		dbName: string,
		context: IOperationContext<any, any>,
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
		context: IOperationContext<any, any>,
	): Promise<any> {
		throw new Error('Not implemented')
	}

	async query(
		queryType: QueryType,
		query: string,
		params                   = [],
		context: IOperationContext<any, any>,
		saveTransaction: boolean = false
	): Promise<any> {
		throw new Error('Not implemented')
	}

	handleError(error: any) {
		throw error
	}

	protected getDialect(
		context: IOperationContext<any, any>,
	): SQLDialect {
		return SQLDialect.POSTGRESQL
	}
}
