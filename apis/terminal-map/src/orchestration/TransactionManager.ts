import { IContext } from '@airport/direction-indicator';
import {
	IRootTransaction,
	StoreType
} from '@airport/ground-control';
import { ITransaction } from '../transaction/ITransaction';
import { ICredentials, ITransactionCredentials } from '../Credentials';
import { IStoreDriver } from '../core/data/StoreDriver';

export interface IApiCallContext
	extends IContext {
	errorMessage?: string
}
export interface ITransactionContext {
	transaction?: ITransaction
	rootTransaction?: IRootTransaction
}
export interface ITransactionManager {

	initialize(
		dbName: string,
		context: IContext,
	): Promise<void>;

	isServer(
		contex?: IContext
	): boolean;

	transact(
		credentials: ICredentials,
		callback: {
			(
				transaction: IStoreDriver,
				context?: IContext
			): Promise<void> | void
		},
		context: IContext,
	): Promise<void>;

	startTransaction(
		credentials: ICredentials,
		context: ITransactionContext,
	): Promise<ITransaction>

	rollback(
		credentials: ITransactionCredentials,
		context: IContext,
	): Promise<void>

	getTransactionFromContextOrCredentials(
		credentials: ITransactionCredentials,
		context: ITransactionContext,
	): Promise<ITransaction>

	commit(
		credentials: ITransactionCredentials,
		context: IContext,
	): Promise<void>

	// NOTE: Removed commit and rollback in favor of a callback solution.
	// This is the lowest common denominator that includes the WebSQL requirement
	// to finish the transaction before the thread goes to sleep.
	// rollback(
	// 	transaction: ITransaction
	// ): Promise<void>;
	//
	// commit(
	// 	transaction: ITransaction
	// ): Promise<void>;

	// saveRepositoryHistory(
	// 	transaction: ITransactionHistory
	// ): Promise<boolean>;

}
