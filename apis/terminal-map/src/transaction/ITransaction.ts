import { IActor, ITransactionHistory } from '@airport/ground-control'
import { IStoreDriver } from '../core/data/StoreDriver'
import { ITransactionCredentials } from '../Credentials'

export interface ITransactionInitiator {
	application: string
	domain: string
	methodName: string
	objectName: string
}

export interface ITransaction
	extends IStoreDriver {

	actor: IActor
	childTransaction: ITransaction
	credentials: ITransactionCredentials
	id: string
	initiator: ITransactionInitiator
	isSync: boolean
	parentTransaction: ITransaction
	transactionHistory: ITransactionHistory

}
