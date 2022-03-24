import { IContext } from '@airport/di';
import {
	StoreType
} from '@airport/ground-control';
import { ITransaction } from '../transaction/ITransaction';
import { ICredentials } from '../Credentials';
import { IStoreDriver } from '../core/data/StoreDriver';


export interface ITransactionContext {
	transaction: ITransaction
	transactionId?: string
}
export interface ITransactionManager {

	storeType: StoreType;

	sourceOfTransactionInProgress: string
	transactionInProgress: ITransaction

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
	): Promise<void>

	rollback(
		transaction: ITransaction,
		context: IContext,
	): Promise<void>

	commit(
		transaction: ITransaction,
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
