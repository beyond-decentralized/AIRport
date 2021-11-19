import {
	container,
	DI,
	IContext
} from '@airport/di';
import {
	AIRepository,
	DistributionStrategy,
	ISaveResult,
	JsonInsertValues,
	OPERATION_CONTEXT_LOADER,
	PlatformType,
	PortableQuery
} from '@airport/ground-control';
import { Actor, IActor, Repository_Id, REPOSITORY_DAO } from '@airport/holding-pattern';
import {
	ICredentials,
	IOperationContext,
	ITransaction,
	ITransactionalServer,
	TRANSACTION_MANAGER,
	TRANSACTIONAL_SERVER,
	TERMINAL_STORE,
	IQueryOperationContext
} from '@airport/terminal-map';
import { transactional } from '@airport/tower';
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
export class TransactionalServer
	implements ITransactionalServer {

	tempActor: IActor;

	async init(
		context: IContext = {}
	): Promise<void> {
		const transManager = await container(this)
			.get(TRANSACTION_MANAGER);

		return await transManager.initialize('airport', context);
	}

	async addRepository(
		// url: string,
		// platform: PlatformType,
		// platformConfig: string,
		// distributionStrategy: DistributionStrategy,
		credentials: ICredentials,
		context: IOperationContext
	): Promise<Repository_Id> {
		await this.ensureIocContext(context)

		const actor = await this.getActor(credentials);

		// FIXME: check actor

		let repositoryId = 0

		await transactional(async (
			transaction: ITransaction
		) => {
			// TODO: figure out how addRepository will work
			repositoryId = await context.ioc.insertManager.addRepository(
				// url, platform, platformConfig, distributionStrategy
				actor,
				context);
		}, context)

		return repositoryId
	}

	async getApplicationRepositories(
		credentials: ICredentials,
		context: IOperationContext,
	): Promise<AIRepository[]> {
		const repositoryDao = await container(this).get(REPOSITORY_DAO)

		return await repositoryDao
			.findReposForAppSignature(credentials.applicationSignature)
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		await this.ensureIocContext(context)

		return await context.ioc.queryManager.find<E, EntityArray>(
			portableQuery, context, cachedSqlQueryId);
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Promise<E> {
		await this.ensureIocContext(context)

		return await context.ioc.queryManager.findOne<E>(
			portableQuery, context, cachedSqlQueryId);
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		this.ensureIocContextSync(context)

		return context.ioc.queryManager.search<E, EntityArray>(
			portableQuery, context);
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Observable<E> {
		this.ensureIocContextSync(context)

		return context.ioc.queryManager.searchOne<E>(portableQuery, context);
	}

	async startTransaction(
		credentials: ICredentials,
		context: IContext
	): Promise<boolean> {
		throw new Error('FIXME: implement')
	}

	async commit(
		credentials: ICredentials,
		context: IContext
	): Promise<boolean> {
		throw new Error('FIXME: implement')
	}

	async rollback(
		credentials: ICredentials,
		context: IContext
	): Promise<boolean> {
		throw new Error('FIXME: implement')
	}

	async save<E>(
		entity: E,
		credentials: ICredentials,
		context: IOperationContext,
	): Promise<ISaveResult> {
		if (!entity) {
			return null
		}
		await this.ensureIocContext(context)

		const actor = await this.getActor(credentials);
		context.actor = actor

		let saveResult: ISaveResult
		await transactional(async (
			transaction: ITransaction
		) => {
			saveResult = await context.ioc.operationManager.performSave(
				entity, actor, transaction, context)
		}, context)

		return saveResult
	}

	async saveToDestination<E>(
		repositoryDestination: string,
		entity: E,
		credentials: ICredentials,
		context: IOperationContext,
	): Promise<ISaveResult> {
		if (!entity) {
			return null
		}
		await this.ensureIocContext(context)

		const actor = await this.getActor(credentials);
		context.actor = actor

		let saveResult: ISaveResult
		await transactional(async (
			transaction: ITransaction
		) => {
			// TODO: save to serialized repository to the specified destination
			saveResult = await context.ioc.operationManager.performSave(
				entity, actor, transaction, context)
		}, context)

		return saveResult
	}


	async insertValues(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IOperationContext,
		ensureGeneratedValues?: boolean // for internal use only
	): Promise<number> {
		const values = (portableQuery.jsonQuery as JsonInsertValues).V;
		if (!values.length) {
			return 0;
		}
		const firstValuesRow = values[0];

		if (!firstValuesRow || !firstValuesRow.length) {
			return 0;
		}

		const numValuesInRow = firstValuesRow.length;

		for (let valuesRow of values) {
			if (valuesRow.length !== numValuesInRow) {
				return 0;
			}
		}

		await this.ensureIocContext(context)
		const actor = await this.getActor(credentials);

		let numInsertedRecords
		await transactional(async (
			transaction: ITransaction
		) => {
			numInsertedRecords = await context.ioc.insertManager.insertValues(
				portableQuery, actor, transaction, context, ensureGeneratedValues);
		}, context)

		return numInsertedRecords
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IOperationContext
	): Promise<number[][]> {
		await this.ensureIocContext(context)
		const actor = await this.getActor(credentials);

		let ids
		await transactional(async (
			transaction: ITransaction
		) => {
			ids = await context.ioc.insertManager.insertValuesGetIds(
				portableQuery, actor, transaction, context);
		}, context)

		return ids
	}

	async updateValues(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IOperationContext
	): Promise<number> {
		await this.ensureIocContext(context)
		const actor = await this.getActor(credentials);

		let numUpdatedRecords
		await transactional(async (
			transaction: ITransaction
		) => {
			numUpdatedRecords = await context.ioc.updateManager.updateValues(
				portableQuery, actor, transaction, context);
		}, context)

		return numUpdatedRecords
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IOperationContext
	): Promise<number> {
		await this.ensureIocContext(context)
		const actor = await this.getActor(credentials);

		let numDeletedRecords
		await transactional(async (
			transaction: ITransaction
		) => {
			numDeletedRecords = await context.ioc.deleteManager.deleteWhere(
				portableQuery, actor, transaction, context);
		}, context)

		return numDeletedRecords
	}

	private async getActor(
		credentials: ICredentials,
	): Promise<IActor> {
		if (this.tempActor) {
			return this.tempActor;
		}
		if(credentials.applicationSignature === 'internal') {
			return new Actor()
		}
		const terminalStore = await container(this).get(TERMINAL_STORE)
		const actor = terminalStore.getApplicationActorMapBySignature()
			.get(credentials.applicationSignature)
		if (!actor) {
			throw new Error(`Could not find actor for Application Signature:
	${credentials.applicationSignature}`);
		}

		return actor
	}

	private async ensureIocContext(
		context: IOperationContext
	): Promise<void> {
		const operationContextLoader = await container(this)
			.get(OPERATION_CONTEXT_LOADER)
		await operationContextLoader.ensure(context)
	}

	private async ensureIocContextSync(
		context: IOperationContext
	): Promise<void> {
		const operationContextLoader = container(this)
			.getSync(OPERATION_CONTEXT_LOADER)
		operationContextLoader.ensureSync(context)
	}

}

DI.set(TRANSACTIONAL_SERVER, TransactionalServer);

export function injectTransactionalServer(): void {
	console.log('Injecting TransactionalServer')
}
