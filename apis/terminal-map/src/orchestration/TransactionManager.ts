import {
	ITransaction,
	StoreType
} from '@airport/ground-control'
import {ITransactionHistory} from "@airport/holding-pattern";
import {ICredentials}        from './Credentials'

export interface ITransactionManager {

	storeType: StoreType;

	transactionInProgress: string;

	init(
		dbName: string
	): Promise<void>;

	transact(
		credentials: ICredentials
	): Promise<ITransaction>;

	rollback(
		transaction: ITransaction
	): Promise<void>;

	commit(
		transaction: ITransaction
	): Promise<void>;

	// saveRepositoryHistory(
	// 	transaction: ITransactionHistory
	// ): Promise<boolean>;

}
