import {
	SQLDialect,
	SqlDriver
} from '@airport/fuel-hydrant-system';
import {
	IOperationContext,
	ITransaction
} from '@airport/tower';

export class NoOpSqlDriver
	extends SqlDriver {
	composeTableName(
		schemaName: string,
		tableName: string,
		context: IOperationContext<any, any>
	): string {
		return '';
	}

	doesTableExist(
		schemaName: string,
		tableName: string,
		context: IOperationContext<any, any>
	): Promise<boolean> {
		return Promise.resolve(false);
	}

	dropTable(
		schemaName: string,
		tableName: string,
		context: IOperationContext<any, any>
	): Promise<boolean> {
		return Promise.resolve(false);
	}

	findNative(
		sqlQuery: string,
		parameters: any[],
		context: IOperationContext<any, any>
	): Promise<any[]> {
		return Promise.resolve([]);
	}

	initialize(
		dbName: string,
		context: IOperationContext<any, any>
	): Promise<any> {
		return Promise.resolve(undefined);
	}

	isServer(context: IOperationContext<any, any>): boolean {
		return false;
	}

	isValueValid(
		value: any,
		sqlDataType,
		context: IOperationContext<any, any>
	): boolean {
		return false;
	}

	query(
		queryType,
		query: string,
		params: any,
		context: IOperationContext<any, any>,
		saveTransaction?: boolean
	): Promise<any> {
		return Promise.resolve(undefined);
	}

	transact(
		callback: { (transaction: ITransaction): Promise<void> },
		context: IOperationContext<any, any>
	): Promise<void> {
		return Promise.resolve(undefined);
	}

	protected executeNative(
		sql: string,
		parameters: any[],
		context: IOperationContext<any, any>
	): Promise<number> {
		return Promise.resolve(0);
	}

	protected getDialect(context: IOperationContext<any, any>): SQLDialect {
		return undefined;
	}

}
