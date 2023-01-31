import { IContext } from '@airport/direction-indicator'
import {
	DbApplication_Name,
	DbEntity,
	DbDomain_Name,
	DbApplication_FullName,
	IStoreOperator,
	Query,
	StoreType
} from '@airport/ground-control'
import { ITransaction } from '../../transaction/ITransaction'
import { ITransactionContext } from '../../orchestration/ITransactionManager'

/**
 * Created by Papa on 6/10/2016.
 */

export const INVALID_TABLE_NAME = 'A0ZA2vKHIAeI9506rYzCSFKYcSbSuLy5sRieHPnd2NevufFEx9CxuZsAdXieZBbRj5mPYypr3TGYwb6limMcTTWHOnsk7F6991890'

export interface IStoreDriver
	extends IStoreOperator {

	type: StoreType;

	doesTableExist(
		applicationName: string,
		tableName: string,
		context: IContext,
	): Promise<boolean>

	dropTable(
		applicationName: string,
		tableName: string,
		context: IContext,
	): Promise<boolean>

	getEntityTableName(
		dbEntity: DbEntity,
		context: IContext,
	): string

	getSelectQuerySuffix(
		query: Query,
		context: IContext,
	): string

	getTableName(
		application: {
			domain: DbDomain_Name | {
				name: DbDomain_Name
			}; name: DbApplication_Name; fullName?: DbApplication_FullName;
		},
		applicationIntegerVersion: number,
		table: {
			name: string, tableConfig?: {
				name?: string
			}
		},
		context: IContext,
	): string;

	initialize(
		dbName: string,
		context: IContext,
	): Promise<any>;

	setupTransaction(
		context: ITransactionContext,
		parentTransaction?: ITransaction,
	): Promise<ITransaction>

	tearDownTransaction(
		transaction: ITransaction,
		context: ITransactionContext,
	): Promise<void>

	startTransaction(
		transaction: ITransaction,
		context: ITransactionContext,
	): Promise<void>

	commit(
		transaction: ITransaction,
		context: ITransactionContext,
	): Promise<void>

	rollback(
		transaction: ITransaction,
		context: ITransactionContext,
	): Promise<void>

}
