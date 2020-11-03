import {container, DI}           from '@airport/di'
import {
	DistributionStrategy,
	ITransactionalConnector,
	PlatformType,
	PortableQuery,
	TRANS_CONNECTOR
}                     from '@airport/ground-control'
import {IObservable}  from '@airport/observe'
import {
	ITransaction,
	TRANS_SERVER
} from '@airport/tower'

export class TransactionalConnector
	implements ITransactionalConnector {

	dbName: string
	serverUrl: string

	async init(): Promise<void> {
		const transServer = await container(this).get(TRANS_SERVER)

		await transServer.init()
	}

	async addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy
	): Promise<number> {
		const transServer = await container(this).get(TRANS_SERVER)

		return await transServer.addRepository(
			name,
			url,
			platform,
			platformConfig,
			distributionStrategy, {
				domainAndPort: 'test'
			})
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		const transServer = await container(this).get(TRANS_SERVER)

		return await transServer.find(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			cachedSqlQueryId
		)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<E> {
		const transServer = await container(this).get(TRANS_SERVER)

		return await transServer.findOne(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			cachedSqlQueryId
		)
	}

	async search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<IObservable<EntityArray>> {
		const transServer = await container(this).get(TRANS_SERVER)

		return await transServer.search(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			cachedSqlQueryId
		)
	}

	async searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<IObservable<E>> {
		const transServer = await container(this).get(TRANS_SERVER)

		return await transServer.searchOne(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			cachedSqlQueryId
		)
	}

	/* FIXME: need to add top level .save call here
	async insertValues(
		portableQuery: PortableQuery,
		transaction: ITransaction,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number> {
		const transServer = await container(this).get(TRANS_SERVER)

		return await transServer.insertValues(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			transaction,
			ensureGeneratedValues
		)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		transaction: ITransaction,
	): Promise<number[] | string[] | number[][] | string[][]> {
		const transServer = await container(this).get(TRANS_SERVER)

		return await transServer.insertValuesGetIds(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			transaction
		)
	}

	async updateValues(
		portableQuery: PortableQuery,
		transaction: ITransaction,
	): Promise<number> {
		const transServer = await container(this).get(TRANS_SERVER)

		return await transServer.updateValues(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			transaction
		)
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		transaction: ITransaction,
	): Promise<number> {
		const transServer = await container(this).get(TRANS_SERVER)

		return await transServer.deleteWhere(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			transaction
		)
	}
	*/

}

DI.set(TRANS_CONNECTOR, TransactionalConnector)

export function injectTransactionalConnector(): void {
	console.log("Injecting TransactionalConnector")
}
