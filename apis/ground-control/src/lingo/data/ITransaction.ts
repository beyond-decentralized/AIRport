import {ICredentials}        from '@airport/terminal-map'
import {ITransactionHistory} from '@airport/holding-pattern'
import {
	ATransactionHistory,
	IStoreOperator
}                            from './IStoreOperator'

export interface ITransaction
	extends IStoreOperator {

	credentials: ICredentials
	transHistory: ITransactionHistory

	saveTransaction(
		transaction: ATransactionHistory
	): Promise<any>;

	commit(): Promise<void>;

	rollback(): Promise<void>;

}
