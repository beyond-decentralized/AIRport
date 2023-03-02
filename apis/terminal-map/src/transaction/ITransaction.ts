import { IActor, ITransactionHistory, Repository_GUID, Repository_LocalId, SyncAllModifiedColumnsMap } from '@airport/ground-control'
import { IStoreDriver } from '../core/data/IStoreDriver'
import { ITransactionCredentials } from '../ICredentials'

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
