import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IContext
} from '@airport/direction-indicator';
import {
	IActor,
	IAirEntity,
	IAppTrackerUtils,
	ISaveResult,
	PortableQuery
} from '@airport/ground-control';
import {
	ICredentials,
	IOperationContext,
	IQueryOperationContext,
	ITransaction,
	ITransactionalServer,
	ITransactionContext,
	IApiCallContext,
	IApiCredentials,
	ITerminalStore,
	ITransactionManager,
	IOperationManager,
	IInsertManager,
	IDeleteManager,
	IQueryManager,
	IUpdateManager,
	IRepositoryManager
} from '@airport/terminal-map';
import { Observable } from 'rxjs';

export interface InternalPortableQuery
	extends PortableQuery {
	domainAndPort: string
}

/**
 * Keeps track of transactions, per client and validates that a given
 * transaction belongs to the provided client.  If the connection
 * information matches, passes the transaction for handling.
 *
 * All transactions are queued.  Read operations are not blocked while
 * any transaction is in progress.  Best way to make sure that you get
 * the latest state is to subscribe to a query, which is guaranteed to
 * be updated after data has changed.
 *
 *
 * Should read operations be blocked while transactions are in process?
 * Probably not since they will just get snapshot of the state at any
 * given point in time and transactionality takes care of not exposing
 * inconsistent state.  There doesn't appear to be a need to que-up
 * read transactions, since SqLite can handle it:
 *
 * https://www.skoumal.net/en/parallel-read-and-write-in-sqlite/
 *
 * Also, there doesn't appear to be a reason to prioritize remote transactions
 * over local ones, since ultimately the state needs to sync either way.
 * A single transactional queue should be enough.
 *
 */
@Injected()
export class TransactionalServer
	implements ITransactionalServer {

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	@Inject()
	deleteManager: IDeleteManager

	@Inject()
	insertManager: IInsertManager

	@Inject()
	operationManager: IOperationManager

	@Inject()
	queryManager: IQueryManager

	@Inject()
	repositoryManager: IRepositoryManager

	@Inject()
	terminalStore: ITerminalStore

	@Inject()
	transactionManager: ITransactionManager

	@Inject()
	updateManager: IUpdateManager

	tempActor: IActor;

	async init(
		context: IContext = {}
	): Promise<void> {
		return await this.transactionManager.initialize('airport', context);
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: IApiCredentials,
		context: IQueryOperationContext & ITransactionContext
	): Promise<EntityArray> {
		this.ensureTransactionContext(credentials, context)
		
		return await this.queryManager.find<E, EntityArray>(
			portableQuery, context);
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		credentials: IApiCredentials,
		context: IQueryOperationContext & ITransactionContext
	): Promise<E> {
		this.ensureTransactionContext(credentials, context)

		return await this.queryManager.findOne<E>(
			portableQuery, context);
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: IApiCredentials,
		context: IQueryOperationContext & ITransactionContext
	): Observable<EntityArray> {
		return this.queryManager.search<E, EntityArray>(
			portableQuery, context);
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		credentials: IApiCredentials,
		context: IQueryOperationContext & ITransactionContext
	): Observable<E> {
		return this.queryManager.searchOne<E>(portableQuery, context);
	}

	async startTransaction(
		credentials: IApiCredentials,
		context: IOperationContext & ITransactionContext & IApiCallContext
	): Promise<boolean> {
		try {
			await this.transactionManager.startTransaction(credentials, context)

			return true
		} catch (e) {
			context.errorMessage = e.message
			console.error(e)
			return false
		}
	}

	async commit(
		credentials: IApiCredentials,
		context: IOperationContext & ITransactionContext & IApiCallContext
	): Promise<boolean> {
		try {
			await this.transactionManager.commit(credentials, {
				...context,
				internal: true
			})
			return true
		} catch (e) {
			console.error(e)
			context.errorMessage = e.message
			return false
		}
	}

	async rollback(
		credentials: IApiCredentials,
		context: IOperationContext & ITransactionContext & IApiCallContext
	): Promise<boolean> {
		try {
			await this.transactionManager.rollback(credentials, context)
			return true
		} catch (e) {
			console.error(e)
			context.errorMessage = e.message
			return false
		}
	}

	async save<E extends IAirEntity, T = E | E[]>(
		entity: T,
		credentials: IApiCredentials,
		context: IOperationContext & ITransactionContext,
	): Promise<ISaveResult> {
		if (!entity) {
			return null
		}

		this.ensureTransactionContext(credentials, context)

		const actor = await this.getActor(credentials);
		context.actor = actor

		let saveResult: ISaveResult
		await this.transactionManager.transactInternal(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			saveResult = await this.operationManager.performSave(
				entity, actor, transaction, context.rootTransaction, context)
		}, credentials, context)

		return saveResult
	}

	async insertValues(
		portableQuery: PortableQuery,
		credentials: IApiCredentials,
		context: IOperationContext & ITransactionContext,
		ensureGeneratedValues?: boolean // for internal use only
	): Promise<number> {
		this.ensureTransactionContext(credentials, context)

		const actor = await this.getActor(credentials)

		let numInsertedRecords
		await this.transactionManager.transactInternal(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			numInsertedRecords = await this.insertManager.insertValues(
				portableQuery, actor, transaction, context.rootTransaction,
				context, ensureGeneratedValues);
		}, credentials, context)

		return numInsertedRecords
	}

	async insertValuesGetLocalIds(
		portableQuery: PortableQuery,
		credentials: IApiCredentials,
		context: IOperationContext & ITransactionContext
	): Promise<number[][]> {
		this.ensureTransactionContext(credentials, context)

		const actor = await this.getActor(credentials)

		let _localIds
		await this.transactionManager.transactInternal(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			_localIds = await this.insertManager.insertValuesGetLocalIds(
				portableQuery, actor, transaction, context.rootTransaction, context);
		}, credentials, context)

		return _localIds
	}

	async updateValues(
		portableQuery: PortableQuery,
		credentials: IApiCredentials,
		context: IOperationContext & ITransactionContext
	): Promise<number> {
		this.ensureTransactionContext(credentials, context)

		const actor = await this.getActor(credentials)

		let numUpdatedRecords
		await this.transactionManager.transactInternal(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			numUpdatedRecords = await this.updateManager.updateValues(
				portableQuery, actor, transaction, context.rootTransaction, context);
		}, credentials, context)

		return numUpdatedRecords
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		credentials: IApiCredentials,
		context: IOperationContext & ITransactionContext
	): Promise<number> {
		this.ensureTransactionContext(credentials, context)

		const actor = await this.getActor(credentials)

		let numDeletedRecords
		await this.transactionManager.transactInternal(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			numDeletedRecords = await this.deleteManager.deleteWhere(
				portableQuery, actor, transaction, context.rootTransaction, context);
		}, credentials, context)

		return numDeletedRecords
	}

	private ensureTransactionContext(
		credentials: IApiCredentials,
		context: IOperationContext & ITransactionContext
	) {
		if (context.transaction || credentials.transactionId) {
			this.transactionManager.getTransactionFromContextOrCredentials(
				credentials, context)
		}
	}

	private async getActor(
		credentials: ICredentials,
	): Promise<IActor> {
		if (this.tempActor) {
			return this.tempActor;
		}
		if (this.appTrackerUtils.isInternalDomain(credentials.domain)) {
			return this.terminalStore.getFrameworkActor()
		}
		const transaction = this.terminalStore.getTransactionManager()
			.transactionInProgressMap.get(credentials.transactionId)
		if (!transaction) {
			throw new Error('Could not find transaction by Id: ' + credentials.transactionId)
		}
		const actor = transaction.actor
		if (!actor) {
			throw new Error('No actor associated with transaction Id: ' + credentials.transactionId)
		}

		return actor
	}

}


export function injectTransactionalServer(): void {
	console.log('Injecting TransactionalServer')
}
