import {StoreType}           from "@airport/ground-control";
import {ITransactionHistory} from "@airport/holding-pattern";
import {ICredentials}        from './Credentials'

export interface ITransactionManager {

	currentTransHistory: ITransactionHistory;

	storeType: StoreType;

	transactionInProgress: string;

	init(
		dbName: string
	): Promise<void>;

	transact(
		credentials: ICredentials
	): Promise<void>;

	rollback(
		credentials: ICredentials
	): Promise<void>;

	commit(
		credentials: ICredentials
	): Promise<void>;

	// saveRepositoryHistory(
	// 	transaction: ITransactionHistory
	// ): Promise<boolean>;

}
