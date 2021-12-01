import { IStoreDriver } from '@airport/ground-control'
import { ITransactionHistory } from '@airport/holding-pattern'
import { ICredentials } from '../Credentials'

export interface ITransaction
	extends IStoreDriver {

	credentials: ICredentials
	isSync: boolean
	transHistory: ITransactionHistory

	commit(): Promise<void>;
	
	rollback(): Promise<void>;

	saveTransaction(transaction: ITransactionHistory): Promise<void>;

}
