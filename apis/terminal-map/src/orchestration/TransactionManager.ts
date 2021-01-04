import {
	IStoreDriver,
	StoreType
}                     from '@airport/ground-control'
import {ICredentials} from './Credentials'
import { IContext } from '@airport/di';

export interface ITransactionManager {

	storeType: StoreType;

	transactionInProgress: string;

	init(
		dbName: string,
		context: IContext,
	): Promise<void>;

	transact(
		credentials: ICredentials,
		callback: {
			(
				transaction: IStoreDriver
			): Promise<void>
		},
		context: IContext,
	): Promise<void>;

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
