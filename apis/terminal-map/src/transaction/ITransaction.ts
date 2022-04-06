import { ITransactionHistory } from '@airport/holding-pattern'
import { IStoreDriver } from '../core/data/StoreDriver'
import { ICredentials } from '../Credentials'

export interface ITransaction
	extends IStoreDriver {

	childTransaction: ITransaction
	credentials: ICredentials
	id: string
	isSync: boolean
	parentTransaction: ITransaction
	transHistory: ITransactionHistory

	saveTransaction(transaction: ITransactionHistory): Promise<void>;

}
