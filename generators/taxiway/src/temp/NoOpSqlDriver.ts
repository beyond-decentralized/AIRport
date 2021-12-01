import {
	SQLDialect,
	SqlDriver
} from '@airport/fuel-hydrant-system';
import {
	IOperationContext,
	ITransaction
} from '@airport/terminal-map';

export class NoOpSqlDriver
	extends SqlDriver {
	composeTableName(
		applicationName: string,
		tableName: string,
		context: IOperationContext
	): string {
		return '';
	}

	doesTableExist(
		applicationName: string,
		tableName: string,
		context: IOperationContext
	): Promise<boolean> {
		return Promise.resolve(false);
	}

	dropTable(
		applicationName: string,
		tableName: string,
		context: IOperationContext
	): Promise<boolean> {
		return Promise.resolve(false);
	}

	findNative(
		sqlQuery: string,
		parameters: any[],
		context: IOperationContext
	): Promise<any[]> {
		return Promise.resolve([]);
	}

	initialize(
		dbName: string,
		context: IOperationContext
	): Promise<any> {
		return Promise.resolve(undefined);
	}

	isServer(context: IOperationContext): boolean {
		return false;
	}

	isValueValid(
		value: any,
		sqlDataType,
		context: IOperationContext
	): boolean {
		return false;
	}

	query(
		queryType,
		query: string,
		params: any,
		context: IOperationContext,
		saveTransaction?: boolean
	): Promise<any> {
		return Promise.resolve(undefined);
	}

	transact(
		callback: { (transaction: ITransaction): Promise<void> },
		context: IOperationContext
	): Promise<void> {
		return Promise.resolve(undefined);
	}

	protected executeNative(
		sql: string,
		parameters: any[],
		context: IOperationContext
	): Promise<number> {
		return Promise.resolve(0);
	}

	protected getDialect(context: IOperationContext): SQLDialect {
		return undefined;
	}

}
