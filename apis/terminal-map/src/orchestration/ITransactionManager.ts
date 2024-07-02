import { IContext } from '@airport/direction-indicator';
import {
	IActor,
	IRootTransaction
} from '@airport/ground-control';
import { ITransaction } from '../transaction/ITransaction';
import { ICredentials, IApiCredentials } from '../ICredentials';
import { Observable } from 'rxjs';

export interface IApiCallContext
	extends IContext {
	actor?: IActor
	errorMessage?: string
	isObservableApiCall?: boolean
}
export interface ITransactionContext
	extends IContext {
	doNotRecordHistory?: boolean
	transaction?: ITransaction
	rootTransaction?: IRootTransaction
}
export interface ITransactionalCallback {
	(
		transaction: ITransaction,
		context?: IContext
	): Promise<void>
}
export interface ITransactionManager {

	initialize(
		dbName: string,
		context: IContext,
	): Promise<void>;

	isServer(
		context?: IContext
	): boolean;

	transact(
		credentials: ICredentials,
		callback: ITransactionalCallback,
		context: IContext,
	): Promise<void>;

	transactInternal(
		callback: ITransactionalCallback,
		credentials: IApiCredentials,
		context: IContext
	): Promise<void>;

	transactObservableInternal<T>(
		callback: (context: ITransactionContext) => Promise<Observable<T>>,
		credentials: IApiCredentials,
		context: ITransactionContext,
		defaultValue?: T
	): Observable<T>

	startTransaction(
		credentials: ICredentials,
		context: ITransactionContext,
	): Promise<ITransaction>

	rollback(
		credentials: IApiCredentials,
		context: IContext,
	): Promise<void>

	getTransactionFromContextOrCredentials(
		credentials: IApiCredentials,
		context: ITransactionContext,
	): ITransaction

	commit(
		credentials: IApiCredentials,
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
