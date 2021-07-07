import { IQueryContext } from '@airport/air-control';
import {
	container,
	DI,
	IContext
}                        from '@airport/di';
import {
	DistributionStrategy,
	ITransactionalConnector,
	PlatformType,
	PortableQuery,
	TRANSACTIONAL_CONNECTOR
}                        from '@airport/ground-control';
import { Observable }   from 'rxjs';
import {
	TRANSACTIONAL_SERVER
}                        from '../tokens';

var isServer = false;

export function setIsServer(): void {
	isServer = true;
}

export class TransactionalConnector
	implements ITransactionalConnector {

	dbName: string;
	serverUrl: string;

	async init(): Promise<void> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		await transServer.init();
	}

	async addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
		context: IContext
	): Promise<number> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.addRepository(
			name,
			url,
			platform,
			platformConfig,
			distributionStrategy,
			{
				domainAndPort: 'test'
			},
			context
		);
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.find(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			context,
			cachedSqlQueryId
		);
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<E> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.findOne(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			context,
			cachedSqlQueryId
		);
	}

	async search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<Observable<EntityArray>> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.search(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			context,
			cachedSqlQueryId
		);
	}

	async searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<Observable<E>> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.searchOne(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			context,
			cachedSqlQueryId
		);
	}

	/**
	 * This is a TIQL Insert statement coming from the client.
	 * It will have an id of the operation to be invoked, as
	 * well as the parameters for this specific operation.
	 * The operation will then be looked up from the schema,
	 * parsed, cached (if appropriate) and executed.
	 * 
	 * NOTE: some of these operations will be internal 
	 * 
	 * In a client Dao this will look like:
	 * 
	 * @Prepared()
	 * @Insert(...)
	 * 
	 */
	insert(
		// todo define parameters
	) {
		if(!isServer) {
			throw new Error('Not implemented');
		}
		// TODO: implement
		throw new Error(`TODO: implement`)
	}

	/**
	 * @Update(...)
	 */
	update(
		// todo define parameters
	) {
		if(!isServer) {
			throw new Error('Not implemented');
		}
		// TODO: implement
		throw new Error(`TODO: implement`)
	}

	/**
	 * @Delete(...)
	 */
	delete(
		// todo define parameters
	) {
		if(!isServer) {
			throw new Error('Not implemented');
		}
		// TODO: implement
		throw new Error(`TODO: implement`)
	}

	async save<E, T = E | E[]>(
		entity: T,
		context: IContext,
	): Promise<number> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.save(entity, null, context);
	}

	async insertValues(
		portableQuery: PortableQuery,
		context: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER)

		return await transServer.insertValues(
			portableQuery, null, context, ensureGeneratedValues)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number[] | string[] | number[][] | string[][]> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER)

		return await transServer.insertValuesGetIds(portableQuery, null, context)
	}

	async updateValues(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER)

		return await transServer.updateValues(portableQuery, null, context)
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		if(!isServer) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER)

		return await transServer.deleteWhere(portableQuery, null, context)
	}

}

DI.set(TRANSACTIONAL_CONNECTOR, TransactionalConnector);

export function injectTransactionalConnector(): void {
	// console.log('Injecting TransactionalConnector')
}
