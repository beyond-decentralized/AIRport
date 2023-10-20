import { IActor, ITransactionHistory, Repository_GUID, Repository_LocalId, SyncAllModifiedColumnsMap } from '@airport/ground-control'
import { IStoreDriver } from '../core/data/IStoreDriver'
import { IApiCredentials } from '../ICredentials'

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
	credentials: IApiCredentials
	id: string
	initiator: ITransactionInitiator
	isRepositorySync: boolean
	parentTransaction: ITransaction
	transactionHistory: ITransactionHistory

}
